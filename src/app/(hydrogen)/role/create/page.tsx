"use client";

import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { useRoleChecker } from "@/utils/role-checker";
import FormRole from "@/app/shared/role/role-create-edit/form-role";

export default function CreateProductPage() {
  const { ability } = useRoleChecker();

  let pageHeader = {
    title: `Buat Akses`,
    breadcrumb: [
      { href: "/", name: "Halaman Utama" },
      {
        href: routes.role.list,
        name: "Akses",
      },
      {
        name: `Buat Akses`,
      },
    ],
  };
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {
        // ability.can("create", "roles") &&
        <FormRole />
      }
    </>
  );
}
