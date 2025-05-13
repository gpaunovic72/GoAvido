"use client";

import { LoginFormData, loginSchema } from "@/lib/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4 p-4 transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col gap-2 transition-opacity duration-300 opacity-100 sm:opacity-100 md:flex-row md:gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="email"
              {...register("email")}
              autoComplete="email"
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full xs:w-auto"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              {...register("password")}
              autoComplete="current-password"
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
          className="bg-[#0BAACA] text-white p-2 rounded-md font-bold font-[family-name:var(--font-figtree)] h-[52px] w-[120px] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#0BAACA]/80 hover:animate-pulse cursor-pointer active:scale-95 flex items-center justify-center"
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
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
