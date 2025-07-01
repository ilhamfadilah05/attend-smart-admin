"use client";

import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import {
  apiPath,
  columnFormat,
  pageRoute,
  title,
  filterFields,
} from "./page.config";
import PencilIcon from "@components/icons/pencil";
import Link from "next/link";

import { ActionIcon, Tooltip } from "rizzui";
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
        addButton={() => {
          return <></>;
        }}
        renderEdit={(row: any) => {
          if (row.status === "approved") return <></>;
          return (
            <Tooltip
              size="sm"
              content={`Ubah ${title}`}
              placement="top"
              color="invert"
            >
              <Link href={pageRoute.edit(row.id)}>
                <ActionIcon
                  size="sm"
                  variant="outline"
                  aria-label={`Ubah ${title}`}
                >
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
          );
        }}
        renderDelete={(row: any, fetchData) => {
          if (row.status === "approved") return <></>;
          return (
            <Tooltip
              size="sm"
              content={`Hapus ${row.name}`}
              placement="top"
              color="invert"
              key={`delete_${row.uuid}`}
            >
              <DeletePopover
                title={`Hapus Data`}
                description={`Apakah anda yakin ingin menghapus data ini?`}
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
