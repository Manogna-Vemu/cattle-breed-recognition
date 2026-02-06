import io
import logging
import traceback
import time
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import os

# ---------------- Logging ----------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------- App ----------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Breed Labels ----------------
BREEDS = [
    'Alambadi', 'Amritmahal', 'Ayrshire', 'Banni', 'Bargur', 'Bhadawari', 'Brown_Swiss',
    'Dangi', 'Deoni', 'Gir', 'Guernsey', 'Hallikar', 'Hariana', 'Holstein_Friesian',
    'Jaffrabadi', 'Jersey', 'Kangayam', 'Kankrej', 'Kasargod', 'Kenkatha', 'Kherigarh',
    'Khillari', 'Krishna_Valley', 'Malnad_gidda', 'Mehsana', 'Murrah', 'Nagori', 'Nagpuri',
    'Nili_Ravi', 'Nimari', 'Ongole', 'Pulikulam', 'Rathi', 'Red_Dane', 'Red_Sindhi',
    'Sahiwal', 'Surti', 'Tharparkar', 'Toda', 'Umblachery', 'Vechur'
]

# ---------------- Breed Categories ----------------
CATTLE_BREEDS = {
    'Alambadi', 'Amritmahal', 'Ayrshire', 'Bargur', 'Brown_Swiss',
    'Dangi', 'Deoni', 'Gir', 'Guernsey', 'Hallikar', 'Hariana',
    'Holstein_Friesian', 'Jersey', 'Kangayam', 'Kankrej',
    'Kasargod', 'Kenkatha', 'Kherigarh', 'Khillari',
    'Krishna_Valley', 'Malnad_gidda', 'Nagori', 'Nagpuri',
    'Nimari', 'Ongole', 'Pulikulam', 'Rathi', 'Red_Dane',
    'Red_Sindhi', 'Sahiwal', 'Tharparkar', 'Toda',
    'Umblachery', 'Vechur'
}

BUFFALO_BREEDS = {
    'Banni', 'Bhadawari', 'Jaffrabadi', 'Mehsana',
    'Murrah', 'Nili_Ravi', 'Surti'
}

# ---------------- Load Model ----------------
try:
    logger.info("Loading VGG16 model...")
    model_path = "bovine_breed_classifier_vgg16.h5"
    model = tf.keras.models.load_model(model_path)
    logger.info(f"✅ Model Loaded from {model_path}.")
except Exception as e:
    logger.error(f"❌ Failed to load model: {str(e)}")
    model = None

# ---------------- Routes ----------------
@app.get("/")
async def root():
    return {"message": "Bovine Breed Detection API (VGG16) is running"}

@app.post("/detect")
async def detect_objects(
    image: UploadFile = File(...),
    conf: float = Form(0.25),
    iou: float = Form(0.45)
):
    start_time = time.time()

    if model is None:
        return JSONResponse(content={'error': 'Model not loaded'}, status_code=500)

    try:
        # 1. Read & preprocess image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        img_resized = img.resize((150, 150))
        img_array = np.array(img_resized) / 255.0
        img_batch = np.expand_dims(img_array, axis=0)

        # 2. Predict
        predictions = model.predict(img_batch)
        best_index = np.argmax(predictions[0])
        confidence = float(predictions[0][best_index])

        breed_name = BREEDS[best_index] if best_index < len(BREEDS) else "Unknown"

        # 3. Decide category
        if breed_name in CATTLE_BREEDS:
            category = "Cattle"
        elif breed_name in BUFFALO_BREEDS:
            category = "Buffalo"
        else:
            category = "Unknown"

        # 4. Response
        response_data = {
            "breed_name": breed_name,
            "category": category,
            "confidence_score": f"{confidence * 100:.0f}%",
            "ai_status": "Verified" if confidence > 0.5 else "Low Confidence",
            "processing_time": f"{time.time() - start_time:.2f}s"
        }

        return JSONResponse(content=response_data)

    except Exception as e:
        logger.error(f"Error: {str(e)}\n{traceback.format_exc()}")
        return JSONResponse(content={'error': str(e)}, status_code=500)

# ---------------- Run ----------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
