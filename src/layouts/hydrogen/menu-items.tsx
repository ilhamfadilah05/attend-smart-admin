import {
  PiUserGearDuotone,
  PiLock,
  PiUser,
  PiRocketLaunch,
  PiUsersDuotone,
  PiWallet,
  PiNote,
  PiNetwork,
  PiBroadcastDuotone,
} from "react-icons/pi";

export const menuItems = [
  {
    name: "Home",
  },
  {
    name: "Beranda",
    href: "/",
    icon: <PiRocketLaunch />,
  },

  {
    name: "Histori",
  },

  {
    name: "Histori Absensi",
    href: "/histories",
    icon: <PiNote />,
  },

  {
    name: "Karyawan",
  },
  {
    name: "Karyawan",
    href: "/employees",
    icon: <PiUsersDuotone />,
  },
  {
    name: "Penggajian",
    href: "/salaries",
    icon: <PiWallet />,
  },
  {
    name: "Perizinan",
    href: "/submissions",
    icon: <PiNote />,
  },

  {
    name: "Cabang",
  },

  {
    name: "Cabang",
    href: "/branches",
    icon: <PiNetwork />,
  },

  {
    name: "Jabatan",
    href: "/departments",
    icon: <PiUserGearDuotone />,
  },

  {
    name: "Notifikasi",
  },

  {
    name: "Broadcast",
    href: "/broadcasts",
    icon: <PiBroadcastDuotone />,
  },

  {
    name: "Master Data",
  },
  {
    name: "Role",
    href: "/role",
    icon: <PiLock />,
  },
  {
    name: "User",
    href: "/user",
    icon: <PiUser />,
  },
];
