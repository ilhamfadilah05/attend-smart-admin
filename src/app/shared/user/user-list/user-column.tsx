"use client";
import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { routes } from "@/config/routes";
import DateCell from "@/components/ui/date-cell";
import PencilIcon from "@components/icons/pencil";
import EyeIcon from "@components/icons/eye";
import { Badge } from "@/components/ui/badge";
import { staticUserStatus } from "@/data/static-data";
import cn from "@utils/class-names";

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  currentPage,
  pageSize,
  editUserAccess,
  detailUserAccess,
}: any) => [
  {
    title: <HeaderCell title="No" />,
    dataIndex: "uuid",
    key: "uuid",
    width: 30,
    render: (_: string, row: any, index: number) => (
      <Text className="text-sm">
        {" "}
        {(currentPage - 1) * pageSize + index + 1}
      </Text>
    ),
  },

  {
    title: (
      <HeaderCell
        title={"Name"}
        sortable
        ascending={sortConfig?.direction === "+" && sortConfig?.key === "name"}
      />
    ),
    onHeaderCell: () => onHeaderCellClick("name"),
    width: 150,
    dataIndex: "name",
    render: (value: string, row: any) => (
      <>
        <Text className="text-sm font-bold">{value}</Text>
        <Text className="text-sm">{row?.email}</Text>
      </>
    ),
  },
  // {
  //   title: <HeaderCell title="Email" />,
  //   dataIndex: "email",
  //   key: "email",
  //   width: 150,
  //   render: (value: string, row: any) => <Text className="text-sm">{value}</Text>,
  // },

  {
    title: <HeaderCell title={"Nama Role"} />,
    dataIndex: "role_name",
    key: "role_name",
    width: 100,
    render: (value: string, row: any) => (
      <Text className="text-sm">{row?.role?.name || "-"}</Text>
    ),
  },
  {
    title: <HeaderCell title={"Status"} />,
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (value: string) => {
      const userStatus = staticUserStatus.find((item) => item.id === value);

      return (
        <Badge
          color={userStatus?.color || "info"}
          className={cn(userStatus?.id === "BLOCK" && "bg-gray-700 text-white")}
        >
          {userStatus?.name || value}
        </Badge>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title={"Tanggal Dibuat"}
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
    title: <HeaderCell title={"Aksi"} />,
    dataIndex: "action",
    width: 70,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-start gap-3 pe-4">
        {editUserAccess && (
          <Tooltip
            size="sm"
            content={"Edit User"}
            placement="top"
            color="invert"
          >
            <Link href={routes.user.edit(row.id)}>
              <ActionIcon size="sm" variant="outline" aria-label={"Edit User"}>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        )}
        {detailUserAccess && (
          <Tooltip
            size="sm"
            content={"Detail User"}
            placement="top"
            color="invert"
          >
            <Link href={routes.user.details(row.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={"Detail User"}
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        )}
      </div>
    ),
  },
];
