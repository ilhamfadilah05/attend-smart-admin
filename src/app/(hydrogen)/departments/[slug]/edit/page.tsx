"use client";

import PageHeader from "@/app/shared/page-header";
import PageForm from "@/app/(hydrogen)/departments/components/page-form";
import { useEffect, useState } from "react";
import { defaultOneService } from "@/app/shared/default-page/default-service";
import {
  apiPath,
  PageFormInputEdit,
  urlRoot,
  title,
} from "@/app/(hydrogen)/departments/page.config";

type Props = {
  params: { slug: string };
};

export default function DetailPage({ params }: Props) {
  const [dataInput, setDataInput] = useState<PageFormInputEdit>();

  const pageHeader = {
    title,
    breadcrumb: [
      {
        href: "/",
        name: "Halaman Utama",
      },
      {
        href: `/${urlRoot}`,
        name: title,
      },
      {
        name: `Detail ${title}`,
      },
    ],
  };

  async function getDataByUUID(id: string) {
    const result: PageFormInputEdit = await defaultOneService(apiPath, id);

    if (result) {
      setDataInput({
        name: result.name,
      });
    }
  }

  useEffect(() => {
    if (params.slug) {
      getDataByUUID(params.slug);
    }
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {dataInput && (
        <PageForm
          isDetail={false}
          redirect={`/${urlRoot}`}
          title={title}
          dataInput={dataInput}
          id={params.slug}
        />
      )}
    </>
  );
}
