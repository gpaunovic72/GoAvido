"use client";
import { getCapturePicture } from "@/services/gallery/getCapturePicture";
import { useEffect, useState } from "react";
import UserDashboard from "../components/dashboard/UserDashboard";
import GalleryPictures from "../components/galleryPage/GalleryPictures";
import TakeOfPictures from "../components/galleryPage/TakeOfPictures";
import Header from "../components/Header";

export default function Gallery() {
  const [pictures, setPictures] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer toutes les images
  const fetchPictures = async () => {
    try {
      setIsLoading(true);
      const response = await getCapturePicture();
      setPictures(response);
    } catch (error) {
      console.error("Erreur lors du chargement des images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction appelée après un upload réussi
  const handlePictureUploaded = async () => {
    // On refait un fetch complet pour avoir la liste à jour
    await fetchPictures();
  };

  // Chargement initial
  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <div className="flex flex-col relative overflow-hidden min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0BAACA] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200%] lg:w-[1000px] lg:h-[400%] transform rotate-[-60deg] z-0" />
      <div className="relative z-10">
        <Header />
        <UserDashboard />
        <h1 className="text-4xl text-black font-bold text-center m-10">
          Gallery
        </h1>
        <TakeOfPictures onPictureUploaded={handlePictureUploaded} />
        <GalleryPictures pictures={pictures} isLoading={isLoading} />
      </div>
    </div>
  );
}
