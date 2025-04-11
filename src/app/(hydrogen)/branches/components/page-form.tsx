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
import {
  apiPath,
  PageFormInputEdit,
  PageFormSchemaEdit,
} from "@/app/(hydrogen)/branches/page.config";
import { defaultFormService } from "@/app/shared/default-page/default-service";
import dynamic from "next/dynamic";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ReactDatePicker from "react-datepicker";

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
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow">
            <div
              className={cn("grid grid-cols-1 ", isModalView ? "" : "gap-5")}
            >
              <hr />

              <FormGroup
                title="Nama Cabang*"
                description="Masukkan Nama Cabang, Data ini wajib diisi"
                className="pt-5"
              >
                <Input
                  key="name"
                  type="text"
                  disabled={isDetail}
                  placeholder="Masukkan nama cabang"
                  {...register("name")}
                  error={errors.name?.message as string}
                  className="col-span-full"
                />
              </FormGroup>

              <FormGroup
                title="Toleransi Terlambat*"
                description="Masukkan Toleransi Keterlambatan, Data ini wajib diisi"
                className="pt-5"
              >
                <Input
                  key="title"
                  type="number"
                  disabled={isDetail}
                  placeholder="Masukkan toleransi terlambat"
                  {...register("tolerance", { valueAsNumber: true })}
                  error={errors.tolerance?.message as string}
                  className="col-span-full"
                  suffix="Menit"
                />
              </FormGroup>
              <FormGroup
                title="Waktu Absen Masuk Kerja*"
                description="Masukkan Waktu Absen Masuk Kerja, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="work_start_time"
                  name="work_start_time"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Input
                        key="title"
                        type="time"
                        disabled={isDetail}
                        placeholder="Masukkan toleransi terlambat"
                        {...register("work_start_time")}
                        error={error?.message}
                        className="col-span-full"
                        onChange={onChange}
                      />
                    );
                  }}
                />
              </FormGroup>

              <FormGroup
                title="Waktu Absen Pulang Kerja*"
                description="Masukkan Waktu Absen Pulang Kerja, Data ini wajib diisi"
                className="pt-5"
              >
                <Controller
                  key="work_end_time"
                  name="work_end_time"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Input
                        key="title"
                        type="time"
                        disabled={isDetail}
                        placeholder="Masukkan toleransi terlambat"
                        {...register("work_end_time")}
                        error={error?.message}
                        className="col-span-full"
                        onChange={onChange}
                      />
                    );
                  }}
                />
              </FormGroup>

              <FormGroup
                title="Radius Lokasi*"
                description="Masukkan Radius Lokasi, Data ini wajib diisi"
                className="pt-5"
              >
                <Input
                  key="title"
                  type="number"
                  disabled={isDetail}
                  placeholder="Masukkan radius lokasi"
                  {...register("radius", { valueAsNumber: true })}
                  error={errors.radius?.message as string}
                  className="col-span-full"
                  onChange={(e) => {
                    setValue("radius", parseInt(e.target.value), {
                      shouldValidate: true,
                    });
                  }}
                  suffix="Meter"
                />
              </FormGroup>

              <FormGroup
                title="Lokasi Cabang*"
                description="Pilih Lokasi Cabang, Data ini wajib diisi"
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
                          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
                        }
                      >
                        <div className="col-span-full">
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={14}
                            onClick={(event: google.maps.MapMouseEvent) => {
                              if (isDetail) return;
                              if (event.latLng) {
                                onChange(
                                  `${event.latLng.lat()},${event.latLng.lng()}`
                                );
                              }
                            }}
                          >
                            {value && (
                              <Marker
                                position={{
                                  lat: parseFloat(value.split(",")[0]),
                                  lng: parseFloat(value.split(",")[1]),
                                }}
                              />
                            )}
                            {value && (
                              <Circle
                                center={{
                                  lat: parseFloat(value.split(",")[0]),
                                  lng: parseFloat(value.split(",")[1]),
                                }}
                                radius={getValues("radius")} // 10 meter
                                options={{
                                  fillColor: "#FF0000",
                                  fillOpacity: 0.3,
                                  strokeColor: "#FF0000",
                                  strokeOpacity: 0.8,
                                  strokeWeight: 2,
                                }}
                              />
                            )}
                          </GoogleMap>
                        </div>
                      </LoadScript>
                    );
                  }}
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
