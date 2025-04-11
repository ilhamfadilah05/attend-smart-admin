import Image from "next/image";
import { Title } from "rizzui";
// import SubscriptionForm from "@/app/shared/subscription-form";
import { PiPlusBold } from "react-icons/pi";
import ComingSoonImg from "@public/coming-soon.png";
import ComingSoonTwoImg from "@public/coming-soon-2.png";
import CountdownTimer from "./countdown-timer";
import React from "react";

type Props = {
  date?: Date;
};

export default function ComingSoonPage({ date }: Props) {
  return (
    <div className="relative flex grow flex-col-reverse items-center justify-center gap-y-5 px-6 pt-10 lg:flex-row lg:pt-0 xl:px-10">
      <div className="z-10 mx-auto w-full max-w-[1536px] text-center lg:text-start">
        <Title as="h6" className="mb-3 font-bold text-gray-1000 md:mb-5 md:text-3xl md:leading-snug ">
          Situs web kami sedang <br className="hidden sm:inline-block" />
          dalam pengembangan. <br className="hidden sm:inline-block" />
          Kami akan segera hadir
        </Title>

        {date && (
          <div className="flex justify-center lg:justify-start">
            <CountdownTimer date={date} />
          </div>
        )}

        <Title as="h1" className="mt-4">
          Terimakasih sudah menunggu. 🙏🏻
        </Title>
      </div>

      <Image
        src={ComingSoonTwoImg}
        alt="coming soon"
        className="fixed start-0 top-0 hidden w-28 3xl:inline-block 3xl:w-32 rtl:rotate-90 dark:invert"
      />
      <div className="end-10 top-1/2 lg:absolute lg:-translate-y-1/2 xl:end-[10%] 3xl:end-[15%]">
        <Image
          src={ComingSoonImg}
          alt="coming-soon"
          className="aspect-[531/721] max-w-[194px] md:max-w-[256px] lg:max-w-sm xl:max-w-[400px] 3xl:max-w-[531px]"
        />
      </div>

      <PLusIconPatterns />
    </div>
  );
}

function PLusIconPatterns() {
  return (
    <>
      <PiPlusBold className="absolute end-5 top-5 hidden animate-popup text-gray-1000 [--popup-delay:200ms] lg:inline-block" />
      <PiPlusBold className="absolute bottom-5 end-3 hidden animate-popup text-gray-1000 [--popup-delay:200ms] lg:inline-block" />
      <PiPlusBold className="absolute end-[20%] top-5 hidden animate-popup text-gray-1000 [--popup-delay:300ms] lg:inline-block" />
      <PiPlusBold className="absolute end-[7%] top-1/3 hidden rotate-45 animate-popup text-gray-1000 [--popup-delay:100ms] lg:inline-block" />
      <PiPlusBold className="absolute bottom-[10%] end-[10%] hidden rotate-45 animate-popup text-xl text-gray-1000 [--popup-delay:150ms] lg:inline-block" />
      <PiPlusBold className="absolute end-[20%] top-[20%] hidden animate-popup text-gray-1000 [--popup-delay:300ms] lg:inline-block" />
      <PiPlusBold className="absolute end-[40%] top-[20%] hidden animate-popup text-gray-1000 [--popup-delay:400ms] lg:inline-block" />
      <PiPlusBold className="absolute end-[48%] top-10 hidden animate-popup text-[10px] text-gray-1000 [--popup-delay:500ms] lg:inline-block" />
      <PiPlusBold className="absolute end-[40%] top-1/2 hidden rotate-45 animate-popup text-xl text-gray-1000 [--popup-delay:250ms] lg:inline-block" />
      <PiPlusBold className="absolute bottom-10 end-[38%] hidden animate-popup text-gray-1000 [--popup-delay:200ms] lg:inline-block" />
    </>
  );
}
