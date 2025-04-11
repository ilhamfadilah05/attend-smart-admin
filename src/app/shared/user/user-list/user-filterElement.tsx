"use client";
import React from "react";
import { PiMagnifyingGlassBold, PiTrashDuotone } from "react-icons/pi";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DefaultAsyncSelect from "../../default-page/default-form/default-async-select";
import { DefaultOption } from "../../default-page/dto";
import { defaultService } from "../../default-page/default-service";
import { Select } from "rizzui";
import { staticUserStatus } from "@/data/static-data";

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  const statusOptions = staticUserStatus.map((v) => ({
    label: v.name,
    value: v.id,
  }));

  return (
    <>
      <Input
        type="search"
        placeholder={"Cari Nama ..."}
        value={filters["name"]}
        onClear={() => updateFilter("name", "")}
        onChange={(event) => updateFilter("name", event.target.value)}
        inputClassName="h-9"
        clearable={true}
        prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
      />

      <Select
        key={"status"}
        placeholder={`Cari Status ...`}
        value={filters["status"] || ""}
        options={statusOptions || []}
        displayValue={(selected) =>
          statusOptions?.find((r) => r?.value === selected)?.label ?? ""
        }
        onChange={(v?: Record<string, any>) =>
          updateFilter("status", v?.value || "")
        }
        onClear={() => updateFilter("status", "")}
        clearable={true}
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
