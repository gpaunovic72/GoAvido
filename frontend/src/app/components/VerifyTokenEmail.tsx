"use client";

import { verifyEmail } from "@/services/auth/verifyEmail";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        const response = await verifyEmail(token);

        if (response.success) {
          setStatus("success");
          router.push("/home");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setStatus("error");
      }
    };

    if (token) {
      verify();
    }
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      {status === "loading" && (
        <>
          <h2 className="text-2xl font-bold font-figtree text-center">
            Verify your email...
          </h2>
          <Image
            src="/icons/loading.svg"
            alt="Loading"
            width={100}
            height={100}
            className="animate-spin"
          />
        </>
      )}
      {status === "success" && (
        <>
          <h2 className="text-2xl font-bold font-figtree text-center">
            Email verified successfully !
          </h2>
          <p className="text-center text-gray-500">
            Redirecting to the home page...
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <h2 className="text-2xl font-bold font-figtree text-center">
            Error verifying email
          </h2>
          <p className="text-center text-gray-500">
            The link is invalid or has expired
          </p>
        </>
      )}
    </div>
  );
}
