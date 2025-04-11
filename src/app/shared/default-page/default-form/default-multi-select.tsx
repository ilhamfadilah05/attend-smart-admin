"use client";
import cn from "@utils/class-names";
import { ReactNode, useEffect, useState } from "react";
import { MultiSelect } from "rizzui";
import { DefaultOption } from "../dto";

export type Props = {
  key?: any;
  label?: string;
  placeholder?: string;
  value?: any[]; // Pastikan value berupa array untuk MultiSelect
  onChange?: (value: any[]) => void;
  error?: string;
  disabled?: boolean;
  getDataOptions?: (param?: string) => Promise<DefaultOption[]>;
  className?: string;
  defaultSlcValue?: DefaultOption;
};

export default function DefaultAsyncMultiSelect({
  key,
  label,
  placeholder,
  value = [], // Pastikan nilai default adalah array kosong
  onChange = () => {},
  error,
  disabled,
  getDataOptions,
  className,
  defaultSlcValue,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [optData, setOptData] = useState<DefaultOption[]>([]);

  const loadOptions = async (param?: string) => {
    if (!getDataOptions) return;
    setIsLoading(true);
    try {
      const result = await getDataOptions(param);
      setOptData((prev) => {
        const newOptions =
          defaultSlcValue &&
          !result.find((r) => r.value === defaultSlcValue.value)
            ? [defaultSlcValue, ...result]
            : result;
        return newOptions;
      });
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []); // Gunakan array kosong agar hanya dijalankan sekali

  return (
    <MultiSelect
      key={key}
      label={label}
      placeholder={placeholder}
      value={Array.isArray(value) ? value : []} // Pastikan value adalah array
      options={optData}
      onChange={onChange}
      error={error}
      className={cn("w-full max-w", className)}
      clearable
      disabled={disabled || isLoading}
      onClear={() => onChange([])} // Sesuaikan agar mengembalikan array kosong
      searchable={true}
      onSearchChange={(value: string) => {
        if (getDataOptions) {
          setTimeout(() => loadOptions(value), 500);
        }
      }}
    />
  );
}
