"use client";

import { postCapturePicture } from "@/services/gallery/postCapturePicture";
import { useRef } from "react";
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

export default function TakeOfPictures() {
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
    console.log(response);
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
      <button
        className="bg-[#1C836D] text-white p-3 sm:p-4 rounded-md font-bold font-[family-name:var(--font-figtree)] h-12 sm:h-16 md:h-[72px] w-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#1C836D]/80 hover:animate-pulse cursor-pointer active:scale-95 flex items-center justify-center mt-6 sm:mt-8 text-sm sm:text-base md:text-lg"
        onClick={capture}
      >
        Take a picture
      </button>
    </div>
  );
}
