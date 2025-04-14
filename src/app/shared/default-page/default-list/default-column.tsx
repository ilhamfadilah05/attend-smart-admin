"use client";

import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { IRoute, routes } from "@/config/routes";
import EyeIcon from "@components/icons/eye";
import PencilIcon from "@components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";
import DateCell from "@/components/ui/date-cell";
import { HeaderCellProps } from "../../table";
import { formatPrice } from "@hooks/use-price";
import cn from "@utils/class-names";

export interface DefaultColumnFormat {
  title: string;
  sortable: boolean;
  key: string;
  className?: string;
  textClassName?: string;
  width?: number;
  type: "text" | "date" | "number" | "link" | "currency" | "percentage";
  href?: string;
  formatter?: (value: any, row: Record<string, any>) => React.ReactNode;
  dateFormat?: string;
  timeFormat?: string;
  useTime?: boolean;
}

export interface DefaultColumnProps {
  sortConfig: any;
  onDeleteItem: any;
  onHeaderCellClick: any;
  currentPage: number;
  pageSize: number;
  editAccess: boolean;
  detailAccess: boolean;
  deleteAccess: boolean;
  routes: IRoute;
  title?: string;
  columnFormat?: DefaultColumnFormat[];
  useEdit?: boolean;
  useDelete?: boolean;
  useDetail?: boolean;
  useAction?: boolean;
  useNumber?: boolean;
  renderEdit?: (
    row: any,
    fetchData?: (query?: Record<string, any>) => Promise<void>
  ) => JSX.Element;
  renderDelete?: (
    row: any,
    fetchData?: (query?: Record<string, any>) => Promise<void>
  ) => JSX.Element;
  renderDetail?: (
    row: any,
    fetchData?: (query?: Record<string, any>) => Promise<void>
  ) => JSX.Element;
  fetchData?: (query?: Record<string, any>) => Promise<void>;
  additionalButton?: (
    row: any,
    fetchData?: (query?: Record<string, any>) => Promise<void>
  ) => JSX.Element | undefined;
  deletedKeyText?: string;
}

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  currentPage,
  pageSize,
  editAccess,
  detailAccess,
  deleteAccess,
  columnFormat,
  routes,
  title = "",
  useEdit = true,
  useDetail = true,
  useDelete = true,
  useAction = true,
  useNumber = false,
  renderEdit,
  renderDelete,
  renderDetail,
  fetchData,
  additionalButton,
  deletedKeyText = "name",
}: DefaultColumnProps) => {
  const valueColumn: Record<string, any>[] = [];
  if (useNumber) {
    valueColumn.push({
      title: <HeaderCell title="No" />,
      dataIndex: "id",
      key: "id",
      width: 30,
      render: (_: string, row: any, index: number) => (
        <Text className="text-sm">
          {" "}
          {(currentPage - 1) * pageSize + index + 1}
        </Text>
      ),
    });
  }

  columnFormat?.map(
    ({
      key,
      sortable,
      title,
      type,
      dateFormat,
      formatter,
      href,
      timeFormat,
      useTime = true,
      width,
      className,
      textClassName,
    }) => {
      const headerCell: HeaderCellProps = {
        title: title,
      };
      let onHeaderCell: any;
      if (sortable) {
        headerCell.sortable = sortable;
        headerCell.ascending =
          sortConfig?.direction === "-desc" && sortConfig?.key === key;
        onHeaderCell = () => onHeaderCellClick(key);
      }

      valueColumn.push({
        title: <HeaderCell {...headerCell} />,
        onHeaderCell,
        width: width,
        key: key,
        dataIndex: key,
        className,
        render: (value: any, row: Record<string, any>) => {
          let result: JSX.Element | string = "";

          if (formatter) value = formatter(value, row);

          if (type === "link") {
            result = (
              <Link href={href || ""} className={cn("text-sm", textClassName)}>
                {value}
              </Link>
            );
          } else if (type === "date") {
            if (useTime && !timeFormat) timeFormat = "HH:mm";
            result = (
              <DateCell
                date={value as Date}
                timeFormat={timeFormat}
                dateFormat={dateFormat}
              />
            );
          } else if (type === "currency") {
            result = (
              <Text className={cn("text-sm", textClassName)}>
                {formatPrice({
                  amount: +value,
                  currencyCode: "IDR",
                  locale: "id",
                  fractions: 2,
                })}
              </Text>
            );
          } else {
            result = (
              <Text className={cn("text-sm", textClassName)}>
                {value ?? "-"}
              </Text>
            );
          }

          return result;
        },
      });
    }
  );

  if (useAction) {
    const actions = {
      title: <HeaderCell title="Aksi" />,
      dataIndex: "action",
      width: 150,
      render: (_: string, row: any) => (
        <div
          className={cn(
            "flex items-center justify-start gap-3 pe-4",
            additionalButton && "grid grid-rows-2 grid-flow-col"
          )}
        >
          {editAccess &&
            useEdit &&
            (renderEdit ? (
              renderEdit(row, fetchData)
            ) : (
              <Tooltip
                size="sm"
                content={`Ubah ${title}`}
                placement="top"
                color="invert"
              >
                <Link href={routes.edit(row.id)}>
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={`Ubah ${title}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
            ))}
          {detailAccess &&
            useDetail &&
            (renderDetail ? (
              renderDetail(row, fetchData)
            ) : (
              <Tooltip
                size="sm"
                content={`Detail ${title}`}
                placement="top"
                color="invert"
              >
                <Link href={routes.details(row.id)}>
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={`Detail ${title}`}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
            ))}
          {deleteAccess &&
            useDelete &&
            (renderDelete ? (
              renderDelete(row, fetchData)
            ) : (
              <DeletePopover
                title={`Hapus Data`}
                description={`Apakah anda yakin ingin menghapus ${row[deletedKeyText] || "data ini"}?`}
                onDelete={() => onDeleteItem(row.id)}
              />
            ))}

          {additionalButton && additionalButton(row, fetchData)}
        </div>
      ),
    };

    valueColumn.push(actions);
  }

  return valueColumn;
};
