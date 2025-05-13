"use client";
import { SignupFormData, signupSchema } from "@/lib/validations/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onsubmit = (data: SignupFormData) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-4 bg-white p-8">
      <form onSubmit={handleSubmit(onsubmit)}>
        <h2 className="text-2xl text-black font-medium font-[family-name:var(--font-figtree)] mb-8">
          Get Started - it&apos;s Free for limited time!
        </h2>
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
              className="absolute right-0 top-0 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
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
