"use client";

import { Title, Text, Avatar, Button, Popover } from "rizzui";
import cn from "@utils/class-names";
import { routes } from "@/config/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApi } from "@/app/api/auth/auth.api";
import { getLocalStorage, KUSER } from "@/utils/localstorage";

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const user = getLocalStorage(KUSER);

  useEffect(() => {
    if (!user) AuthApi.removeSession();
  });

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            name={user?.email || ""}
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10", avatarClassName)}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu user={user} />
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
    name: "Profil Saya",
    href: routes.profile,
  },
  {
    name: "Ubah Password",
    href: routes.changePassword,
  },
  {
    name: "Log Aktifitas",
    href: "/log-activity/me",
  },
];

function DropdownMenu({ user = {} }: { user?: Record<string, any> }) {
  const logout = async () => {
    await AuthApi.logout();
  };

  return (
    <div className="text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar name={user?.email} />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {user?.name}
          </Title>
          <Text className="text-gray-600">{user.email}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item?.name}
            href={item?.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => logout()}
        >
          Keluar Akun
        </Button>
      </div>
    </div>
  );
}
