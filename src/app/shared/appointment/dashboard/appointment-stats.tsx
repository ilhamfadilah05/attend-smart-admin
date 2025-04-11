"use client";

import { Button } from "rizzui";
import cn from "@utils/class-names";
import { useScrollableSlider } from "@hooks/use-scrollable-slider";
import { IconType } from "react-icons/lib";
import {
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
  PiAsteriskSimple,
} from "react-icons/pi";

type AppointmentStatsType = {
  className?: string;
};

const statData: StatType[] = [
  {
    title: "Total Project",
    desc: "Total dari keseluruhan proyek yang ada di sistem",
    amount: "221",
    icon: PiCalendarCheck,
  },
  {
    title: "Complete Project",
    desc: "Total dari keseluruhan proyek yang sudah selesai",
    amount: "189",
    icon: PiCheckCircle,
  },
  {
    title: "In Progress",
    desc: "Total dari keseluruhan proyek yang sedang diproses",
    amount: "32",
    icon: PiClock,
  },
  {
    title: "Project Active",
    desc: "Total dari keseluruhan proyek yang sedang aktif",
    amount: "20",
    icon: PiAsteriskSimple,
  },
];

export type StatType = {
  icon: IconType;
  title: string;
  amount: string;
  desc?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, desc } = transaction;
  const Icon = icon;
  return (
    <div
      className={cn(
        "group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]",
        className
      )}
    >
      <div className="flex items-center gap-5">
        <span
          className={cn(
            "flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900"
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">{title}</p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {amount}
          </p>
        </div>
      </div>
      {desc && (
        <div className="flex items-center gap-1.5 mt-4">
          <span className="leading-none text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
            {desc}
          </span>
        </div>
      )}
    </div>
  );
}

export function StatGrid() {
  return (
    <>
      {statData.map((stat: StatType, index: number) => {
        return <StatCard key={"stat-card-" + index} transaction={stat} className="min-w-[300px]" />;
      })}
    </>
  );
}

export default function AppointmentStats({ className }: AppointmentStatsType) {
  const { sliderEl, sliderPrevBtn, sliderNextBtn, scrollToTheRight, scrollToTheLeft } = useScrollableSlider();

  return (
    <div className={cn("relative flex w-auto items-center overflow-hidden", className)}>
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 "
        >
          <StatGrid />
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden "
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
