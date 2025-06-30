"use client";

import { ProfileFormData, profileSchema } from "@/lib/validations/profile";
import { updateProfile } from "@/services/user/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PictureUpload from "./PictureUpload";

export default function ProfileForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await updateProfile(data);
      if (response.success) {
        reset();
        router.push("/home");
      }
    } catch (error) {
      console.error("Detailed error:", error);
    }
  };

  const handlePictureSelected = (file: File) => {
    setValue("pictureUrl", file);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black mb-6 sm:mb-8">
          Dashboard
        </h1>
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
          <PictureUpload
            onPictureSelected={handlePictureSelected}
            currentPictureUrl="/icons/icon-appareil-photo.svg"
            error={errors.pictureUrl?.message as string}
          />
          <div className="flex flex-col gap-1 sm:gap-2 w-full">
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 sm:p-3 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 w-full">
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 sm:p-3 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              {...register("password")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 sm:p-3 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full text-sm sm:text-base pr-10"
            />
            <Image
              src={showPassword ? "/icons/eye_off.svg" : "/icons/eye.svg"}
              alt="eye"
              width={24}
              height={24}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="border-b-2 border-[#CBCBCB] rounded-md p-2 sm:p-3 font-regular text-[#A7A7A7] font-[family-name:var(--font-figtree)] transition-all duration-200 focus:border-[#0BAACA] focus:outline-none w-full text-sm sm:text-base pr-10"
            />
            <Image
              src={
                showConfirmPassword ? "/icons/eye_off.svg" : "/icons/eye.svg"
              }
              alt="eye"
              width={24}
              height={24}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#1C836D] text-white p-3 sm:p-4 rounded-md font-bold font-[family-name:var(--font-figtree)] h-12 sm:h-16 md:h-[72px] w-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#1C836D]/80 hover:animate-pulse cursor-pointer active:scale-95 flex items-center justify-center mt-6 sm:mt-8 text-sm sm:text-base md:text-lg"
        >
          {isSubmitting ? (
            <Image
              src="/icons/loading.svg"
              alt="Loading"
              width={100}
              height={100}
              className="w-8 h-8 sm:w-10 sm:h-10 animate-spin"
            />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
}
