"use client";

import { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface BreedDetectionResult {
  breed_name: string;
  category: string;
  confidence_score: string;
  ai_status: string;
  processing_time: string;
}

export default function DashboardPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const breedInitialState: BreedDetectionResult = {
    breed_name: "N/A",
    ai_status: "N/A",
    category: "N/A",
    confidence_score: "N/A",
    processing_time: "N/A",
  };
  const [breedResult, setBreedResult] =
    useState<BreedDetectionResult>(breedInitialState);

  // Handle file selection
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
  };

  // Input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
      setBreedResult(breedInitialState)
    }
  };

  // Drag drop
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const analyzeImage = async (): Promise<void> => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (!file) {
        toast.warning("Please select a file first!");
        return;
      }
      formData.append("image", file);
      // 3. Send the formData
      const response = await api.post("/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const breedData: BreedDetectionResult = response.data;
      if (breedData.breed_name === "N/A") {
        toast.error('No Breed Found with Given Image')
      }
      setBreedResult(breedData);
      setSuccess(true);
    } catch (err: any) {
      const errMsg: string = err?.message ?? "Error while analyzing the image";
      toast.error(errMsg);
      setError(errMsg);
      setSuccess(false);
      setBreedResult(breedInitialState);
    } finally {
      setLoading(false);
    }
  };

  const renderPredictionResults = (): React.ReactElement => {
    // Common wrapper style to ensure the box size stays fixed/consistent
    // min-h-[280px] approximates the height of the full content to prevent layout jumping
    const containerStyle =
      "border rounded-xl p-4 bg-gray-50 min-h-[280px] flex flex-col";

    // 1. LOADING STATE
    if (loading) {
      return (
        <div className={`${containerStyle} items-center justify-center`}>
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }

    const isEmpty = !success;

    // 3. RENDER CONTENT (Success or Empty)
    return (
      <div className={`${containerStyle} space-y-3 justify-center`}>
        <h3 className="font-semibold text-gray-800 mb-2">Prediction Results</h3>

        {/* Row 1: Breed Name */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">Breed Name</span>
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
            >
              {breedResult.breed_name}
            </span>
            {/* Only show Blue Checkmark if success */}
            {!isEmpty && (
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                ✓
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Category */}
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Category</span>
          <span
            className={`font-medium ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
          >
            {breedResult.category}
          </span>
        </div>

        {/* Row 3: Confidence */}
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Confidence Score</span>
          <span
            className={`font-medium ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
          >
            {breedResult.confidence_score}
          </span>
        </div>

        {/* Row 4: AI Status */}
        <div className="flex justify-between border-b pb-2 items-center">
          <span className="text-gray-600">AI Status</span>
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${isEmpty
              ? "bg-gray-200 text-gray-500" // Grey for empty
              : "bg-green-100 text-green-700" // Green for success
              }`}
          >
            {breedResult.ai_status}
          </span>
        </div>

        {/* Row 5: Time */}
        <div className="flex justify-between pt-1">
          <span className="text-gray-600">Processing Time</span>
          <span
            className={`font-medium ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
          >
            {breedResult.processing_time}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-gray-100 rounded-xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4">Upload Section</h2>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-blue-300 rounded-xl p-10 text-center cursor-pointer block hover:bg-blue-50 transition"
          >
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleInputChange}
            />

            <p className="text-blue-600 font-medium text-lg">
              Upload Cattle or Buffalo Image
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Drag & drop your image here or click to browse
            </p>

            <Button
              disabled={loading}
              onClick={async (): Promise<void> => analyzeImage()}
              type="button"
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Analyze Image
            </Button>

            <p className="text-xs text-gray-400 mt-4">
              Supported formats: JPG, PNG
            </p>
          </label>
        </div>

        {/* Result Output Section */}
        <div className="bg-gray-100 rounded-xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4">Result Output Section</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Preview */}
            <div className="rounded-lg overflow-hidden border min-h-[200px] flex items-center justify-center">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image Selected</span>
              )}
            </div>

            {/* Prediction Results Card */}
            {renderPredictionResults()}
          </div>
        </div>
      </div>
    </div>
  );
}
