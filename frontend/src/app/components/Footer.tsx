import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black/60 py-4">
      <div className="container mx-auto px-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-center text-sm font-medium font-[family-name:var(--font-figtree)]">
          &copy; {new Date().getFullYear()} Goavido. All rights reserved.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/privacy"
            className="text-black underline font-light font-[family-name:var(--font-figtree)] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-black underline font-light font-[family-name:var(--font-figtree)] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
