"use client";
import { getUserMe } from "@/services/user/getUserMe";
import { UserProfile } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const user = await getUserMe();
        setUser(user);
      } catch (error) {
        router.push("/");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [router]);

  const navItemClass =
    "flex items-center justify-center gap-2 hover:opacity-80 transition-opacity w-1/2";
  const textClass =
    "text-sm font-regular text-gray-800 font-[family-name:var(--font-figtree)] sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl";
  const containerClass =
    "flex flex-col bg-white m-4 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12";
  const headerClass =
    "flex items-center gap-4 m-4 max-w-72 sm:max-w-80 md:max-w-96 lg:max-w-[32rem] xl:max-w-[40rem] 2xl:max-w-[48rem]";
  const iconClass =
    "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14";

  return (
    <div className={containerClass}>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Image
            src="/icons/loading.svg"
            alt="Loading"
            width={100}
            height={100}
            className="w-10 h-10 animate-spin"
          />
        </div>
      ) : (
        <div className={headerClass}>
          <div className="rounded-full w-18 h-18 border-2 border-gray-300 overflow-hidden flex items-center justify-center sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
            <Image
              src={user?.pictureUrl || "/icons/icon-user.svg"}
              alt="Picture of the author"
              width={160}
              height={160}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className={textClass}>Welcome back, {user?.name}</h1>
        </div>
      )}
      <hr className="border-gray-300 border-1 m-4" />
      <div className="flex flex-col gap-4 m-4 sm:flex-row">
        <div className="flex items-center w-full">
          <Link href="/home" className={navItemClass}>
            <Image
              src="/icons/icon-accueil.svg"
              alt="Home"
              width={28}
              height={28}
              className={iconClass}
            />
            <h2
              className={`${textClass} ${
                pathname === "/home" ? "!text-amber-600 font-bold" : ""
              }`}
            >
              Home
            </h2>
          </Link>
          <Link href="/gallery" className={navItemClass}>
            <Image
              src="/icons/icon-galerie.svg"
              alt="Gallery"
              width={28}
              height={28}
              className={iconClass}
            />
            <h2
              className={`${textClass} ${
                pathname === "/gallery" ? "!text-amber-600 font-bold" : ""
              }`}
            >
              Gallery
            </h2>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link href="/news" className={navItemClass}>
            <Image
              src="/icons/icon-actualités.svg"
              alt="News"
              width={28}
              height={28}
              className={iconClass}
            />
            <h2
              className={`${textClass} ${
                pathname === "/news" ? "!text-amber-600 font-bold" : ""
              }`}
            >
              News
            </h2>
          </Link>
          <Link href="/profile" className={navItemClass}>
            <Image
              src="/icons/icon-user.svg"
              alt="Profile"
              width={28}
              height={28}
              className={iconClass}
            />
            <h2
              className={`${textClass} ${
                pathname === "/profile" ? "!text-amber-600 font-bold" : ""
              }`}
            >
              Profile
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
