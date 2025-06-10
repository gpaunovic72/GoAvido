"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center gap-4 p-4 bg-white w-full min-w-full transition-all duration-300 ease-in-out sm:flex-row sm:items-center sm:justify-between sm:max-w-2xl md:max-w-4xl md:h-32 mx-auto animate-slide-down mb-10">
      <Image
        src="/logo_goavido.svg"
        alt="GoAvido Logo"
        width={643}
        height={218}
        priority
        className="w-[120px] h-[40px] transition-all duration-300 ease-in-out sm:w-[148px] sm:h-[50px]"
      />
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src="/icons/Search Inline.svg"
            alt="Search Icon"
            width={28}
            height={28}
            className="cursor-pointer hover:opacity-60 transition-opacity hover:scale-110"
            onClick={() => console.log("Search clicked")}
          />
        </div>
        <div className="relative">
          <Image
            src="/icons/favorite.svg"
            alt="Favorite Icon"
            width={28}
            height={28}
            className="cursor-pointer hover:opacity-60 transition-opacity hover:scale-110"
            onClick={() => console.log("Favorite clicked")}
          />
        </div>
        <div className="relative">
          <Image
            src="/icons/notification.svg"
            alt="Notification Icon"
            width={28}
            height={28}
            className="cursor-pointer hover:opacity-60 transition-opacity hover:scale-110"
            onClick={() => console.log("Notification clicked")}
          />
        </div>
      </div>
    </header>
  );
}
