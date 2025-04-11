"use client";

import WidgetCard from "@components/cards/widget-card";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { CustomTooltip } from "@components/charts/custom-tooltip";
import { useMedia } from "@hooks/use-media";
import SimpleBar from "@ui/simplebar";
import DropdownAction from "@components/charts/dropdown-action";
import cn from "@utils/class-names";
import { useTheme } from "next-themes";

const data = [
  {
    month: "Jan",
    newPatients: 570,
    returningPatients: 290,
  },
  {
    month: "Feb",
    newPatients: 500,
    returningPatients: 300,
  },
  {
    month: "Mar",
    newPatients: 550,
    returningPatients: 400,
  },
  {
    month: "Apr",
    newPatients: 520,
    returningPatients: 370,
  },
  {
    month: "May",
    newPatients: 700,
    returningPatients: 560,
  },
  {
    month: "Jun",
    newPatients: 740,
    returningPatients: 520,
  },
  {
    month: "Jul",
    newPatients: 820,
    returningPatients: 580,
  },
  {
    month: "Aug",
    newPatients: 720,
    returningPatients: 440,
  },
  {
    month: "Sep",
    newPatients: 680,
    returningPatients: 500,
  },
  {
    month: "Oct",
    newPatients: 530,
    returningPatients: 320,
  },
  {
    month: "Nov",
    newPatients: 530,
    returningPatients: 320,
  },
  {
    month: "Dec",
    newPatients: 610,
    returningPatients: 290,
  },
];

const viewOptions = [
  {
    value: "Daily",
    label: "Daily",
  },
  {
    value: "Monthly",
    label: "Monthly",
  },
];

const patientLegend = [{ name: "New Patients" }, { name: "Returning Patients" }];
interface ColorMap {
  dark: string;
  light: string;
  [key: string]: string;
}
const COLORS: ColorMap[] = [
  { dark: "#2B7F75", light: "#2B7F75" },
  { dark: "#dfdfdf", light: "#dfdfdf" },
];

export default function DefaultChart({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isTablet = useMedia("(max-width: 820px)", false);
  function handleChange(viewType: string) {
    console.log("viewType", viewType);
  }

  return (
    <WidgetCard
      title="Appointment by Patients"
      titleClassName="text-gray-700 font-bold font-inter"
      headerClassName="items-center"
      action={
        <div className="flex items-center gap-5">
          {/* <DropdownAction
            className="rounded-lg border"
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          /> */}
        </div>
      }
      className={cn("min-h-[28rem]", className)}
    >
      <CustomLegend className="mb-4 mt-4 inline-flex @[80rem]:hidden" />
      <SimpleBar>
        <div className="h-[20rem] w-full pe-1 pt-6">
          <ResponsiveContainer width="100%" height="100%" {...(isTablet && { minWidth: "700px" })}>
            <AreaChart
              data={data}
              margin={{ left: 2, right: 5, bottom: 10 }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={20} />
              <YAxis axisLine={false} tickLine={false} tickMargin={20} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="newPatients"
                {...(theme && {
                  stroke: COLORS[0][theme],
                })}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#amountCustomer)"
              />
              <Area
                dataKey="returningPatients"
                {...(theme && {
                  stroke: COLORS[1][theme],
                })}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#amountCustomer)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <div className={cn("mt-2 flex flex-wrap items-start gap-3 lg:gap-5", className)}>
      {patientLegend.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5 text-gray-500">
          <span
            className="-mt-0.5 h-3 w-3 shrink-0 rounded-full"
            {...(theme && {
              style: {
                backgroundColor: COLORS[index][theme],
              },
            })}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
