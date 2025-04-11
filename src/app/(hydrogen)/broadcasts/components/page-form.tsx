/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "@utils/class-names";
import Link from "next/link";
import FormGroup from "@/app/shared/form-group";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionIcon, Input, Textarea } from "rizzui";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  apiPath,
  PageFormInputEdit,
  PageFormSchemaEdit,
} from "@/app/(hydrogen)/broadcasts/page.config";
import { defaultFormService } from "@/app/shared/default-page/default-service";
import dynamic from "next/dynamic";
import { PiPlus, PiTrashBold } from "react-icons/pi";
import FileUpload from "@/app/shared/file-upload";
import { useModal } from "@/app/shared/modal-views/use-modal";
import Image from "next/image";

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
                title="Judul*"
                description="Masukkan Judul, Data ini wajib diisi"
                className="pt-5"
              >
                <Input
                  key="title"
                  type="text"
                  disabled={isDetail}
                  placeholder="Masukkan judul"
                  {...register("title")}
                  error={errors.title?.message as string}
                  className="col-span-full"
                />
              </FormGroup>

              <FormGroup
                title="Isi*"
                description="Masukkan Isi, Data ini wajib diisi"
                className="pt-5"
              >
                <Textarea
                  key="body"
                  disabled={isDetail}
                  placeholder="Masukkan isi"
                  {...register("body")}
                  error={errors.body?.message as string}
                  className="col-span-full"
                />
              </FormGroup>
              <FormGroup
                title={"Gambar"}
                description={"Masukkan Gambar"}
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
      )}
    </Form>
  );
}
