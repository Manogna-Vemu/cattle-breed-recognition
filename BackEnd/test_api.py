import requests
import json

# 1. Image file to test
image_filename = "jersey.jpg" 

url = "http://localhost:8000/detect"

try:
    print(f"Sending {image_filename} to the AI...")
    with open(image_filename, "rb") as f:
        # Note: 'image' matches the parameter name in FastAPI
        response = requests.post(url, files={"image": f})
    
    if response.status_code == 200:
        data = response.json()
        print("\n✅ PREDICTION SUCCESS!")
        print("-" * 30)
        print(f"Breed         : {data.get('breed_name')}")
        print(f"Category      : {data.get('category')}")
        print(f"Confidence    : {data.get('confidence_score')}")
        print(f"AI Status     : {data.get('ai_status')}")
        print(f"Processing    : {data.get('processing_time')}")
        print("-" * 30)
    else:
        print(f"❌ Server Error ({response.status_code}):", response.text)

except FileNotFoundError:
    print(f"Error: Could not find '{image_filename}'. Make sure the file exists!")
except Exception as e:
    print("❌ Connection Error. Is the server running?", e)