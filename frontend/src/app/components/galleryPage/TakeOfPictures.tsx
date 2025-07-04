"use client";

import { postCapturePicture } from "@/services/gallery/postCapturePicture";
import Image from "next/image";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

function base64ToBlob(base64: string, filename: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

export default function TakeOfPictures({
  onPictureUploaded,
}: {
  onPictureUploaded: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };
  const webcamRef = useRef<Webcam>(null);

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    const file = base64ToBlob(imageSrc, "capture.jpg");
    const response = await postCapturePicture(file);
    if (response && response.success) {
      onPictureUploaded();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("This file is too large");
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      setPreviewFile(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleValidateClick = async () => {
    if (previewFile) {
      const response = await postCapturePicture(previewFile);
      if (response && response.success) {
        onPictureUploaded();
      }
      setPreviewFile(null);
      setPreviewUrl("");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <Webcam
        ref={webcamRef}
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      {previewUrl && (
        <div className="flex flex-col items-center my-6 bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
          <div className="relative mb-4">
            <Image
              src={previewUrl}
              alt="Aperçu de l'image sélectionnée"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover max-h-80 max-w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              Preview
            </div>
          </div>
          <div className="flex gap-3 w-full max-w-xs">
            <button
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => {
                setPreviewFile(null);
                setPreviewUrl("");
              }}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-[#1C836D] hover:bg-[#1C836D]/80 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              onClick={handleValidateClick}
            >
              Validate
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-[#1C836D] text-white p-3 sm:p-4 rounded-md font-bold font-[family-name:var(--font-figtree)] h-12 sm:h-16 md:h-[72px] w-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#1C836D]/80 hover:animate-pulse cursor-pointer active:scale-95 flex items-center justify-center mt-6 sm:mt-8 text-sm sm:text-base md:text-lg"
        onClick={capture}
      >
        Take a picture
      </button>
      <button
        className="bg-[#1C836D] text-white p-3 sm:p-4 rounded-md font-bold font-[family-name:var(--font-figtree)] h-12 sm:h-16 md:h-[72px] w-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#1C836D]/80 hover:animate-pulse cursor-pointer active:scale-95 flex items-center justify-center mt-6 sm:mt-8 text-sm sm:text-base md:text-lg"
        onClick={handlePictureClick}
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        Add a picture
      </button>
    </div>
  );
}
