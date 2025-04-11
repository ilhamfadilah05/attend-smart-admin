"use client";

import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import {
  apiPath,
  columnFormat,
  pageRoute,
  title,
  filterFields,
} from "./page.config";

export default function ListPage() {
  return (
    <>
      <DefaultTable
        routes={pageRoute}
        title={title}
        apiPath={`${apiPath}`}
        columnFormat={columnFormat}
        breadcrumb={[{ href: "/", name: "Halaman Utama" }, { name: title }]}
        tableLayout="fixed"
        filterFields={filterFields}
        useExport={false}
      />
    </>
  );
}
