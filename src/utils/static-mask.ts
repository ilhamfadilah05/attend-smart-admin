import { staticData } from "@/data/static-data";

type Source = keyof typeof staticData;

export const StaticMask = (source: Source, status: string): string => {
  return staticData[source].find((item) => item.id === status)?.name || "-";
};
