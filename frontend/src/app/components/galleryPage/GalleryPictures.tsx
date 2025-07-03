"use client";
import { ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function GalleryPictures({
  pictures,
  isLoading,
}: {
  pictures: string[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <Image
          src="/icons/loading.svg"
          alt="loading"
          width={60}
          height={60}
          className="animate-spin"
        />
      </div>
    );
  }

  if (pictures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] bg-white border-2 border-dashed border-gray-300 rounded-lg m-4 p-8">
        <span className="text-xl sm:text-2xl font-semibold text-gray-500 text-center">
          None pictures captured
        </span>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 mt-4 mb-8">
      <div
        className="grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-4
    gap-4
    bg-white
    border-2 border-gray-200
    rounded-lg
    p-4
    shadow-md"
      >
        {pictures.map((picture, index) => (
          <div
            key={index}
            className="flex flex-col items-center aspect-square rounded-lg overflow-hidden shadow group transition hover:scale-105 hover:shadow-lg bg-gray-100 border border-gray-200 w-full"
          >
            <Image
              src={picture}
              alt={`Picture ${index}`}
              width={100}
              height={100}
              className="object-cover w-full h-full transition duration-200 group-hover:opacity-90 text-black"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="flex flex-row justify-center p-2 gap-2 w-full">
              <button className="text-gray-500 hover:text-gray-700 bg-white rounded-lg px-2 py-1 text-sm flex-1 flex items-center justify-center truncate">
                <ShareIcon className="w-5 h-5 xl:mr-2" />
                <span className="hidden xl:inline truncate">Share</span>
              </button>
              <button className="text-gray-500 hover:text-gray-700 bg-white rounded-lg px-2 py-1 text-sm flex-1 flex items-center justify-center truncate">
                <TrashIcon className="w-5 h-5 xl:mr-2" />
                <span className="hidden xl:inline truncate">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
