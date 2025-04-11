"use client";

import DefaultTable from "@/app/shared/default-page/default-list/default-table";
import {
  apiPath,
  columnFormat,
  pageRoute,
  title,
  filterFields,
} from "./page.config";
import { ActionIcon, Button, Popover, Title, Tooltip, Text } from "rizzui";
import { PiNotification, PiUpload } from "react-icons/pi";
import Link from "next/link";
import { defaultDeleteService } from "@/app/shared/default-page/default-service";
import { fetchData } from "next-auth/client/_utils";
import { set } from "lodash";

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
        renderDetail={(row: any, fetchData) => {
          return (
            <Popover>
              <Popover.Trigger>
                <ActionIcon
                  size="sm"
                  variant="outline"
                  aria-label={`Lihat ${title}`}
                >
                  <PiNotification />
                </ActionIcon>
              </Popover.Trigger>
              <Popover.Content>
                {({ setOpen }) => (
                  <div className="w-56">
                    <Title as="h6">Kirim Notifikasi</Title>
                    <Text>
                      Apakah anda yakin ingin mengirim notifikasi ini ke semua
                      pengguna?
                    </Text>
                    <div className="flex justify-end gap-3 mb-1">
                      <Button size="sm" variant="outline">
                        No
                      </Button>
                      <Button
                        size="sm"
                        onClick={async () => {
                          const result = await defaultDeleteService(
                            `${apiPath}/send`,
                            row.id,
                            "",
                            "POST",
                            "Berhasil mengirim broadcast"
                          );

                          setOpen(false);
                        }}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                )}
              </Popover.Content>
            </Popover>
            // <Tooltip
            //   size="sm"
            //   content={`Kirim ${title}`}
            //   placement="top"
            //   color="invert"
            // >
            //   <ActionIcon
            //     size="sm"
            //     variant="outline"
            //     aria-label={`Lihat ${title}`}
            //     onClick={async () => {
            //       const result = await defaultDeleteService(
            //         `${apiPath}/send`,
            //         row.id,
            //         "",
            //         "POST",
            //         "Berhasil mengirim broadcast"
            //       );
            //       if (result && fetchData) fetchData();
            //     }}
            //   >
            //     <PiNotification />
            //   </ActionIcon>
            // </Tooltip>
          );
        }}
      />
    </>
  );
}
