"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onFileUpload: (filePath: string) => void;
  label?: string;
  accept?: string;
  currentImage?: string;
}

export default function FileUpload({ 
  onFileUpload, 
  label = "Upload Image", 
  accept = "image/*",
  currentImage
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);
    setIsUploading(true);

    // Show preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload file");
      }

      const data = await response.json();
      onFileUpload(data.filePath);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-col items-center gap-4">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={triggerFileInput}
        >
          {preview ? (
            <div className="relative w-full h-48">
              <Image 
                src={preview}
                alt="Image preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to select an image or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />
        </div>

        <Button 
          type="button" 
          variant="outline" 
          onClick={triggerFileInput}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Select Image
            </>
          )}
        </Button>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
} 