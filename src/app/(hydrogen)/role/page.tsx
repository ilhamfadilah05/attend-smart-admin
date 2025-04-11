"use client";
import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import PageHeader from "@/app/shared/page-header";
import RoleTable from "@/app/shared/role/role-list/role-table";
import { useRoleChecker } from "@/utils/role-checker";
import {
  apiPath,
  columnFormat,
  filterFields,
  pageRoute,
  title,
} from "./page.config";

export default function RolePage() {
  const { ability } = useRoleChecker();

  let pageHeader = {
    title: "Halaman Akses",
    breadcrumb: [
      { href: "/", name: "Halaman Utama" },
      {
        name: "Akses",
      },
    ],
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
    //     title={pageHeader.title}
    //     breadcrumb={pageHeader.breadcrumb}
    //   ></PageHeader>

    //   {ability.can("read", "roles") && <RoleTable />}
    // </>
  );
}
