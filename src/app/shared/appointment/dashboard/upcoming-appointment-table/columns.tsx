"use client";
import { HeaderCell } from "@/app/shared/table";
import { Text, Checkbox, ActionIcon, Tooltip, Select } from "rizzui";
import PencilIcon from "@components/icons/pencil";
import EyeIcon from "@components/icons/eye";
import AvatarCard from "@ui/avatar-card";
import DeletePopover from "@/app/shared/delete-popover";
import DateCell from "@ui/date-cell";
import { Type } from "@/data/appointment-data";
import { useState } from "react";
import { PiCheckCircleBold, PiClockBold } from "react-icons/pi";

const statusOptions = [
  { label: "Waiting", value: "Waiting" },
  { label: "Scheduled", value: "Scheduled" },
];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={"Select All"}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: "checked",
    key: "checked",
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          aria-label={"ID"}
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Project HID" />,
    onHeaderCell: () => onHeaderCellClick("id"),
    dataIndex: "id",
    key: "id",
    width: 130,
    render: (id: string) => <Text>#{id}</Text>,
  },
  {
    title: <HeaderCell title="Project Name" />,
    onHeaderCell: () => onHeaderCellClick("patient.name"),
    dataIndex: "patient",
    key: "patient",
    width: 250,
    render: (patient: { name: string; email: string }) => (
      <div>
        <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">{patient.name}</Text>
        {/* {patient.email && <Text className="text-[13px] text-gray-500">{patient.email}</Text>} */}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Project PIC" />,
    onHeaderCell: () => onHeaderCellClick("doctor.name"),
    dataIndex: "doctor",
    key: "doctor",
    width: 320,
    render: (doctor: { name: string; email: string; avatar: string }) => (
      <div>
        <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">{doctor.name}</Text>
        {doctor.email && <Text className="text-[13px] text-gray-500">{doctor.email}</Text>}
      </div>
    ),
  },
  {
    title: <HeaderCell className="whitespace-nowrap" title="Due Date" />,
    dataIndex: "date",
    key: "date",
    width: 250,
    render: (createdDate: Date) => <DateCell date={createdDate} />,
  },
  {
    title: (
      <HeaderCell
        title={<span className="whitespace-nowrap">Service Type</span>}
        sortable
        ascending={sortConfig?.direction === "asc" && sortConfig?.key === "type"}
      />
    ),
    dataIndex: "type",
    key: "type",
    width: 180,
    onHeaderCell: () => onHeaderCellClick("type"),
    render: (type: Type) => <Text className="whitespace-nowrap font-medium text-gray-900">{type}</Text>,
  },

  {
    title: (
      <HeaderCell title="Status" sortable ascending={sortConfig?.direction === "asc" && sortConfig?.key === "status"} />
    ),
    dataIndex: "status",
    key: "status",
    width: 260,
    onHeaderCell: () => onHeaderCellClick("status"),
    render: (status: string) => {
      return <StatusSelect selectItem={status} />;
    },
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: "action",
    key: "action",
    width: 180,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={"Edit Appointment"} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={"Edit Appointment"}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content={"View Appointment"} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={"View Appointment"}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete the appointment`}
          description={`Are you sure you want to delete this #{row.id} appointment?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find((option) => option.label === selectItem);
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) => renderOptionDisplayValue(option.value as string)}
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case "Scheduled":
      return (
        <div className="flex items-center">
          <PiClockBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">{value}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-orange text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">{value}</Text>
        </div>
      );
  }
}
