"use client";

import { Title, Text, Avatar, Button, Popover, ActionIcon } from "rizzui";
import cn from "@utils/class-names";
import { routes } from "@/config/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApi } from "@/app/api/auth/auth.api";
import { getLocalStorage, KUSER } from "@/utils/localstorage";
import CubeSolidIcon from "@components/icons/cube-solid";
import { BsPlusSquare } from "react-icons/bs";
import { PiPlusBold } from "react-icons/pi";

export default function ShortcutMenu() {
  const user = getLocalStorage(KUSER);
  useEffect(() => {
    if (!user) AuthApi.removeSession();
  });

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <ActionIcon
          aria-label="Shortcut"
          variant="text"
          className={
            "relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
          }
        >
          <PiPlusBold strokeWidth={1.8} className="h-[22px] w-auto" />
        </ActionIcon>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  {
    name: "Tambah Penyaluran",
    href: "/distribution/create",
  },
  {
    name: "Import Penyaluran Individu",
    href: "/distribution-import/individu/create",
  },
  {
    name: "Import Penyaluran Komunitas",
    href: "/distribution-import/community/create",
  },
  {
    name: "Registrasi Individu",
    href: "/beneficiaries/individu/create",
  },
  {
    name: "Registrasi Komunitas",
    href: "/beneficiaries/community/create",
  },
];

function DropdownMenu() {
  return (
    <div className="text-left rtl:text-right">
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
