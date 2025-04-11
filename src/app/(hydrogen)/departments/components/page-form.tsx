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
} from "@/app/(hydrogen)/departments/page.config";
import { defaultFormService } from "@/app/shared/default-page/default-service";
import dynamic from "next/dynamic";

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
                title="Nama Jabatan*"
                description="Masukkan Nama Jabatan, Data ini wajib diisi"
                className="pt-5"
              >
                <Input
                  key="title"
                  type="text"
                  disabled={isDetail}
                  placeholder="Masukkan nama jabatan"
                  {...register("name")}
                  error={errors.name?.message as string}
                  className="col-span-full"
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
