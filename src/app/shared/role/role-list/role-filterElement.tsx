"use client";
import React from "react";
import { PiMagnifyingGlassBold, PiTrashDuotone } from "react-icons/pi";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusOptions = [
  {
    value: "publish",
    name: "Publish",
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">Publish</Text>
      </div>
    ),
  },
  {
    value: "pending",
    name: "Pending",
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
      </div>
    ),
  },
  {
    value: "draft",
    name: "Draft",
    label: (
      <div className="flex items-center">
        <Badge className="bg-gray-400" renderAsDot />
        <Text className="ms-2 font-medium text-gray-600">Draft</Text>
      </div>
    ),
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function FilterElement({ isFiltered, filters, updateFilter, handleReset }: FilterElementProps) {
  return (
    <>
      {/* <PriceField
        value={filters['price']}
        onChange={(data) => updateFilter('price', data)}
      />

      <StatusField
        label="Status"
        options={statusOptions}
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected: string) =>
          statusOptions.find((option) => option.value === selected)?.label ??
          selected
        }
        className={'font-medium text-gray-700'}
      /> */}

      <Input
        type="search"
        placeholder="Cari berdasarkan nama..."
        value={filters["name"]}
        onClear={() => updateFilter("name", "")}
        onChange={(event) => updateFilter("name", event.target.value)}
        inputClassName="h-9"
        clearable={true}
        prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
      />

      {/* {isFiltered ? ( */}
      <Button
        size="sm"
        onClick={() => {
          handleReset();
        }}
        className="h-8 bg-gray-200/70"
        variant="flat"
      >
        <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Hapus
      </Button>
      {/* ) : null} */}
    </>
  );
}
