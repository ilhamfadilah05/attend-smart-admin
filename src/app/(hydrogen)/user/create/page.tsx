"use client";

import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CreateUser from "@/app/shared/user/user-create-edit/create-edit-user";
import { useRoleChecker } from "@/utils/role-checker";

export default function CreateProductPage() {
  const { ability } = useRoleChecker();

  const pageHeader = {
    title: `Membuat Pengguna`,
    breadcrumb: [
      { href: "/", name: "Halaman Utama" },
      {
        href: routes.user.list,
        name: "Pengguna",
      },
      {
        name: `Buat Pengguna`,
      },
    ],
  };
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      {ability.can("create", "users") && <CreateUser />}
    </>
  );
}
