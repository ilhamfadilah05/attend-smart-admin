/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PageHeader from "@/app/shared/page-header";
import { useEffect, useState } from "react";
import { useRoleChecker } from "@/utils/role-checker";
import { defaultOneService } from "@/app/shared/default-page/default-service";
import { apiPath, PageFormInputEdit, pageRoute, title } from "../page.config";
import PageForm from "../components/page-form";

type Props = {
  params: { slug: string };
};

export default function DetailFormPage({ params }: Props) {
  const [dataInput, setDataInput] = useState<PageFormInputEdit>();
  const { ability } = useRoleChecker();
  const pageHeader = {
    title: `Detail ${title}`,
    breadcrumb: [
      {
        href: "/",
        name: "Halaman Utama",
      },
      {
        href: pageRoute.list,
        name: title,
      },
      {
        name: `Detail ${title}`,
      },
      // { name: params.slug },
    ],
  };

  const getDataByUUID = async (id: any) => {
    const result = await defaultOneService(apiPath, id);

    if (result) {
      if ([true, false].includes(result.is_active))
        result.is_active = result.is_active ? "true" : "false";
      setDataInput(result);
    }
  };

  useEffect(() => {
    if (params.slug) {
      getDataByUUID(params.slug);
    }
  }, []);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {dataInput && Object.keys(dataInput).length > 0 && (
        // ability.can("read", `${apiPath}/:id`)
        // &&
        <PageForm
          isDetail={true}
          redirect={`${apiPath}`}
          title={title}
          className="pt-10"
          dataInput={dataInput}
          id={params.slug}
        />
      )}
    </>
  );
}
