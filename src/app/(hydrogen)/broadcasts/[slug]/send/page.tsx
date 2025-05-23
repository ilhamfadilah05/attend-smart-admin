"use client";

import PageHeader from "@/app/shared/page-header";
import PageForm from "@/app/(hydrogen)/broadcasts/components/page-form";
import { useEffect, useState } from "react";
import { defaultOneService } from "@/app/shared/default-page/default-service";
import {
  apiPath,
  PageFormInputEdit,
  urlRoot,
  title,
} from "@/app/(hydrogen)/broadcasts/page.config";
import PageFormSendBroadcast from "../../components/page-form-send-broadcast";

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
      setDataInput(result);
    }
  }

  useEffect(() => {
    if (params.slug) {
      getDataByUUID(params.slug);
    }
  }, [params.slug]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {dataInput && (
        <PageFormSendBroadcast
          redirect={`/${urlRoot}`}
          title={title}
          id={params.slug}
        />
      )}
    </>
  );
}
