"use client";
import Image from "next/image";

export default function Header() {
  const headerClass =
    "flex justify-between items-center gap-4 p-4 bg-white w-full min-w-full transition-all duration-300 ease-in-out sm:flex-row sm:items-center sm:justify-between sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] md:h-32 mx-auto animate-slide-down mb-10";
  const logoClass =
    "w-[120px] h-[40px] transition-all duration-300 ease-in-out sm:w-[148px] sm:h-[50px] md:w-[180px] md:h-[60px] lg:w-[200px] lg:h-[70px] xl:w-[220px] xl:h-[80px] 2xl:w-[240px] 2xl:h-[90px]";
  const iconClass =
    "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 cursor-pointer hover:opacity-60 transition-opacity hover:scale-110";

  return (
    <header className={headerClass}>
      <Image
        src="/logo_goavido.svg"
        alt="GoAvido Logo"
        width={643}
        height={218}
        priority
        className={logoClass}
      />
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="relative">
          <Image
            src="/icons/Search Inline.svg"
            alt="Search Icon"
            width={28}
            height={28}
            className={iconClass}
            onClick={() => console.log("Search clicked")}
          />
        </div>
        <div className="relative">
          <Image
            src="/icons/favorite.svg"
            alt="Favorite Icon"
            width={28}
            height={28}
            className={iconClass}
            onClick={() => console.log("Favorite clicked")}
          />
        </div>
        <div className="relative">
          <Image
            src="/icons/notification.svg"
            alt="Notification Icon"
            width={28}
            height={28}
            className={iconClass}
            onClick={() => console.log("Notification clicked")}
          />
        </div>
      </div>
    </header>
  );
}
