"use client";

import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import {
  apiPath,
  columnFormat,
  pageRoute,
  title,
  filterFields,
} from "./page.config";
import { Tooltip } from "rizzui";
import DeletePopover from "@/app/shared/delete-popover";
import { defaultDeleteService } from "@/app/shared/default-page/default-service";

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
        renderDelete={(row: any, fetchData) => {
          if (row.is_default) return <></>;
          return (
            <Tooltip
              size="sm"
              content={`Hapus ${row.name}`}
              placement="top"
              color="invert"
              key={`delete_${row.id}`}
            >
              <DeletePopover
                title={`Hapus Data`}
                description={`Apakah anda yakin ingin menghapus ${row.id}?`}
                onDelete={async () => {
                  const result = await defaultDeleteService(apiPath, row.id);
                  if (result && fetchData) fetchData();
                }}
              />
            </Tooltip>
          );
        }}
      />
    </>
  );
}
