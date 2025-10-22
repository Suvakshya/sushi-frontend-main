"use client";

import { FiPlus, FiX } from "react-icons/fi";
import Image from "next/image";

interface ImageUploadProps {
  previewImage: string | null;
  onImageChange: (file: File) => void;
  onImageRemove: () => void;
  label?: string;
  className?: string;
  aspectRatio?: string;
  required?: boolean;
}

export default function ImageUpload({
  previewImage,
  onImageChange,
  onImageRemove,
  label = "Image",
  className = "",
  aspectRatio = "aspect-square",
}: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      {!previewImage ? (
        <label className={`flex flex-col items-center justify-center border-2 border-dashed border-[#06AB86] hover:border-[#04856d] rounded-md cursor-pointer text-[#06AB86] transition ${aspectRatio}`}>
          <FiPlus size={28} />
          <span className="text-sm">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className={`relative rounded-md overflow-hidden border border-[#06AB86] ${aspectRatio}`}>
          <Image
            src={previewImage}
            alt="Preview"
            fill
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            title="Remove Image"
          >
            <FiX size={18} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}