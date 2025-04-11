"use client";
import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import PageHeader from "@/app/shared/page-header";
import UserTable from "@/app/shared/user/user-list/user-table";
import { useRoleChecker } from "@/utils/role-checker";
import { useEffect } from "react";
import {
  apiPath,
  columnFormat,
  filterFields,
  pageRoute,
  title,
} from "./page.config";

export default function UserPage() {
  const { ability } = useRoleChecker();

  let pageHeader = {
    title: "",
    breadcrumb: [{ href: "/", name: "Halaman Utama" }, { name: "Pengguna" }],
  };

  return (
    <>
      {/* {ability.can("read", apiPath) && ( */}
      <DefaultTable
        routes={pageRoute}
        title={title}
        apiPath={`${apiPath}`}
        columnFormat={columnFormat}
        filterFields={filterFields}
        breadcrumb={[{ href: "/", name: "Halaman Utama" }, { name: title }]}
        tableLayout="fixed"
        useExport={false}
      />
      {/* )} */}
    </>
    // <>
    //   <PageHeader
    //     title="Halaman Pengguna"
    //     breadcrumb={pageHeader.breadcrumb}
    //   ></PageHeader>
    //   {ability.can("read", "users") && <UserTable />}
    // </>
  );
}
