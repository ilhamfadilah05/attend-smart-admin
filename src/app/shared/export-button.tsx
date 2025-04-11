"use client";
import alertNotification from "@/components/alert-notification";
import { Button } from "@/components/ui/button";
import { exportToCSV, exportToXlsx } from "@/utils/export-to-excel";
import cn from "@utils/class-names";
import { useState } from "react";

type ExportButtonProps = {
  data?: Record<string, any>[];
  header?: string;
  fileExt?: "csv" | "xlsx";
  getData?: () => Promise<Record<string, any>[]>;
  fileName?: string;
  name?: React.ReactNode;
  className?: string;
  as?: "button" | "span" | undefined;
  isLoading?: boolean | undefined;
  type?: "button" | "reset" | "submit" | undefined;
  variant?: "text" | "solid" | "flat" | "outline" | undefined;
  size?: "sm" | "md" | "lg" | "xl" | undefined;
  rounded?: "none" | "sm" | "md" | "lg" | "pill" | undefined;
  color?: "primary" | "secondary" | "danger" | undefined;
  disabled?: boolean | undefined;
};

export default function ExportButton({
  data = [],
  header = "Data",
  fileExt = "xlsx",
  fileName = "Export",
  name = "Export",
  variant = "flat",
  color = "secondary",
  className,
  getData,
  ...props
}: ExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant={variant}
      color={color}
      onClick={() => {
        if (getData) {
          setIsLoading(true);
          getData().then((res) => {
            setIsLoading(false);
            if (fileExt === "xlsx") {
              exportToXlsx(res, fileName);
            } else {
              exportToCSV(res, header, fileName);
            }
            alertNotification(`Berhasil mengunduh data ${fileName}`, "success");
          });
        } else {
          if (fileExt === "xlsx") {
            exportToXlsx(data, fileName);
          } else {
            exportToCSV(data, header, fileName);
          }
          alertNotification(`Berhasil mengunduh data ${fileName}`, "success");
        }
      }}
      className={cn(className)}
      isLoading={isLoading}
      {...props}
    >
      {name}
    </Button>
  );
}
