"use client";

import PageHeader from "@/app/shared/page-header";
import { useEffect, useState } from "react";
import { defaultOneService } from "@/app/shared/default-page/default-service";
// import {
//   apiPath,
//   PageFormInputEdit,
//   urlRoot,
//   title,
// } from "@/app/(hydrogen)/branches/page.config";
import PageForm from "../../components/page-form";
import { apiPath, PageFormInputEdit, urlRoot, title } from "../../page.config";

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
        radius: result.radius,
        tolerance: result.tolerance,
        lat_long: result.lat_long,
        work_start_time: result.work_start_time,
        work_end_time: result.work_end_time,
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
