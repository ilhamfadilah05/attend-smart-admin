import Image from "next/image";
import ForgetPasswordForm from "./forgot-password-form";
import AuthWrapperFive from "@/app/shared/auth-layout/auth-wrapper-five";
import WaveShape from "@components/shape/wave";
import React from "react";

export default function ForgotPassword() {
  return (
    <AuthWrapperFive
      title={
        <>
          Jangan khawatir, kami siap membantu Anda!{" "}
          <span className="relative px-2 text-white">
            <span className="relative z-10">RESET</span>{" "}
            <WaveShape className="absolute left-0 top-1/2 h-11 w-24 -translate-y-1/2 text-teal-400 md:h-[52px] md:w-28 xl:h-14 xl:w-[120px] 2xl:w-[132px]" />
          </span>{" "}
          kata sandi Anda dalam waktu singkat.
        </>
      }
      pageImage={
        <div className="relative mx-auto aspect-[1/1.015] w-[540px] xl:w-[500px] 2xl:w-[636px]">
          <Image
            src={"/signin/sign-up-thumbnail-1.png"}
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <ForgetPasswordForm />
    </AuthWrapperFive>
  );
}
