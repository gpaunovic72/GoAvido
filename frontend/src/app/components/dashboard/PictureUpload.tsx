"use client";

import Image from "next/image";
import { useRef, useState } from "react";
interface PictureUploadProps {
  onPictureSelected: (file: File) => void;
  currentPictureUrl?: string;
  error?: string;
}

export default function PictureUpload({
  onPictureSelected,
  currentPictureUrl = "/icons/icon-appareil-photo.svg",
  error,
}: PictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentPictureUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("This file is too large");
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onPictureSelected(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:opacity-80 transition-opacity duration-300 hover:scale-105"
        onClick={handlePictureClick}
      >
        <Image
          src={previewUrl || currentPictureUrl}
          alt="Profile Picture"
          width={160}
          height={160}
          className="w-auto h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm">Change Picture</span>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
