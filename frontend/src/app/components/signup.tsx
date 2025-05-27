"use client";
import { SignupFormData, signupSchema } from "@/lib/validations/signup";
import { signup } from "@/services/auth/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onsubmit = async (data: SignupFormData) => {
    try {
      setErrorMessage("");
      const response = await signup(data.name, data.email, data.password);
      if (response.success) {
        reset();
        router.push(`/verify`);
      }
      setErrorMessage(response.message || "Error while signing up");
    } catch (error) {
      console.error("Detailed error:", error);
      setErrorMessage("Error while signing up");
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-8">
      <form onSubmit={handleSubmit(onsubmit)}>
        <h2 className="text-2xl text-black font-medium font-[family-name:var(--font-figtree)] mb-8">
          Get Started - it&apos;s Free for limited time!
        </h2>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full xs:w-auto"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full xs:w-auto"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              {...register("password")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full xs:w-auto"
            />
            <Image
              src={showPassword ? "/icons/eye_off.svg" : "/icons/eye.svg"}
              alt="eye"
              width={24}
              height={24}
              className="absolute right-2 top-1 cursor-pointer w-6 h-6"
              onClick={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full xs:w-auto"
            />
            <Image
              src={
                showConfirmPassword ? "/icons/eye_off.svg" : "/icons/eye.svg"
              }
              alt="eye"
              width={24}
              height={24}
              className="absolute right-2 top-1 cursor-pointer w-6 h-6"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#1C836D] text-white p-2 rounded-md font-bold font-[family-name:var(--font-figtree)] h-[72px] w-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#1C836D]/80 hover:animate-pulse cursor-pointer active:scale-95 flex items-center justify-center mt-8"
        >
          {isSubmitting ? (
            <Image
              src="/icons/loading.svg"
              alt="Loading"
              width={100}
              height={100}
              className="w-10 h-10 animate-spin"
            />
          ) : (
            "Join Now"
          )}
        </button>
      </form>
    </div>
  );
}
