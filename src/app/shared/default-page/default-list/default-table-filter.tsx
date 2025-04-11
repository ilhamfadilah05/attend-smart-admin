/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { PiFunnel, PiXBold, PiPlusBold, PiDownloadBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { ActionIcon } from "@/components/ui/action-icon";
import { Title } from "@/components/ui/text";
import cn from "@utils/class-names";
import { useMedia } from "@/hooks/use-media";
import { IRoute } from "@/config/routes";
import Link from "next/link";
import { useRoleChecker } from "@/utils/role-checker";
import { Badge } from "rizzui";
import Breadcrumb from "@ui/breadcrumb";
import ExportButton from "../../export-button";
import { useModal } from "../../modal-views/use-modal";
import DefaultExportForm, { ExportProps } from "./default-export-form";
import { FilterFieldDto } from "../dto";
const Drawer = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.Drawer),
  { ssr: false }
);

function FilterDrawerView({
  isOpen,
  drawerTitle,
  setOpenDrawer,
  onSubmit,
  children,
  showResult,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  isOpen?: boolean;
  showResult: string;
}>) {
  return (
    <Drawer
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
      overlayClassName="dark:bg-opacity-20 backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
    >
      <div className="flex h-full flex-col p-5">
        <div className="-mx-5 mb-6 flex items-center justify-between border-b border-gray-200 px-5 pb-4">
          <Title as="h5">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={"Close Filter"}
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <PiXBold className="h-4 w-4" />
          </ActionIcon>
        </div>
        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => {
            onSubmit();
            setOpenDrawer(false);
          }}
          className="mt-5 h-11 w-full text-sm"
        >
          {showResult}
        </Button>
      </div>
    </Drawer>
  );
}

export type PageBreadcrumb = {
  name: string;
  href?: string;
};

export type TableFilterProps = {
  onSubmit: () => void;
  columns?: { [key: string]: any }[];
  checkedColumns?: string[];
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear?: () => void;
  setCheckedColumns?: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm?: string;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
  routes: IRoute;
  apiPath: string;
  title?: string;
  isFiltered?: boolean;
  breadcrumb?: PageBreadcrumb[];
  addButton?: React.ReactNode;
  getDataExport?: (dto?: Record<string, any>) => Promise<ExportProps>;
  exportFilterFields?: FilterFieldDto[];
};

export default function TableFilter({
  drawerTitle = "Table Filters",
  enableDrawerFilter = false,
  onSubmit,
  children,
  routes,
  apiPath,
  title,
  isFiltered = false,
  breadcrumb,
  addButton,
  getDataExport,
  exportFilterFields,
}: TableFilterProps) {
  const isMediumScreen = true;
  const [showFilters, setShowFilters] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { ability } = useRoleChecker();
  const { openModal, closeModal } = useModal();

  return (
    <div className="md:grid md:grid-cols-2 gap-6 mb-4">
      {breadcrumb && (
        <Breadcrumb
          separator=""
          separatorVariant="circle"
          className="flex-wrap col-span-1"
        >
          {breadcrumb.map((item) => (
            <Breadcrumb.Item
              key={item.name}
              {...(item?.href && { href: item?.href })}
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <div
        className={cn(
          breadcrumb ? "col-span-1" : "col-span-2",
          "table-filter flex flex-wrap items-center justify-end"
        )}
      >
        <div className="flex flex-wrap items-center gap-4">
          {children && (
            <>
              {isMediumScreen || enableDrawerFilter ? (
                <FilterDrawerView
                  isOpen={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  drawerTitle={drawerTitle}
                  onSubmit={onSubmit}
                  showResult={"Lihat Hasil"}
                >
                  {children}
                </FilterDrawerView>
              ) : (
                <>{showFilters ? children : null}</>
              )}
            </>
          )}
        </div>

        <div className="ms-4 flex flex-shrink-0 items-center">
          {children ? (
            <Button
              {...(isMediumScreen || enableDrawerFilter
                ? {
                    onClick: () => {
                      setOpenDrawer(() => !openDrawer);
                    },
                  }
                : { onClick: () => setShowFilters(() => !showFilters) })}
              variant={"outline"}
              className={cn(
                "relative me-2.5 mr-0 h-9 pe-3 ps-2.5",
                !(isMediumScreen || enableDrawerFilter) &&
                  showFilters &&
                  "border-dashed border-gray-700"
              )}
            >
              <PiFunnel
                className="me-1.5 h-[18px] w-[18px]"
                strokeWidth={1.7}
              />
              {isFiltered && (
                <Badge
                  renderAsDot
                  color="warning"
                  enableOutlineRing
                  className="absolute left-0.5 top-0.5"
                />
              )}
              {!(isMediumScreen || enableDrawerFilter) && showFilters
                ? "Sembunyikan"
                : "Pencarian"}
            </Button>
          ) : null}
        </div>

        {getDataExport && exportFilterFields && (
          <div className="ms-4 flex flex-shrink-0 items-center">
            <Button
              variant="flat"
              className="relative me-2.5 mr-0 h-9 pe-3 ps-2.5"
              onClick={() =>
                openModal({
                  view: (
                    <DefaultExportForm
                      filterFields={exportFilterFields}
                      onClose={closeModal}
                      submitHandler={getDataExport}
                      title={title}
                    />
                  ),
                })
              }
            >
              Export
            </Button>
            {/* <ExportButton
              className="relative me-2.5 mr-0 h-9 pe-3 ps-2.5"
              fileName={title || "Export"}
              getData={getDataExport}
            /> */}
          </div>
        )}

        <div className="ms-4 flex flex-shrink-0 items-center">
          {
            // ability.can("create", apiPath) &&
            addButton ? (
              addButton
            ) : (
              <Link href={routes.create} className="w-full @lg:w-auto">
                <Button className="relative me-2.5 mr-0 h-9 pe-3 ps-2.5">
                  <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                  {"Tambah "}
                  {title || "Data"}
                </Button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
}
