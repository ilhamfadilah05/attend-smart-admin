"use client";

import WidgetCard from "@components/cards/widget-card";
import { CustomTooltip } from "@components/charts/custom-tooltip";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useMedia } from "@hooks/use-media";
import SimpleBar from "@ui/simplebar";
import DropdownAction from "@components/charts/dropdown-action";
import { Title } from "rizzui";
import cn from "@utils/class-names";
import TrendingUpIcon from "@components/icons/trending-up";
import { useTheme } from "next-themes";
import { formatNumber } from "@utils/format-number";
import { useEffect, useState } from "react";
import { defaultListService } from "../../default-page/default-service";

const appointmentLegend = [{ name: "Masuk" }, { name: "Tidak Masuk" }];

interface ColorMap {
  dark: string;
  light: string;
  [key: string]: string;
}
const COLORS: ColorMap[] = [
  { dark: "#16C47F", light: "#16C47F" },
  { dark: "#FF0B55", light: "#FF0B55" },
];

const viewOptions = [
  {
    value: "weekly",
    label: "Mingguan",
  },
  {
    value: "monthly",
    label: "Bulanan",
  },
];

export default function TotalAppointment({
  className,
}: {
  className?: string;
}) {
  const { theme } = useTheme();
  const isTablet = useMedia("(max-width: 800px)", false);
  const [viewType, setViewType] = useState("weekly");
  const [data, setData] = useState([
    {
      label: "Senin",
      in_work: 806,
      absent_work: 584,
    },
    {
      label: "Selasa",
      in_work: 740,
      absent_work: 923,
    },
    {
      label: "Rabu",
      in_work: 627,
      absent_work: 784,
    },
    {
      label: "Kamis",
      in_work: 915,
      absent_work: 759,
    },
    {
      label: "Jum'at",
      in_work: 850,
      absent_work: 923,
    },

    {
      label: "Sabtu",
      in_work: 703,
      absent_work: 587,
    },
    {
      label: "Minggu",
      in_work: 923,
      absent_work: 805,
    },
  ]);

  function handleChange(viewType: string) {
    console.log("viewType", viewType);
    setViewType(viewType);
  }

  useEffect(() => {
    getData();
  }, [viewType]);

  const getData = async () => {
    let result = await defaultListService(
      `/dashboard/admin/statistics?type=${viewType}`
    );

    if (result && result.data) {
      setData(result.data);
    }
  };

  return (
    <WidgetCard
      title="Histori Absensi"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      action={
        <div className="flex items-center gap-5">
          <CustomLegend className="hidden @[28rem]:mt-0 @[28rem]:inline-flex" />
          <DropdownAction
            className="rounded-md border"
            options={viewOptions}
            onChange={handleChange}
          />
        </div>
      }
      className={cn("min-h-[20rem] @container", className)}
    >
      {/* <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-inter font-bold">
          2834
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +28.00%</span>
        </span>
      </div> */}
      {/* <CustomLegend className="mb-4 mt-0 inline-flex @[28rem]:hidden" /> */}
      <SimpleBar>
        <div className="h-[18rem] w-full pt-1">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: "1100px" })}
          >
            <ComposedChart
              barGap={8}
              data={data}
              margin={{
                left: -15,
                top: 20,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(label) => label}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="in_work"
                {...(theme && {
                  fill: COLORS[0][theme],
                  stroke: COLORS[0][theme],
                })}
                barSize={40}
                radius={[10, 10, 10, 10]}
              >
                <LabelList dataKey="in_work" content={<CustomizedLabel />} />
              </Bar>
              <Bar
                type="natural"
                dataKey="absent_work"
                {...(theme && {
                  fill: COLORS[1][theme],
                  stroke: COLORS[1][theme],
                })}
                barSize={40}
                radius={[10, 10, 10, 10]}
              >
                <LabelList
                  dataKey="absent_work"
                  content={<CustomizedLabel />}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        "mt-2 flex flex-wrap items-start gap-3 lg:gap-5",
        className
      )}
    >
      {appointmentLegend.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          {isClient && (
            <span
              className="-mt-0.5 h-3 w-3 rounded-full"
              {...(theme && {
                style: {
                  backgroundColor: COLORS[index][theme],
                },
              })}
            />
          )}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function CustomizedLabel(props: any) {
  const { x, y, width, height, value } = props;
  const radius = 8;

  if (value === 0) return null;

  return (
    <g>
      <rect
        x={x + 3}
        y={y + 3}
        width={width - 6}
        height={20}
        rx={radius}
        fill="#ffffff"
      />
      <text
        x={x + width / 2}
        y={y + 14}
        fill="currentColor"
        className="text-xs font-medium text-gray-800 dark:text-gray-200"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value.toString())}
      </text>
    </g>
  );
}
