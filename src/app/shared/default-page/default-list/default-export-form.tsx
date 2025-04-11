/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import cn from "@utils/class-names";
import { Input, Select, Text, Textarea } from "rizzui";
import { FilterFieldDto } from "../dto";
import { DatePicker } from "@/components/ui/datepicker";
import DefaultAsyncSelect from "../default-form/default-async-select";
import DefaultNumberInput from "../default-form/default-number-input";
import { exportToXlsx } from "@/utils/export-to-excel";
import { useModal } from "../../modal-views/use-modal";
import alertNotification from "@/components/alert-notification";

export type ExportProps = {
  data: Record<string, any>[];
  meta: PropsMeta;
};

export interface PropsMeta {
  status: boolean;
  status_code?: number;
  path?: string;
  timestamp?: string;
  total_data?: number;
  message?: string;
  total_pages?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
}

type Props = {
  dataInput?: any;
  title?: string;
  className?: string;
  filterFields: FilterFieldDto[];
  onClose?: () => void;
  submitHandler?: (data: any) => Promise<ExportProps>;
};

export default function DefaultExportForm({
  dataInput,
  title = "",
  className,
  filterFields,
  onClose,
  submitHandler,
}: Props) {
  const [isLoading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const { closeModal } = useModal();
  const onSubmit: SubmitHandler<any> = async (payload) => {
    setLoading(true);
    if (submitHandler) {
      let isLoop = true;
      let resData: Record<string, any>[] = [];
      let page = 1;
      let limit = 1000;
      while (isLoop) {
        const { data, meta } = await submitHandler({ ...payload, page, limit });
        if (meta?.status === false) {
          // alertNotification(meta?.message || "Terjadi kesalahan pada server", "error");
          isLoop = false;
          setLoading(false);
          return;
        }
        if (data.length >= limit) {
          page += 1;
          isLoop = true;
        } else {
          isLoop = false;
        }
        if (meta?.page && meta?.total_pages) {
          setPercentage((meta.page / meta.total_pages) * 100);
        }
        resData = [...resData, ...data];
      }

      exportToXlsx(resData, title || "Export");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (percentage >= 100) {
      closeModal();
    }
  }, [percentage]);

  // let PageFormSchemaEdit = z.object({});

  // const tempFormSchema: Record<string, any> = {};
  // filterFields?.map((field) => {
  //   if (field.required) {
  //     if (field.type === "date_range") {
  //       const keyGte = `${field.key}.gte`;
  //       const keyLte = `${field.key}.lte`;
  //       tempFormSchema[keyGte] = z.string({ required_error: `Kolom ${field.label} Mulai wajib diisi` });
  //       tempFormSchema[keyLte] = z.string({ required_error: `Kolom ${field.label} Akhir wajib diisi` });
  //     } else {
  //       tempFormSchema[field.key] = z.string().min(1, { message: `Kolom ${field.label} wajib diisi` });
  //     }
  //   }
  // });
  // if (Object.keys(tempFormSchema).length) PageFormSchemaEdit = z.object(tempFormSchema);

  return (
    <Form
      // validationSchema={PageFormSchemaEdit}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: dataInput,
      }}
      className={cn("isomorphic-form flex flex-grow flex-col @container p-10", className)}
    >
      {({ setValue, getValues, register, formState: { errors }, control }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-2 gap-4">
              {isLoading && (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 col-span-2">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  >
                    {" "}
                    {percentage > 0 && percentage.toFixed(2)}%
                  </div>
                </div>
              )}
              {filterFields.map(({ key, label, type, options, getDataOptions, placeholder, required }) => {
                if (required) {
                  if (type === "date_range") {
                    if (errors[key]) {
                      const objError: any = errors[key];
                      if (objError["gte"]) (errors[key] as any)["gte"].message = `Kolom ${label} Mulai wajib diisi`;
                      if (objError["lte"]) (errors[key] as any)["lte"].message = `Kolom ${label} Akhir wajib diisi`;
                    }
                  } else {
                    if (errors[key]) errors[key].message = `Kolom ${label} wajib diisi`;
                  }
                }
                if (type === "select") {
                  const { ref, ...reg } = register(key as any, { required });
                  return (
                    <Controller
                      key={key}
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Select
                          label={label || ""}
                          placeholder={placeholder || `Pilih ${label}`}
                          value={value !== undefined ? value : ""}
                          options={options || []}
                          onChange={onChange}
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) => options?.find((r) => r?.value === selected)?.label ?? ""}
                          error={error?.message}
                          className="w-full"
                          clearable
                          onClear={() => onChange("")}
                        />
                      )}
                      {...reg}
                    />
                  );
                } else if (type === "async-select") {
                  const { ref, ...reg } = register(key as any, { required });
                  return (
                    <Controller
                      key={key}
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <DefaultAsyncSelect
                          label={label || ""}
                          placeholder={placeholder || `Pilih ${label}`}
                          value={value !== undefined ? value : ""}
                          onChange={onChange}
                          getDataOptions={getDataOptions}
                          error={error?.message}
                        />
                      )}
                      {...reg}
                    />
                  );
                } else if (type === "textarea") {
                  return (
                    <Textarea
                      key={key}
                      label={
                        <Text>
                          {label}{" "}
                          {required && (
                            <Text as="b" className="text-red">
                              *
                            </Text>
                          )}
                        </Text>
                      }
                      placeholder={placeholder || `Masukkan ${label}`}
                      {...register(key as any, { required })}
                      error={errors[key]?.message as string}
                    />
                  );
                } else if (type === "file") {
                } else if (type === "num_range") {
                } else if (type === "curr_range") {
                } else if (type === "currency") {
                } else if (type === "date") {
                  const { ref, ...reg } = register(key as any, { required });
                  return (
                    <Controller
                      key={key}
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <div className="rizzui-select-root grid grid-cols-1 w-full max-w">
                          <label className="rizzui-select-label block text-sm mb-1.5 font-medium">
                            {label}
                            {required && (
                              <Text as="b" className="text-red">
                                {" "}
                                *
                              </Text>
                            )}
                          </label>
                          <DatePicker
                            key={key}
                            isClearable={true}
                            placeholderText={placeholder || `Pilih ${label}`}
                            selected={value ? new Date(value as Date) : null}
                            dateFormat={"dd MMMM yyyy"}
                            onChange={onChange}
                            required={required}
                          />
                          {error?.message && (
                            <span className="text-red text-[13px] mt-0.5 rizzui-input-error-text">{error.message}</span>
                          )}
                        </div>
                      )}
                      {...reg}
                    />
                  );
                } else if (type === "date_range") {
                  const keyGte = `${key}.gte`;
                  const keyLte = `${key}.lte`;
                  const errorDateRange = errors[key] as any;
                  const errorGte = errorDateRange?.gte?.message;
                  const errorLte = errorDateRange?.lte?.message;
                  return (
                    <div className="col-span-2 grid grid-cols-2 gap-4" key={key}>
                      <Input
                        key={keyGte}
                        type={"date"}
                        label={
                          label && (
                            <Text>
                              {label}
                              {" Mulai"}
                              {required && (
                                <Text as="b" className="text-red">
                                  {" *"}
                                </Text>
                              )}
                            </Text>
                          )
                        }
                        placeholder={placeholder || `Masukkan ${label}`}
                        {...register(keyGte as any, { required })}
                        error={errorGte as string}
                      />
                      <Input
                        key={keyLte}
                        type={"date"}
                        label={
                          label && (
                            <Text>
                              {label}
                              {" Akhir"}
                              {required && (
                                <Text as="b" className="text-red">
                                  {" *"}
                                </Text>
                              )}
                            </Text>
                          )
                        }
                        placeholder={placeholder || `Masukkan ${label}`}
                        {...register(keyLte as any, { required })}
                        error={errorLte as string}
                      />
                      {/* <Controller
                        key={keyGte}
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <div className="rizzui-select-root grid grid-cols-1 w-full max-w">
                            <label className="rizzui-select-label block text-sm mb-1.5 font-medium">
                              {label} Mulai
                              {required && (
                                <Text as="b" className="text-red">
                                  {" "}
                                  *
                                </Text>
                              )}
                            </label>
                            <DatePicker
                              key={keyGte}
                              isClearable={true}
                              placeholderText={placeholder || `Pilih ${label}`}
                              selected={value ? new Date(value as Date) : null}
                              dateFormat={"dd MMMM yyyy"}
                              onChange={onChange}
                              required={required}
                            />
                            {error?.message && (
                              <span className="text-red text-[13px] mt-0.5 rizzui-input-error-text">
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                        {...regGte}
                      /> */}
                      {/* <Controller
                        key={keyLte}
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => {
                          return (
                            <div className="rizzui-select-root grid grid-cols-1 w-full max-w">
                              <label className="rizzui-select-label block text-sm mb-1.5 font-medium">
                                {label} Akhir
                                {required && (
                                  <Text as="b" className="text-red">
                                    {" "}
                                    *
                                  </Text>
                                )}
                              </label>
                              <DatePicker
                                key={keyLte}
                                isClearable={true}
                                placeholderText={placeholder || `Pilih ${label}`}
                                selected={value ? new Date(value as Date) : null}
                                dateFormat={"dd MMMM yyyy"}
                                onChange={onChange}
                                required={required}
                              />
                              {error?.message && (
                                <span className="text-red text-[13px] mt-0.5 rizzui-input-error-text">
                                  {error.message}
                                </span>
                              )}
                            </div>
                          );
                        }}
                        {...regLte}
                      /> */}
                    </div>
                  );
                } else if (type === "number") {
                  const { ref, ...reg } = register(key as any, { required });
                  return (
                    <Controller
                      key={key}
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <DefaultNumberInput
                          placeholder={placeholder || `Masukkan ${label}`}
                          formatType="numeric"
                          displayType="input"
                          value={(value as number) || null}
                          onChange={onChange}
                          customInput={Input as React.ComponentType<unknown>}
                          required={required}
                        />
                      )}
                      {...reg}
                    />
                  );
                } else {
                  return (
                    <Input
                      key={key}
                      type={type}
                      label={
                        label && (
                          <Text>
                            {label}{" "}
                            {required && (
                              <Text as="b" className="text-red">
                                *
                              </Text>
                            )}
                          </Text>
                        )
                      }
                      placeholder={placeholder || `Masukkan ${label}`}
                      {...register(key as any, { required })}
                      error={errors[key]?.message as string}
                    />
                  );
                }
              })}
            </div>
          </div>

          <div
            className={cn(
              "flex items-center justify-end gap-3 bg-gray-0/10  @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
              "-mx-10 -mb-7 px-10 py-5"
            )}
          >
            <Button variant="outline" className="w-full @xl:w-auto" onClick={onClose}>
              Tutup
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              Export
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
