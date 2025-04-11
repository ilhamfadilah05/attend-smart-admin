/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import cn from "@utils/class-names";
import Link from "next/link";
import { z, ZodRawShape } from "zod";
import { Input, Select, Text, Textarea, Title } from "rizzui";
import { FormInputDto } from "../dto";
import DefaultAsyncSelect from "./default-async-select";
import UploadZone from "@ui/file-upload/upload-zone";
import Image from "next/image";
import FormGroup from "../../form-group";

type Props<T extends ZodRawShape> = {
  id?: string;
  isModalView?: boolean;
  dataInput?: any;
  isDetail?: boolean;
  title?: string;
  redirect?: string;
  className?: string;
  schema: z.ZodObject<T>;
  formInput?: FormInputDto[];
  submitHandler?: (data: any) => Promise<void>;
};

export default function DefaultForm<T extends ZodRawShape = Record<string, any>>({
  id,
  dataInput,
  isModalView = true,
  title = "",
  redirect = "",
  isDetail = false,
  schema,
  formInput = [],
  submitHandler,
  className,
}: Props<T>) {
  const [isLoading, setLoading] = useState(false);
  type InputForm = z.infer<typeof schema>;
  const onSubmit: SubmitHandler<InputForm> = (data) => {
    setLoading(true);
    if (submitHandler) submitHandler(data).finally(() => setLoading(false));
    else setLoading(false);
  };

  return (
    <Form<InputForm>
      validationSchema={schema}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: dataInput,
        // shouldUseNativeValidation: true,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ setValue, getValues, register, formState: { errors }, control }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                "grid grid-cols-1 ",
                isModalView
                  ? "grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
                  : "gap-5"
              )}
            >
              {formInput.map(({ section, field }, i) => {
                const countField = field.length;
                if (countField === 0) {
                  return <FormGroup key={`section-${i}`} title={section.title} description={section.desc} />;
                }
                return (
                  <div key={`section-${i}`} className={cn(className, isModalView ? "@5xl:grid @5xl:grid-cols-6" : " ")}>
                    {isModalView && (
                      <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
                        <Title as="h6" className="font-semibold">
                          {section.title}
                        </Title>
                        <Text className="mt-1 text-sm text-gray-500">{section.desc}</Text>
                      </div>
                    )}
                    <div
                      className={cn(
                        countField > 1 ? "grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5" : " ",
                        isModalView ? "col-span-4" : " "
                      )}
                    >
                      {field.map(
                        ({ key, label, placeholder, type, options, defaultOption, required, getDataOptions }) => {
                          if (type === "select") {
                            const { ref, ...reg } = register(key as any);
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
                                    displayValue={(selected) =>
                                      options?.find((r) => r?.value === selected)?.label ?? ""
                                    }
                                    error={error?.message}
                                    className="w-full"
                                    clearable
                                    onClear={() => onChange("")}
                                    disabled={isDetail}
                                  />
                                )}
                                {...reg}
                              />
                            );
                          } else if (type === "async-select") {
                            const { ref, ...reg } = register(key as any);
                            return (
                              <Controller
                                key={key}
                                control={control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                  <DefaultAsyncSelect
                                    label={label || ""}
                                    placeholder={placeholder || `Pilih ${label}`}
                                    value={value !== undefined ? value : ""}
                                    // options={options || []}
                                    onChange={onChange}
                                    getDataOptions={getDataOptions}
                                    error={error?.message}
                                    disabled={isDetail}
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
                                readOnly={isDetail}
                                placeholder={placeholder || `Masukkan ${label}`}
                                {...register(key as any)}
                                error={errors[key]?.message as string}
                              />
                            );
                          } else if (type === "file") {
                            return null;
                            if (isDetail) {
                              // return <Image key={key} src={(getValues(key as any) as string) || ""} alt={label || key} />
                            }

                            // return (
                            //   <UploadZone
                            //     key={key}
                            //     label={label}
                            //     name={key}
                            //     getValues={getValues}
                            //     setValue={setValue}
                            //     error={errors[key]?.message as string}
                            //   />
                            // );
                          } else if (type === "date_range") {
                          } else if (type === "num_range") {
                          } else if (type === "curr_range") {
                          } else if (type === "currency") {
                          // } else if (type === "number") {
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
                                readOnly={isDetail}
                                placeholder={placeholder || `Masukkan ${label}`}
                                {...register(key as any)}
                                error={errors[key]?.message as string}
                              />
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={cn(
              "flex items-center justify-end gap-3 bg-gray-0/10  @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
              isModalView ? "-mx-10 -mb-7 px-10 py-5" : "py-1"
            )}
          >
            <Link href={redirect}>
              <Button variant="outline" className="w-full @xl:w-auto">
                Kembali
              </Button>
            </Link>
            {isDetail ? null : (
              <Button
                isLoading={isLoading}
                type="submit"
                className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                {id ? `Ubah ` : `Simpan `} {title}
              </Button>
            )}
          </div>
        </>
      )}
    </Form>
  );
}
