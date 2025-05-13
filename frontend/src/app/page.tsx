import Image from "next/image";
import Footer from "./components/Footer";
import Header_login from "./components/Header_login";
import Signup from "./components/signup";
export default function Home() {
  return (
    <div className="min-h-screen relative w-full max-w-screen-2xl mx-auto">
      <div className="absolute inset-0 bg-[url('/images/photo_background.webp')] bg-center opacity-20 -z-10" />
      <Header_login />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-10 px-4 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-center lg:gap-24 mx-auto animate-slide-down">
        <div className="flex items-center justify-center gap-4 w-full lg:w-auto lg:flex-col sm:justify-center">
          <h1 className="text-white text-4xl sm:text-6xl font-bold font-[family-name:var(--font-figtree)] flex flex-col px-8 sm:px-4 lg:flex-row items-center gap-4">
            Welcome to
            <Image
              src="/logo_goavido_white.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-60 h-auto sm:w-80 sm:h-auto"
            />
          </h1>
        </div>
        <div className="flex items-center justify-center w-full lg:w-auto max-w-[536px]">
          <Signup />
        </div>
      </main>
      <Footer />
    </div>
  );
}
