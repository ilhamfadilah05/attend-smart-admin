"use client";
import alertNotification from "@/components/alert-notification";

import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import { Title, Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { routes } from "@/config/routes";
import EyeIcon from "@components/icons/eye";
import PencilIcon from "@components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";
import DateCell from "@/components/ui/date-cell";

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  currentPage,
  pageSize,
  name,
  created,
  action,
  deleteRole,
  detailRoleAccess,
  editRoleAccess,
  deleteRoleAccess,
}: any) => [
  {
    title: <HeaderCell title="No" />,
    dataIndex: "no",
    key: "no",
    width: 30,
    render: (_: string, row: any, index: number) => (
      <Text className="text-sm">
        {(currentPage - 1) * pageSize + index + 1}
      </Text>
    ),
  },

  {
    title: (
      <HeaderCell
        title={name}
        sortable
        ascending={
          sortConfig?.direction === "ASC" && sortConfig?.key === "NAME"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("NAME"),
    width: 100,
    dataIndex: "name",
    render: (name: string) => <Text className="text-sm">{name}</Text>,
  },
  {
    title: (
      <HeaderCell
        title={created}
        sortable
        ascending={
          sortConfig?.direction === "ASC" && sortConfig?.key === "DATE"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("DATE"),
    dataIndex: "created_at",
    width: 150,
    render: (created_at: Date) => (
      <DateCell date={created_at} timeFormat={"HH:mm"} />
    ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title={action} />,
    dataIndex: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-start gap-3 pe-4">
        {editRoleAccess && (
          <Tooltip size="sm" content="Edit Role" placement="top" color="invert">
            <Link href={routes.role.edit(row.id)}>
              <ActionIcon size="sm" variant="outline" aria-label={"Edit Role"}>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        )}
        {detailRoleAccess && (
          <Tooltip
            size="sm"
            content="Detail Role"
            placement="top"
            color="invert"
          >
            <Link href={routes.role.details(row.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={"Detail Role"}
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        )}
        {deleteRoleAccess && (
          <DeletePopover
            title={`Hapus Data`}
            description={`Apakah anda yakin ingin menghapus ${row.name}?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        )}
      </div>
    ),
  },
];
