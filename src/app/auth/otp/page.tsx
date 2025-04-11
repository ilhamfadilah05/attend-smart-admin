"use client";

import Image from "next/image";
import { Text } from "rizzui";
import OtpForm from "@/app/auth/otp/otp-form";
import AuthWrapperFive from "@/app/shared/auth-layout/auth-wrapper-five";
import { useSearchParams } from "next/navigation";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <AuthWrapperFive
      formClassName="2xl:!max-w-md"
      wrapperClassName="xl:!max-w-[1140px] 2xl:!max-w-[1240px] 2xl:!px-0"
      title={<>Masukkan Kode OTP</>}
      pageImage={
        <div className="relative mx-auto aspect-[1/1.015] w-[540px] xl:w-[600px] 2xl:w-[636px]">
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
      <Text className="-mt-3 pb-8 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-5 lg:text-start">
        One time password sudah di kirimkan kepada {email}
      </Text>
      <OtpForm email={email || ""} />
    </AuthWrapperFive>
  );
}
