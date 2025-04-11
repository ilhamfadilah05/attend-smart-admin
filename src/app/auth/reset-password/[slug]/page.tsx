import Image from "next/image";
import ResetPasswordForm from "../reset-password-form";
import React from "react";
import TreeShape from "@components/shape/tree";
import cn from "@utils/class-names";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Title } from "rizzui";

type Props = {
  params: { slug: string };
};

export default function ForgotPassword({ params }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 lg:p-5 2xl:p-10">
      <div
        className={cn(
          "flex w-full grow items-center justify-center gap-10 md:mt-8 lg:mt-24 lg:max-w-5xl lg:justify-between "
        )}
      >
        <div className={cn("w-full")}>
          <div className="mb-10 px-4 text-center lg:px-0 lg:text-start">
            <Link href={"/"} className="mb-6 inline-block max-w-[168px] xl:mb-8">
              {/* <Image src="/logo-ozip.png" alt={siteConfig.title} /> */}
              <Image src={siteConfig.logo} alt={siteConfig.title} />
            </Link>
            <Title
              as="h2"
              className="mb-5 text-[26px] leading-normal @container md:text-3xl md:!leading-normal lg:mb-7 lg:pe-8 lg:text-3xl xl:pe-16 xl:text-[32px] 2xl:pe-0 2xl:text-4xl"
            >
              Reset Password
            </Title>
          </div>
          <ResetPasswordForm token={params.slug} />
        </div>
      </div>
      <div className="mx-auto mb-6 mt-auto flex w-full justify-end border-b border-gray-900 pe-1 pt-10 lg:mb-10 xl:max-w-7xl 2xl:max-w-[1720px]">
        <TreeShape className="relative -mb-3 h-12 w-16 md:h-14 md:w-20 lg:h-[70px] lg:w-28" />
      </div>
    </div>
  );
}
