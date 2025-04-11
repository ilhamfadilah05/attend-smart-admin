"use client";

import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import {
  apiPath,
  columnFormat,
  filterFields,
  pageRoute,
  title,
} from "./page.config";

export default function ListPage() {
  return (
    <>
      <DefaultTable
        routes={pageRoute}
        title={title}
        apiPath={`${apiPath}`}
        columnFormat={columnFormat}
        filterFields={filterFields}
        breadcrumb={[{ href: "/", name: "Halaman Utama" }, { name: title }]}
        tableLayout="fixed"
        useExport={false}
        addButton={() => {
          return <></>;
        }}
      />
    </>
  );
}
