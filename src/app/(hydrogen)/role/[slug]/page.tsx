/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { useEffect, useState } from "react";
import { RoleApi } from "@/app/api/role";
import { RoleFormInput } from "@/validators/create-roles.schema";
import { useRoleChecker } from "@/utils/role-checker";
import FormRole from "@/app/shared/role/role-create-edit/form-role";

type Props = {
  params: { slug: string };
};

export default function EditCategory({ params }: Props) {
  const [dataRole, setDataRole] = useState<RoleFormInput>();
  const { ability } = useRoleChecker();

  const pageHeader = {
    title: "Detail Akses",
    breadcrumb: [
      { href: "/", name: "Halaman Utama" },
      {
        href: routes.role.list,
        name: "Akses",
      },
      {
        name: "Detail Akses",
      },
      // { name: params.slug },
    ],
  };

  const getDataByUUID = async (uuid: any) => {
    if (ability.can("read", "role/:uuid")) {
      const result = await RoleApi.getByUUID(uuid);
      if (result && result?.meta?.status) {
        setDataRole({
          name: result.data.name,
          roleList: result.data.access,
        });
      }
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
      {dataRole?.name && ability.can("read", "role/:uuid") && (
        <FormRole id={params.slug} role={dataRole} isDetail="1" />
      )}
    </>
  );
}
