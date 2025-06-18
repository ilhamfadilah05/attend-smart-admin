/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { useEffect, useState } from "react";
import { RoleApi } from "@/app/api/role";
import { RoleFormInput } from "@/validators/create-roles.schema";
import { useRoleChecker } from "@/utils/role-checker";
import FormRole from "@/app/shared/role/role-create-edit/form-role";
const pageHeader = {
  title: "Akses",
  breadcrumb: [
    { href: "/", name: "Halaman Utama" },
    {
      href: routes.role.list,
      name: "Akses",
    },
    {
      name: "Ubah Akses",
    },
  ],
};

export default function EditRole({ params }: { params: { slug: string } }) {
  const [dataRole, setDataRole] = useState<RoleFormInput>();
  const { ability } = useRoleChecker();

  const getDataByid = async (id: any) => {
    // if (ability.can("update", "roles/:id")) {
    //   const result = await RoleApi.getByUUID(id);
    //   if (result.statusCode === 200) {
    //     setDataRole({
    //       name: result.data.name,
    //       roleList: result.data.access,
    //     });
    //   }
    // }
    const result = await RoleApi.getByUUID(id);
    if (result.statusCode === 200) {
      console.log(result.data.access);
      setDataRole({
        name: result.data.name,
        roleList: result.data.access,
      });
    }
  };

  useEffect(() => {
    if (params.slug) {
      getDataByid(params.slug);
    }
  }, []);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {dataRole?.name && ability.can("update", "roles/:id") && (
        <FormRole id={params.slug} role={dataRole} />
      )}
    </>
  );
}
