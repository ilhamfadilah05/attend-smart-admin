/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import cn from "@utils/class-names";
import Link from "next/link";
import {
  ActionIcon,
  Checkbox,
  Input,
  NumberInput,
  Select,
  Textarea,
  Title,
} from "rizzui";
import { apiPath, PageFormInputEdit, PageFormSchemaEdit } from "../page.config";
import FormGroup from "@/app/shared/form-group";
import { DefaultOption } from "@/app/shared/default-page/dto";
import {
  defaultDeleteService,
  defaultFormService,
  defaultService,
} from "@/app/shared/default-page/default-service";
import { useRouter } from "next/navigation";
import DefaultAsyncSelect from "@/app/shared/default-page/default-form/default-async-select";
import FileUpload from "@/app/shared/file-upload";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { PiExport, PiEye, PiPlus, PiTrash, PiTrashBold } from "react-icons/pi";
import { staticData } from "@/data/static-data";
import dynamic from "next/dynamic";
import SimpleBar from "simplebar-react";
import Image from "next/image";
import DefaultNumberInput from "@/app/shared/default-page/default-form/default-number-input";
import { formatDate } from "@utils/format-date";
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
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: -6.2,
    lng: 106.816666,
  };

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { openModal, closeModal } = useModal();

  const onSubmit: SubmitHandler<PageFormInputEdit> = async (data) => {
    console.log(data);
    setLoading(true);
    const result = await defaultFormService(
      title,
      apiPath,
      {
        ...data,
        id: id,
      },
      { multipart: true }
    );

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
        defaultValues: dataInput
          ? {
              ...dataInput,
              start_date: formatDate(
                new Date(dataInput.start_date),
                "YYYY-MM-DD"
              ),
              end_date: formatDate(new Date(dataInput.end_date), "YYYY-MM-DD"),
            }
          : undefined,
      }}
      className={cn(
        "isomorphic-form flex flex-grow flex-col @container",
        className
      )}
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow">
            <div
              className={cn("grid grid-cols-1 ", isModalView ? "" : "gap-5")}
            >
              <hr />
              <FormGroup
                title={"Karyawan * "}
                description={"Pilih Karyawan, data ini wajib diisi"}
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
                      placeholder={`Pilih Karyawan`}
                      onChange={onChange}
                      value={value !== undefined ? value : ""}
                      getDataOptions={async (param?: string) => {
                        let result: DefaultOption[] = [];

                        const dataOpts = await defaultService<any[]>({
                          url: "/employees",
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
                      disabled={true}
                      className="col-span-full"
                    />
                  )}
                />
              </FormGroup>
              <FormGroup
                title={"Tipe Perizinan *"}
                description={"Pilih Tipe Perizinan, Data ini wajib diisi"}
                className="pt-5"
              >
                <Controller
                  key="type"
                  name="type"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    let result: DefaultOption[] =
                      staticData.submission_type.map((v) => ({
                        label: v.name,
                        value: v.id,
                      }));

                    return (
                      <Select
                        placeholder={`Pilih Tipe Perizinan`}
                        value={value !== undefined ? value : ""}
                        options={result || []}
                        onChange={onChange}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          result?.find((r) => r?.value === selected)?.label ??
                          ""
                        }
                        error={error?.message}
                        className="col-span-full"
                        clearable
                        onClear={() => onChange("")}
                        disabled={
                          isDetail || (id && dataInput?.status === "approved")
                            ? true
                            : false
                        }
                      />
                    );
                  }}
                />
              </FormGroup>

              <FormGroup
                title={"Status Perizinan *"}
                description={"Pilih Status Perizinan, Data ini wajib diisi"}
                className="pt-5"
              >
                <Controller
                  key="status"
                  name="status"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    let result: DefaultOption[] =
                      staticData.submission_status.map((v) => ({
                        label: v.name,
                        value: v.id,
                      }));

                    return (
                      <Select
                        placeholder={`Pilih Status Perizinan`}
                        value={value !== undefined ? value : ""}
                        options={result || []}
                        onChange={onChange}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          result?.find((r) => r?.value === selected)?.label ??
                          ""
                        }
                        error={error?.message}
                        className="col-span-full"
                        clearable
                        onClear={() => onChange("")}
                        disabled={
                          isDetail || (id && dataInput?.status === "approved")
                            ? true
                            : false
                        }
                      />
                    );
                  }}
                />
              </FormGroup>

              <FormGroup
                title="Alasan"
                description="Masukkan alasan perizinan, Data ini wajib diisi"
                className="pt-5"
              >
                <Input
                  key="name"
                  type="text"
                  disabled={
                    isDetail || (id && dataInput?.status === "approved")
                      ? true
                      : false
                  }
                  placeholder="Masukkan alasan perizinan"
                  {...register("reason")}
                  error={errors.reason?.message as string}
                  className="col-span-full"
                />
              </FormGroup>
              <FormGroup
                title={"Tanggal Mulai Izin"}
                description={"Pilih Tanggal Mulai Izin"}
                className="pt-5"
              >
                <Input
                  key={"start_date"}
                  type={"date"}
                  readOnly={
                    isDetail || (id && dataInput?.status === "approved")
                      ? true
                      : false
                  }
                  disabled={
                    isDetail || (id && dataInput?.status === "approved")
                      ? true
                      : false
                  }
                  placeholder={`Masukkan Tanggal Target`}
                  {...register("start_date")}
                  className="col-span-full"
                />
              </FormGroup>

              <FormGroup
                title={"Tanggal Akhir Izin"}
                description={"Pilih Tanggal Akhir Izin"}
                className="pt-5"
              >
                <Input
                  key={"end_date"}
                  type={"date"}
                  readOnly={
                    isDetail || (id && dataInput?.status === "approved")
                      ? true
                      : false
                  }
                  disabled={
                    isDetail || (id && dataInput?.status === "approved")
                      ? true
                      : false
                  }
                  placeholder={`Masukkan Tanggal Target`}
                  {...register("end_date")}
                  className="col-span-full"
                />
              </FormGroup>

              <FormGroup
                title={"Gambar *"}
                description={"Masukkan Gambar, Data ini wajib diisi"}
                className="pt-5"
              >
                <div>
                  <Button
                    variant="outline"
                    className="mb-3"
                    disabled={
                      isDetail || (id && dataInput?.status === "approved")
                        ? true
                        : false
                    }
                    onClick={() =>
                      openModal({
                        view: (
                          <FileUpload
                            label={title}
                            accept="img"
                            multiple={false}
                            btnLabel={"Upload"}
                            onUpload={async ({ files }) => {
                              if (files.length > 0)
                                setValue("image", undefined, {
                                  shouldValidate: true,
                                });
                              setValue("image", files[0]);
                            }}
                          />
                        ),
                        customSize: "620px",
                      })
                    }
                  >
                    <PiPlus /> {getValues("image") ? "Ubah" : "Pilih"} Gambar
                  </Button>
                  {getValues("image") && (
                    <div className="">
                      <div
                        className="relative w-full max-w-lg rounded-lg border border-gray-300 bg-white p-3 shadow-sm dark:border-gray-600 dark:bg-gray-800"
                        key={getValues("image").name}
                      >
                        <div className="relative w-full h-64 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                          <Image
                            src={
                              getValues("image") instanceof File
                                ? URL.createObjectURL(getValues("image"))
                                : getValues("image")
                            }
                            fill
                            className="object-contain"
                            priority
                            alt={
                              getValues("image") instanceof File
                                ? getValues("image").name
                                : "Uploaded Image"
                            }
                            sizes="(max-width: 768px) 100vw"
                          />
                          <ActionIcon
                            onClick={() =>
                              setValue("image", undefined, {
                                shouldValidate: true,
                              })
                            }
                            size="sm"
                            disabled={
                              isDetail ||
                              (id && dataInput?.status === "approved")
                                ? true
                                : false
                            }
                            variant="flat"
                            color="danger"
                            className="absolute top-2 right-2 bg-red-500/20 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full"
                          >
                            <PiTrashBold className="w-6 h-6" />
                          </ActionIcon>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
