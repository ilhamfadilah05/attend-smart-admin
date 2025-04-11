"use client";

import AuthWrapperFive from "@/app/shared/auth-layout/auth-wrapper-five";
import SignInForm from "./sign-in-form";
import Image from "next/image";
import WaveShape from "@components/shape/wave";
import { useRouter } from "next/navigation";
import { Text } from "rizzui";

export default function SignInPage() {
  const router = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     router.replace('/');
  //   } else {
  //     const accessToken = localStorage.getItem('accessToken');
  //     if (accessToken) localStorage.removeItem('accessToken');
  //   }
  // }, [session, router]);
  return (
    <AuthWrapperFive
      title={
        <>
          <div className="flex flex-col justify-center gap-4">
            <Text className="font-bold">Attend Smart</Text>
            <br />
            <span className="relative inline-flex px-2 text-white self-center lg:self-auto">
              <span className="relative z-10">SIGN IN!</span>{" "}
              <WaveShape className="absolute start-0 top-1/2 h-[52px] w-36 -translate-y-1/2 text-teal-400 md:h-14 md:w-40 xl:h-16 xl:w-44 2xl:h-[70px] 2xl:w-48" />
            </span>
          </div>
          {/* Sistem Informasi Program dan Penerimaan Manfaat -{" "}
          <span className="relative inline-flex px-2 text-white">
            <span className="relative z-10">SIGN IN!</span>{" "}
            <WaveShape className="absolute start-0 top-1/2 h-[52px] w-36 -translate-y-1/2 text-teal-400 md:h-14 md:w-40 xl:h-16 xl:w-44 2xl:h-[70px] 2xl:w-48" />
          </span> */}
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
      // isSocialLoginActive
    >
      <SignInForm />
    </AuthWrapperFive>
  );
}
