"use client";

import Link from "next/link";
import cn from "@utils/class-names";
import SimpleBar from "@ui/simplebar";
import Logo from "@components/logo";
import { SidebarMenu } from "./sidebar-menu";
import { getRoles } from "@/utils/role-checker";
import { IMenuItem, MenuDropdownItem, menuItems } from "./menu-items";
import { useEffect, useState } from "react";

export default function Sidebar({ className }: { className?: string }) {
  const [listMenu, setlistMenu] = useState<IMenuItem[]>([]);

  useEffect(() => {
    fillMenu();
  }, []);

  const fillMenu = () => {
    const roles = getRoles();

    let tempListMenu: IMenuItem[] = [];
    const isSuperAdmin = roles.find((r) => r.subject === "all" && r.action === "manage");
    if (isSuperAdmin) return setlistMenu(menuItems);

    menuItems.forEach((item) => {
      const role = roles?.find((r) => `/${r.subject}` === item.href && r.action === "read");
      if (item.href && !["/", "#"].includes(item.href) && !role) {
        return;
      } else if (item.dropdownItems && item.dropdownItems.length > 0) {
        let tempDropdown: MenuDropdownItem[] = [];
        item.dropdownItems.forEach((ddItem) => {
          const ddRole = roles?.find((r) => `/${r.subject}` === ddItem.href && r.action === "read");
          // console.log(ddRole, ddItem.href);
          if (!ddRole) return;
          tempDropdown.push(ddItem);
        });
        item.dropdownItems = tempDropdown;
      }
      if (["#"].includes(item.href) && item.dropdownItems && item.dropdownItems?.length <= 0) {
        return;
      }
      tempListMenu.push(item);
    });
    setlistMenu(tempListMenu);
  };

  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link href={"/"} aria-label="Site Logo" className="text-gray-800 hover:text-gray-900">
          <Logo className="w-24" /> {/* Untuk DD */}
          {/* <Logo className="w-20" /> */}
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        {listMenu?.length > 0 && <SidebarMenu menuItems={listMenu} />}
      </SimpleBar>
    </aside>
  );
}
