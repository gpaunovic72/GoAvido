import Image from "next/image";
import Login from "./Login";

export default function Header_login() {
  return (
    <header className="flex flex-col items-center gap-4 p-4 bg-white w-full min-w-full transition-all duration-300 ease-in-out sm:flex-row sm:items-center sm:justify-between sm:max-w-2xl md:max-w-4xl mx-auto animate-slide-down mb-10">
      <Image
        src="/logo_goavido.svg"
        alt="GoAvido Logo"
        width={643}
        height={218}
        priority
        className="w-[120px] h-[40px] transition-all duration-300 ease-in-out sm:w-[148px] sm:h-[50px]"
      />
      <Login />
    </header>
  );
}
