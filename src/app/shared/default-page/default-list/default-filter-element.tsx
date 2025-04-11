"use client";

import React from "react";
import { PiTrashDuotone } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterFieldDto } from "../dto";
import { Grid, Select, Textarea } from "rizzui";
import { DatePicker } from "@ui/datepicker";
import { formatDate } from "@utils/format-date";
import DefaultNumberInput from "../default-form/default-number-input";
import DefaultAsyncSelect from "../default-form/default-async-select";
import cn from "@utils/class-names";

type FilterElementProps = {
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
  filterFields?: FilterFieldDto[];
};

export default function FilterElement({
  filters,
  updateFilter,
  handleReset,
  filterFields = [],
}: FilterElementProps) {
  return (
    <>
      {filterFields.map(
        ({
          key,
          label,
          type,
          options,
          getDataOptions,
          className,
          is_label,
        }) => {
          if (type === "select") {
            return (
              <Select
                key={key}
                label={is_label ? label : undefined}
                placeholder={`Cari ${label} ...`}
                value={filters[key] || ""}
                options={options || []}
                displayValue={(selected) =>
                  options?.find((r) => r?.value === selected)?.label ?? ""
                }
                onChange={(v?: Record<string, any>) =>
                  updateFilter(key, v?.value || "")
                }
                onClear={() => updateFilter(key, "")}
                clearable={true}
              />
            );
          } else if (type === "async-select") {
            return (
              <DefaultAsyncSelect
                key={key}
                label={is_label ? label : undefined}
                placeholder={`Cari ${label} ...`}
                onChange={(v) => {
                  return updateFilter(key, (v as string) || "");
                }}
                value={filters[key] || ""}
                getDataOptions={getDataOptions}
              />
            );
          } else if (type === "file") {
          } else if (type === "curr_range") {
            const keyGte = `${key}_gte`;
            const keyLte = `${key}_lte`;

            return (
              <Grid key={key} columns="2">
                <Grid.Col>
                  <DefaultNumberInput
                    key={keyGte}
                    placeholder={`${label} Mulai ...`}
                    formatType="numeric"
                    displayType="input"
                    value={filters[keyGte] || ""}
                    onChange={(event) => {
                      const value = event.target.value || "";
                      updateFilter(keyGte, value?.replaceAll(",", ""));
                    }}
                    customInput={Input as React.ComponentType<unknown>}
                    thousandSeparator={","}
                  />
                </Grid.Col>
                <Grid.Col>
                  <DefaultNumberInput
                    key={keyLte}
                    placeholder={`${label} Akhir ...`}
                    formatType="numeric"
                    displayType="input"
                    value={filters[keyLte] || ""}
                    onChange={(event) => {
                      const value = event.target.value || "";
                      updateFilter(keyLte, value?.replaceAll(",", ""));
                    }}
                    customInput={Input as React.ComponentType<unknown>}
                    thousandSeparator={","}
                  />
                </Grid.Col>
              </Grid>
            );
          } else if (type === "num_range") {
            const keyGte = `${key}_gte`;
            const keyLte = `${key}_lte`;

            return (
              <Grid key={key} columns="2">
                <Grid.Col>
                  <DefaultNumberInput
                    key={keyGte}
                    placeholder={`${label} Mulai ...`}
                    formatType="numeric"
                    displayType="input"
                    value={filters[keyGte] || ""}
                    onChange={(event) =>
                      updateFilter(keyGte, event.target.value)
                    }
                    customInput={Input as React.ComponentType<unknown>}
                  />
                </Grid.Col>
                <Grid.Col>
                  <DefaultNumberInput
                    key={keyLte}
                    placeholder={`${label} Akhir ...`}
                    formatType="numeric"
                    displayType="input"
                    value={filters[keyLte] || ""}
                    onChange={(event) =>
                      updateFilter(keyLte, event.target.value)
                    }
                    customInput={Input as React.ComponentType<unknown>}
                  />
                </Grid.Col>
              </Grid>
            );
          } else if (type === "currency") {
            return (
              <DefaultNumberInput
                key={key}
                placeholder={`Cari ${label} ...`}
                formatType="numeric"
                displayType="input"
                value={filters[key] || ""}
                onChange={(event) => {
                  const value = event.target.value || "";
                  updateFilter(key, value?.replaceAll(",", ""));
                }}
                customInput={Input as React.ComponentType<unknown>}
                thousandSeparator=","
              />
            );
          } else if (type === "number") {
            return (
              <DefaultNumberInput
                key={key}
                placeholder={`Cari ${label} ...`}
                formatType="numeric"
                displayType="input"
                value={filters[key] || ""}
                onChange={(event) => updateFilter(key, event.target.value)}
                customInput={Input as React.ComponentType<unknown>}
              />
            );
          } else if (type === "date_range") {
            return (
              <div key={key} className="grid grid-cols-2 gap-1">
                <DatePicker
                  key={`${key}_gte`}
                  isClearable={true}
                  placeholderText={`${label} Mulai ...`}
                  selected={
                    filters[`${key}_gte`]
                      ? new Date(filters[`${key}_gte`])
                      : null
                  }
                  dateFormat={"dd MMM yyyy"}
                  onChange={(date: Date) => {
                    const value = formatDate(date, "YYYY-MM-DD");
                    updateFilter(`${key}_gte`, value || "");
                  }}
                />
                <DatePicker
                  key={`${key}_lte`}
                  isClearable={true}
                  placeholderText={`${label} Akhir ...`}
                  selected={
                    filters[`${key}_lte`]
                      ? new Date(filters[`${key}_lte`])
                      : null
                  }
                  dateFormat={"dd MMMM yyyy"}
                  onChange={(date: Date) => {
                    const value = formatDate(date, "YYYY-MM-DD");
                    updateFilter(`${key}_lte`, value || "");
                  }}
                />
              </div>
            );
            // } else if (type === "date") {
            //   return (
            //     <DatePicker
            //       key={key}
            //       isClearable={true}
            //       placeholderText={`Cari ${label} ...`}
            //       selected={filters[key] ? new Date(filters[key]) : null}
            //       dateFormat={"dd MMMM yyyy"}
            //       onChange={(date: Date) => {
            //         const value = formatDate(date, "YYYY-MM-DD");
            //         updateFilter(key, value || "");
            //       }}
            //     />
            //   );
          } else if (type === "textarea") {
            return (
              <Textarea
                key={key}
                label={is_label ? label : undefined}
                placeholder={`Cari ${label} ...`}
                value={filters[key] || ""}
                onClear={() => updateFilter(key, "")}
                onChange={(event) => updateFilter(key, event.target.value)}
                clearable={true}
              />
            );
          } else {
            return (
              <Input
                key={key}
                label={is_label ? label : undefined}
                type={type}
                placeholder={`Cari ${label} ...`}
                value={filters[key] || ""}
                onClear={() => updateFilter(key, "")}
                onChange={(event) => updateFilter(key, event.target.value)}
                inputClassName="h-9"
                clearable={true}
                className={cn(className)}
              />
            );
          }
        }
      )}

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
    </>
  );
}
