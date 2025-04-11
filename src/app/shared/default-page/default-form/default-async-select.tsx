"use client";
import cn from "@utils/class-names";
import { ReactNode, useEffect, useState } from "react";
import { Select } from "rizzui";
import { DefaultOption } from "../dto";

export type Props = {
  key?: any | null | undefined;
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: unknown) => void;
  error?: string;
  disabled?: boolean;
  getDataOptions?: (param?: string, id?: string) => Promise<DefaultOption[]>;
  className?: string;
  getOptionValue?: (option: any) => any;
  displayValue?: (value: unknown) => ReactNode;
  defaultSlcValue?: DefaultOption;
};

export default function DefaultAsyncSelect({
  key,
  label,
  placeholder,
  value,
  onChange = () => {},
  error,
  disabled,
  getDataOptions,
  className,
  getOptionValue,
  displayValue,
  defaultSlcValue,
}: Props) {
  // const [slcData, setSlcData] = useState<{ value: string; label: string }>({
  //   label: "",
  //   value: "",
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [optData, setOptData] = useState<DefaultOption[]>([]);

  const loadOptions = async (param?: string) => {
    if (getDataOptions) {
      setIsLoading(true);
      const result = await getDataOptions(param);
      setIsLoading(false);
      setOptData(result);

      if (defaultSlcValue) {
        if (!optData.find((r) => r?.value === defaultSlcValue?.value)) {
          setOptData((prev) => [defaultSlcValue, ...prev]);
        }
      }
      return result;
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    if (isLoading) setOptData([{ label: "Loading...", value: "", disabled: true }]);
  }, [isLoading]);

  let timer: NodeJS.Timeout;

  return (
    <Select
      key={key}
      label={label}
      placeholder={placeholder}
      value={value}
      options={optData || []}
      onChange={onChange}
      getOptionValue={getOptionValue ? getOptionValue : (option: any) => option.value}
      displayValue={
        displayValue ? displayValue : (selected) => optData?.find((r) => r?.value === selected)?.label ?? ""
      }
      error={error}
      className={cn("w-full max-w", className)}
      clearable
      disabled={disabled}
      onClear={() => onChange("")}
      searchable={true}
      onSearchChange={(value: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => loadOptions(value), 500);
      }}
    />
  );

  // return (
  //   <>
  //     <Text as="span">{label}</Text>
  //     <AsyncSelect
  //       name=""
  //       cacheOptions
  //       defaultOptions={optData}
  //       loadOptions={loadOptions}
  //       value={{
  //         label: slcData.label,
  //         value: slcData.value,
  //       }}
  //       className="border-zinc-900"
  //       getOptionLabel={(option: any) => option.label}
  //       getOptionValue={(option: any) => option.value}
  //       onChange={(v: any) => {
  //         setSlcData({
  //           label: v.label,
  //           value: v.value,
  //         });
  //         onChange(v);
  //       }}
  //     />
  //   </>
  // );
}
