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
import {
  Circle,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { formatDate } from "@utils/format-date";
const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
  ssr: false,
});

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  id?: string;
  isModalView?: boolean;
  dataInput?: any;
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
  title = "",
  isDetail = false,
  redirect = "",
  className = "",
}: Props) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const onSubmit: SubmitHandler<PageFormInputEdit> = async (data) => {
    console.log("data form", data);
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

    if (result) {
      router.replace(redirect);
      console.log("result", result);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Form<PageFormInputEdit>
        validationSchema={PageFormSchemaEdit}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onSubmit",
          defaultValues: dataInput
            ? {
                ...dataInput,
                date_attend: dataInput.date_attend
                  ? new Date(
                      new Date(dataInput.date_attend).getTime() +
                        7 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split(".")[0]
                  : undefined,
              }
            : {},
        }}
        className={cn(
          "isomorphic-form flex flex-grow flex-col @container",
          className
        )}
      >
        {({
          setValue,
          getValues,
          register,
          formState: { errors },
          control,
        }) => {
          return (
            <>
              <div className="flex-grow">
                <div
                  className={cn(
                    "grid grid-cols-1 ",
                    isModalView ? "" : "gap-5"
                  )}
                >
                  <hr />

                  <FormGroup
                    title={"Karyawan"}
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
                          disabled={id ? true : false}
                          className="col-span-full"
                        />
                      )}
                    />
                  </FormGroup>

                  <FormGroup
                    title={"Tanggal Absensi"}
                    description={"Pilih Tanggal Absensi"}
                    className="pt-5"
                  >
                    <Input
                      key={"date_attend"}
                      type={"datetime-local"}
                      readOnly={isDetail}
                      disabled={isDetail}
                      placeholder={`Masukkan Tanggal Absensi`}
                      {...register("date_attend")}
                      className="col-span-full"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Lokasi Absensi"
                    description="Pilih Lokasi Absensi"
                    className="pt-5"
                  >
                    <Controller
                      key="lat_long"
                      name="lat_long"
                      control={control}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => {
                        return (
                          <LoadScript
                            googleMapsApiKey={
                              process.env
                                .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
                            }
                          >
                            <div className="col-span-full">
                              <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                  lat: parseFloat(value!.split(",")[0]),
                                  lng: parseFloat(value!.split(",")[1]),
                                }}
                                zoom={14}
                                onClick={(event: google.maps.MapMouseEvent) => {
                                  if (isDetail) return;
                                }}
                              >
                                {value && (
                                  <>
                                    <Marker
                                      position={{
                                        lat: parseFloat(value.split(",")[0]),
                                        lng: parseFloat(value.split(",")[1]),
                                      }}
                                      icon={{
                                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                                      }}
                                    />

                                    <Marker
                                      position={{
                                        lat: parseFloat(
                                          getValues("lat_long_branch")!.split(
                                            ","
                                          )[0]
                                        ),
                                        lng: parseFloat(
                                          getValues("lat_long_branch")!.split(
                                            ","
                                          )[1]
                                        ),
                                      }}
                                    />

                                    {getValues("radius_branch") && (
                                      <Circle
                                        center={{
                                          lat: parseFloat(
                                            getValues("lat_long_branch")!.split(
                                              ","
                                            )[0]
                                          ),
                                          lng: parseFloat(
                                            getValues("lat_long_branch")!.split(
                                              ","
                                            )[1]
                                          ),
                                        }}
                                        radius={getValues("radius_branch")} // 10 meter
                                        options={{
                                          fillColor: "#FF0000",
                                          fillOpacity: 0.3,
                                          strokeColor: "#FF0000",
                                          strokeOpacity: 0.8,
                                          strokeWeight: 2,
                                        }}
                                      />
                                    )}
                                  </>
                                )}
                              </GoogleMap>
                            </div>
                          </LoadScript>
                        );
                      }}
                    />
                  </FormGroup>
                  <FormGroup
                    title={"Tipe Absensi"}
                    description={"Pilih Tipe Absensi"}
                    className="pt-5"
                  >
                    <Controller
                      key="type"
                      name="type"
                      control={control}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <DefaultAsyncSelect
                          placeholder={`Pilih Tipe Absensi`}
                          onChange={onChange}
                          value={value !== undefined ? value : ""}
                          getDataOptions={async (param?: string) => {
                            return [
                              {
                                value: "MASUK",
                                label: "Masuk",
                              },
                              {
                                value: "KELUAR",
                                label: "Pulang",
                              },
                              {
                                value: "IZIN",
                                label: "Izin",
                              },
                              {
                                value: "WFH",
                                label: "WFH",
                              },
                              {
                                value: "SAKIT",
                                label: "Sakit",
                              },
                            ];
                          }}
                          error={error?.message}
                          disabled={isDetail}
                          className="col-span-full"
                        />
                      )}
                    />
                  </FormGroup>
                  <FormGroup
                    title={"Alamat Absensi"}
                    description={"Masukkan alamat absensi"}
                    className="pt-5"
                  >
                    <Textarea
                      key={"address"}
                      readOnly={isDetail}
                      placeholder={``}
                      {...register("address")}
                      error={errors.address?.message as string}
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
                        disabled={isDetail}
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
                        <PiPlus /> {getValues("image") ? "Ubah" : "Pilih"}{" "}
                        Gambar
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
                                disabled={isDetail}
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
          );
        }}
      </Form>
    </>
  );
}
