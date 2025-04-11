/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "@utils/class-names";
import Link from "next/link";
import FormGroup from "@/app/shared/form-group";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "rizzui";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { apiPath, PageFormInputEdit, PageFormSchemaEdit } from "../page.config";
import {
  defaultFormService,
  defaultService,
} from "@/app/shared/default-page/default-service";
import dynamic from "next/dynamic";
import DefaultNumberInput from "@/app/shared/default-page/default-form/default-number-input";
import DefaultAsyncSelect from "@/app/shared/default-page/default-form/default-async-select";
import { DefaultOption } from "@/app/shared/default-page/dto";

const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
  ssr: false,
});

type Props = {
  id?: string;
  isModalView?: boolean;
  dataInput?: PageFormInputEdit;
  isDetail?: boolean;
  title?: string;
  entityType?: string;
  redirect?: string;
  className?: string;
};

export default function PageForm({
  id,
  dataInput,
  isModalView = true,
  title,
  isDetail,
  redirect = "/",
  className,
}: Props) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<PageFormInputEdit> = async (data) => {
    console.log(data);
    setLoading(true);
    const result = await defaultFormService(title, apiPath, {
      ...data,
      id: id,
    });

    if (result === null || result === undefined) {
      setLoading(false);
    }

    if (result) {
      router.replace(redirect);
      setLoading(false);
    }
  };

  return (
    <Form<PageFormInputEdit>
      validationSchema={PageFormSchemaEdit}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: dataInput,
      }}
      className={cn(
        "isomorphic-form flex flex-grow flex-col @container",
        className
      )}
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="flex-grow">
            <div
              className={cn("grid grid-cols-1 ", isModalView ? "" : "gap-5")}
            >
              <hr />
              <FormGroup
                title={"Karyawan*"}
                description={"Pilih Karyawan, Data ini wajib diisi"}
                className="pt-5"
              >
                <Controller
                  key="id_employee"
                  name="id_employee"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultAsyncSelect
                      placeholder={`Pilih`}
                      onChange={onChange}
                      value={value !== undefined ? value : ""}
                      getDataOptions={async (param?: string) => {
                        let result: DefaultOption[] = [];

                        const dataOpts = await defaultService<any[]>({
                          url: "/employees",
                          params: {
                            name: param,
                          },
                        });
                        if (dataOpts?.data) {
                          result = dataOpts.data.map((v: any) => ({
                            label: `${v.name}`,
                            value: v.id,
                          }));
                        }

                        return result;
                      }}
                      error={error?.message}
                      disabled={isDetail}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title="Gaji Pokok (Rp)*"
                description="Masukkan Gaji Pokok, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="base_salary"
                  name="base_salary"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultNumberInput
                      formatType="numeric"
                      placeholder="Masukkan data.."
                      value={value}
                      onChange={(e) =>
                        onChange(+e.target.value.replaceAll(",", ""))
                      }
                      disabled={isDetail}
                      customInput={Input as React.ComponentType<unknown>}
                      error={error?.message}
                      thousandSeparator={","}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Tunjangan Makan (Rp)*"
                description="Masukkan Tunjangan Makan, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="meal_allowance"
                  name="meal_allowance"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultNumberInput
                      formatType="numeric"
                      placeholder="Masukkan data.."
                      value={value}
                      onChange={(e) =>
                        onChange(+e.target.value.replaceAll(",", ""))
                      }
                      disabled={isDetail}
                      customInput={Input as React.ComponentType<unknown>}
                      error={error?.message}
                      thousandSeparator={","}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Tunjangan Kesehatan (Rp)*"
                description="Masukkan Tunjangan Kesehatan, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="health_allowance"
                  name="health_allowance"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultNumberInput
                      formatType="numeric"
                      placeholder="Masukkan data.."
                      value={value}
                      onChange={(e) =>
                        onChange(+e.target.value.replaceAll(",", ""))
                      }
                      disabled={isDetail}
                      customInput={Input as React.ComponentType<unknown>}
                      error={error?.message}
                      thousandSeparator={","}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Bonus(Rp)*"
                description="Masukkan Total Bonus, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="bonus_amount"
                  name="bonus_amount"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultNumberInput
                      formatType="numeric"
                      placeholder="Masukkan data.."
                      value={value}
                      onChange={(e) =>
                        onChange(+e.target.value.replaceAll(",", ""))
                      }
                      disabled={isDetail}
                      customInput={Input as React.ComponentType<unknown>}
                      error={error?.message}
                      thousandSeparator={","}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Potongan Gaji Tidak Masuk (Rp)*"
                description="Masukkan Potongan Gaji Tidak Masuk, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="absence_deduction_amount"
                  name="absence_deduction_amount"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultNumberInput
                      formatType="numeric"
                      placeholder="Masukkan data.."
                      value={value}
                      onChange={(e) =>
                        onChange(+e.target.value.replaceAll(",", ""))
                      }
                      disabled={isDetail}
                      customInput={Input as React.ComponentType<unknown>}
                      error={error?.message}
                      thousandSeparator={","}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title="Lembur Per Hari (Rp)*"
                description="Masukkan Lembur Per Hari, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="overtime_amount"
                  name="overtime_amount"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultNumberInput
                      formatType="numeric"
                      placeholder="Masukkan data.."
                      value={value}
                      onChange={(e) =>
                        onChange(+e.target.value.replaceAll(",", ""))
                      }
                      disabled={isDetail}
                      customInput={Input as React.ComponentType<unknown>}
                      error={error?.message}
                      thousandSeparator={","}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>
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
            {!isDetail && (
              <Button
                as="button"
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
