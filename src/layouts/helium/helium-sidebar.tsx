"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Title, Collapse } from "rizzui";
import cn from "@utils/class-names";
import { PiCaretDownBold } from "react-icons/pi";
import SimpleBar from "@/components/ui/simplebar";
import { menuItems } from "@/layouts/helium/helium-menu-items";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import StatusBadge from "@components/get-status-badge";
import { useColorPresetName, useColorPresets } from "@/hooks/use-theme-color";

export default function HeliumSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[284px] xl:p-5 2xl:w-[308px] dark:bg-gray-100/50",
        className
      )}
    >
      <div className="h-full bg-gray-800 p-1.5 pl-0  pr-1.5 xl:rounded-2xl dark:bg-gray-100/70">
        <div className="sticky top-0 z-40 flex justify-center px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
          <Link href={"/"} aria-label="Site Logo">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              width={80}
              height={85}
              priority
            />
          </Link>
        </div>

        <SimpleBar className="h-[calc(100%-80px)]">
          <div className="mt-4 pb-3 3xl:mt-6">
            {menuItems.map((item, index) => {
              const isActive = pathname === (item?.href as string);
              const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
                (dropdownItem) => dropdownItem.href === pathname
              );
              const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

              return (
                <Fragment key={item.name + "-" + index}>
                  {item?.href ? (
                    <>
                      {item?.dropdownItems ? (
                        <Collapse
                          defaultOpen={isDropdownOpen}
                          header={({ open, toggle }) => (
                            <div
                              onClick={toggle}
                              className={cn(
                                "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                                isDropdownOpen
                                  ? "before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white 2xl:before:-start-5 dark:text-primary dark:before:bg-primary"
                                  : "text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700"
                              )}
                            >
                              <span className="flex items-center">
                                {item?.icon && (
                                  <span
                                    className={cn(
                                      "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                      isDropdownOpen
                                        ? "text-white dark:text-primary"
                                        : "text-gray-300/70 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-500"
                                    )}
                                  >
                                    {item?.icon}
                                  </span>
                                )}
                                {item.name}
                              </span>

                              <PiCaretDownBold
                                strokeWidth={3}
                                className={cn(
                                  "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                  open && "rotate-0 rtl:rotate-0"
                                )}
                              />
                            </div>
                          )}
                        >
                          {item?.dropdownItems?.map((dropdownItem, index) => {
                            const isChildActive =
                              pathname === (dropdownItem?.href as string);

                            return (
                              <Link
                                href={dropdownItem?.href}
                                key={dropdownItem?.name + index}
                                className={cn(
                                  "group mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-2.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 2xl:px-3.5",
                                  isChildActive
                                    ? "text-gray-200 dark:text-gray-700"
                                    : "text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500"
                                )}
                              >
                                <div className="flex items-center truncate">
                                  <span
                                    className={cn(
                                      "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                      isChildActive
                                        ? "bg-primary ring-[1px] ring-primary"
                                        : "opacity-40 group-hover:bg-gray-700"
                                    )}
                                  />{" "}
                                  <span className="truncate">
                                    {dropdownItem?.name}
                                  </span>
                                </div>
                                {dropdownItem?.badge?.length ? (
                                  <StatusBadge status={dropdownItem?.badge} />
                                ) : null}
                              </Link>
                            );
                          })}
                        </Collapse>
                      ) : (
                        <Link
                          href={item?.href}
                          className={cn(
                            "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                            isActive
                              ? "before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white 2xl:before:-start-5 dark:text-gray-900"
                              : "text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-700"
                          )}
                        >
                          <div className="flex items-center truncate">
                            {item?.icon && (
                              <span
                                className={cn(
                                  "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                  isActive
                                    ? "text-white dark:text-gray-900"
                                    : "text-gray-300/70 group-hover:text-gray-500 dark:text-gray-500 "
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            <span className="truncate">{item.name}</span>
                          </div>
                          {item?.badge?.length ? (
                            <StatusBadge status={item?.badge} />
                          ) : null}
                        </Link>
                      )}
                    </>
                  ) : (
                    <Title
                      as="h6"
                      className={cn(
                        "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8 dark:text-gray-500",
                        index !== 0 && "mt-6 3xl:mt-7"
                      )}
                    >
                      {item.name}
                    </Title>
                  )}
                </Fragment>
              );
            })}
          </div>
        </SimpleBar>
      </div>
    </aside>
  );
}
