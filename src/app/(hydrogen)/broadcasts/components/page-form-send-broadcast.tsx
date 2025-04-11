/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "@utils/class-names";
import Link from "next/link";
import FormGroup from "@/app/shared/form-group";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionIcon, Input, MultiSelect, Textarea } from "rizzui";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  apiPath,
  PageFormInputSendBroadcast,
  PageFormSendBroadcastSchemaEdit,
} from "@/app/(hydrogen)/broadcasts/page.config";
import {
  defaultFormService,
  defaultService,
} from "@/app/shared/default-page/default-service";
import { PiPlus, PiTrashBold } from "react-icons/pi";
import FileUpload from "@/app/shared/file-upload";
import { useModal } from "@/app/shared/modal-views/use-modal";
import Image from "next/image";
import DefaultAsyncMultiSelect from "@/app/shared/default-page/default-form/default-multi-select";
import { DefaultOption } from "@/app/shared/default-page/dto";

type Props = {
  id?: string;
  isModalView?: boolean;
  dataInput?: PageFormInputSendBroadcast;
  isDetail?: boolean;
  title?: string;
  entityType?: string;
  redirect?: string;
  className?: string;
};

export default function PageFormSendBroadcast({
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
  const { openModal, closeModal } = useModal();

  const onSubmit: SubmitHandler<PageFormInputSendBroadcast> = async (data) => {
    console.log(data);
    // setLoading(true);
    // const result = await defaultFormService(
    //   title,
    //   apiPath,
    //   {
    //     ...data,
    //     id: id,
    //   },
    //   { multipart: true }
    // );

    // if (result === null || result === undefined) {
    //   setLoading(false);
    // }

    // if (result) {
    //   router.replace(redirect);
    //   setLoading(false);
    // }
  };

  return (
    <Form<PageFormInputSendBroadcast>
      validationSchema={PageFormSendBroadcastSchemaEdit}
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
      {({ register, control, setValue, getValues, formState: { errors } }) => (
        <>
          <div className="flex-grow">
            <div
              className={cn("grid grid-cols-1 ", isModalView ? "" : "gap-5")}
            >
              <hr />

              <FormGroup
                title="Karyawan"
                description="Pilih beberapa karyawan"
                className="pt-5"
              >
                <Controller
                  control={control}
                  name="id_employees"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultAsyncMultiSelect
                      placeholder={`Pilih Karyawan`}
                      onChange={onChange}
                      value={value}
                      getDataOptions={async (param?: string) => {
                        let result: DefaultOption[] = [];

                        const dataOptz = await defaultService<any[]>({
                          url: "/employees",
                          params: {
                            name: param,
                            search: param,
                          },
                        });
                        if (dataOptz?.data) {
                          result = dataOptz.data.map((v: any) => ({
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
                title="Cabang"
                description="Pilih beberapa cabang"
                className="pt-5"
              >
                <Controller
                  control={control}
                  name="id_branches"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DefaultAsyncMultiSelect
                      placeholder={`Pilih Cabang`}
                      onChange={onChange}
                      value={value}
                      getDataOptions={async (param?: string) => {
                        let result: DefaultOption[] = [];

                        const dataOpts = await defaultService<any[]>({
                          url: "/branches",
                          params: {
                            name: param,
                            search: param,
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
                {"Kirim "} {title}
              </Button>
            )}
          </div>
        </>
      )}
    </Form>
  );
}
