"use client";

import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import {
  apiPath,
  columnFormat,
  filterFields,
  pageRoute,
  title,
} from "./page.config";
import { ActionIcon, Tooltip } from "rizzui";
import Link from "next/link";
import PencilIcon from "@components/icons/pencil";

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
        renderEdit={(row: any) => {
          if (
            row.type === "LEMBUR" ||
            row.type === "WFH" ||
            row.type === "IZIN" ||
            row.type === "SAKIT"
          )
            return <></>;
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
        addButton={() => {
          return <></>;
        }}
      />
    </>
  );
}
