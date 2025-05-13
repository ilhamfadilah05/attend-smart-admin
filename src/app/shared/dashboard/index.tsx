"use client";

import {
  PiArrowFatLineDown,
  PiAsteriskSimple,
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
} from "react-icons/pi";
import { CiLogin, CiLogout } from "react-icons/ci";

import AppointmentStats, {
  StatCard,
  StatType,
} from "../appointment/dashboard/appointment-stats";
import { Button, cn, Text, Title } from "rizzui";
import { useScrollableSlider } from "@hooks/use-scrollable-slider";
import TotalAppointment from "../appointment/dashboard/total-appointment";
import UpcomingAppointmentTable from "../appointment/dashboard/upcoming-appointment-table";
import { MapProvider } from "../maps/provider";
import { MapComponent } from "../maps/component";
import { useEffect, useState } from "react";
import { defaultListService } from "../default-page/default-service";
import WidgetCard from "@components/cards/widget-card";

export default function Dashboard() {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();
  const [dataInOut, setDataInOut] = useState();
  const [isLoadingInOut, setIsLoadingInOut] = useState(true);
  const [statData, setStatData] = useState<StatType[]>([
    {
      title: "Total Karyawan",
      desc: "Total dari keseluruhan karyawan yang ada di sistem",
      amount: "0",
      icon: PiCalendarCheck,
    },
    {
      title: "Total Cabang",
      desc: "Total dari keseluruhan cabang yang ada di sistem",
      amount: "0",
      icon: PiCheckCircle,
    },
    {
      title: "Total Jabatan",
      desc: "Total dari keseluruhan jabatan yang ada di sistem",
      amount: "0",
      icon: PiClock,
    },
    {
      title: "Total Perizinan",
      desc: "Total dari keseluruhan perizinan yang ada di sistem",
      amount: "0",
      icon: PiAsteriskSimple,
    },
  ]);

  useEffect(() => {
    getTotalData();
    getDataInOut();
  }, []);

  const getDataInOut = async () => {
    setIsLoadingInOut(true);
    let result = await defaultListService("/dashboard/admin/in-out");
    if (result && result.data) {
      setDataInOut(result.data);
      setIsLoadingInOut(false);
    } else {
      setIsLoadingInOut(false);
    }
  };

  const getTotalData = async () => {
    let result = await defaultListService("/dashboard/admin/total-data");
    if (result && result.data) {
      setStatData([
        {
          title: "Total Karyawan",
          desc: "Total dari keseluruhan karyawan yang ada di sistem",
          amount: result.data["total_employee"],
          icon: PiCalendarCheck,
        },
        {
          title: "Total Cabang",
          desc: "Total dari keseluruhan cabang yang ada di sistem",
          amount: result.data["total_branch"],
          icon: PiCheckCircle,
        },
        {
          title: "Total Jabatan",
          desc: "Total dari keseluruhan jabatan yang ada di sistem",
          amount: result.data["total_department"],
          icon: PiClock,
        },
        {
          title: "Total Perizinan",
          desc: "Total dari keseluruhan perizinan yang ada di sistem",
          amount: result.data["total_submission"],
          icon: PiAsteriskSimple,
        },
      ]);
    }
  };

  return (
    <div>
      <div className={cn("relative flex w-auto items-center overflow-hidden")}>
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
            {statData.map((stat: StatType, index: number) => {
              return (
                <StatCard
                  key={"stat-card-" + index}
                  transaction={stat}
                  className="min-w-[300px]"
                />
              );
            })}
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
      <WidgetCard className="mt-6">
        <div className="flex justify-between mb-4">
          <Title as="h3">Absensi Hari Ini</Title>
          <Button
            variant="outline"
            onClick={getDataInOut}
            isLoading={isLoadingInOut}
          >
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Absen Masuk */}
          <WidgetCard className="p-5 bg-green-50 dark:bg-green-900 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                <CiLogin className="text-green-700 dark:text-green-300 w-6 h-6" />
              </div>
              <div>
                <Title className="text-sm font-semibold text-green-900 dark:text-green-200">
                  Absen Masuk Hari Ini
                </Title>
                <Text className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {dataInOut ? dataInOut["total_in"] : "0"} Karyawan
                </Text>
              </div>
            </div>
          </WidgetCard>

          {/* Absen Keluar */}
          <WidgetCard className="p-5 bg-rose-50 dark:bg-rose-900 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 dark:bg-rose-800 p-3 rounded-full">
                <CiLogout className="text-rose-700 dark:text-rose-300 w-6 h-6" />
              </div>
              <div>
                <Title className="text-sm font-semibold text-rose-900 dark:text-rose-200">
                  Absen Keluar Hari Ini
                </Title>
                <Text className="text-2xl font-bold text-rose-700 dark:text-rose-300">
                  {dataInOut ? dataInOut["total_out"] : "0"} Karyawan
                </Text>
              </div>
            </div>
          </WidgetCard>
        </div>
      </WidgetCard>
      <div className="mt-5">
        <TotalAppointment className="col-span-full @[90rem]:col-span-7" />
      </div>
    </div>
  );
}
