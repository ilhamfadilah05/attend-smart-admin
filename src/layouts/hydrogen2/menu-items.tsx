import { routes } from "@/config/routes";
import { LuFolderKanban } from "react-icons/lu";
import {
  PiHammerDuotone,
  PiUserPlusDuotone,
  PiCalendarDuotone,
  PiHandDepositDuotone,
  PiHandArrowDownDuotone,
  PiCodepenLogoDuotone,
  PiUsersFourDuotone,
  PiChartBarDuotone,
  PiUserDuotone,
  PiSquaresFourDuotone,
  PiFeatherDuotone,
  PiUserSquareDuotone,
} from "react-icons/pi";

export interface MenuDropdownItem {
  name: string;
  href: string;
  badge: string;
}

export interface IMenuItem {
  name: string;
  href: string;
  icon: JSX.Element;
  dropdownItems?: MenuDropdownItem[];
  badge?: string;
}

// Note: do not add href in the label object, it is rendering as label
export const menuItems: IMenuItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: <PiCalendarDuotone />,
    badge: "",
  },

  {
    name: "Penyaluran",
    href: "#",
    icon: <PiHandDepositDuotone />,
    dropdownItems: [
      {
        name: "Import Penyaluran Individu",
        href: "/distribution-import/individu",
        badge: "",
      },
      {
        name: "Import Penyaluran Komunitas",
        href: "/distribution-import/community",
        badge: "",
      },
      // {
      //   name: "Tambah Penyaluran",
      //   href: "/distribution/create",
      //   badge: "",
      // },
      {
        name: "Penyaluran",
        href: "/distribution",
        badge: "",
      },
    ],
  },

  {
    name: "Penerima Manfaat",
    href: "#",
    icon: <PiHandArrowDownDuotone />,
    dropdownItems: [
      // {
      //   name: "Registrasi Individu",
      //   href: "/beneficiaries/individu/create",
      //   badge: "",
      // },
      {
        name: "Penerima Manfaat Individu",
        href: "/beneficiaries/individu",
        badge: "",
      },
      // {
      //   name: "Registrasi Komunitas",
      //   href: "/beneficiaries/community/create",
      //   badge: "",
      // },
      {
        name: "Penerima Manfaat Komunitas",
        href: "/beneficiaries/community",
        badge: "",
      },
    ],
  },

  {
    name: "Program",
    href: "/program",
    icon: <PiFeatherDuotone />,
  },

  {
    name: "Detail Proyek",
    href: "#",
    icon: <PiCodepenLogoDuotone />,
    dropdownItems: [
      {
        name: "Proyek",
        href: "/project",
        badge: "",
      },
      {
        name: "Kanban Proyek",
        href: "/project/kanban-board",
        badge: "",
      },
      // {
      //   name: "Laporan Proyek",
      //   href: "/#",
      //   badge: "",
      // },
      {
        name: "Pengajuan Penyaluran Proyek Publik",
        href: "/proposal",
        badge: "",
      },
    ],
  },

  {
    name: "Entitas Pelaksanaan",
    href: routes.master_entity.list,
    icon: <PiSquaresFourDuotone />,
    // dropdownItems: [
    //   {
    //     name: "Cabang",
    //     href: routes.master_entity_cabang.list,
    //     badge: "",
    //   },
    //   {
    //     name: "Departemen",
    //     href: routes.master_entity_departemen.list,
    //     badge: "",
    //   },
    //   {
    //     name: "Mitra Individu",
    //     href: routes.master_entity_individu.list,
    //     badge: "",
    //   },
    //   {
    //     name: "Mitra Badan Hukum",
    //     href: routes.master_entity_legalentity.list,
    //     badge: "",
    //   },
    // ],
  },

  // {
  //   name: "Mitra Pelaksana",
  //   href: "#",
  //   icon: <PiUserDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Registrasi Mitra",
  //       href: routes.partner.create,
  //       badge: "",
  //     },
  //     {
  //       name: "Daftar Mitra",
  //       href: routes.partner.list,
  //       badge: "",
  //     },
  //   ],
  // },

  {
    name: "Riset dan Advokasi",
    href: "/research-advocacy",
    icon: <LuFolderKanban />,
  },

  // {
  //   name: "Statistik",
  //   href: "#",
  //   icon: <PiChartBarDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Program",
  //       href: "/#",
  //       badge: "",
  //     },
  //     {
  //       name: "Program Pengentasan Kemiskinan",
  //       href: "/#",
  //       badge: "",
  //     },
  //     {
  //       name: "Penerima Manfaat",
  //       href: "/#",
  //       badge: "",
  //     },
  //     {
  //       name: "Peta Sebaran Berdasarkan Lokasi Program",
  //       href: "/#",
  //       badge: "",
  //     },
  //     {
  //       name: "Peta Sebaran Berdasarkan Lokasi Penerima Manfaat",
  //       href: "/#",
  //       badge: "",
  //     },
  //   ],
  // },

  {
    name: "Komite",
    href: "/committee",
    icon: <PiUsersFourDuotone />,
  },

  {
    name: "Konfigurasi Komite",
    href: "/committee-approver-config",
    icon: <PiUserSquareDuotone />,
  },

  // {
  //   name: "Master Data",
  //   href: "#",
  //   icon: <PiHammerDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Struktur Organisasi",
  //       href: "/#",
  //       badge: "",
  //     },
  //     {
  //       name: "Kategori Program",
  //       href: routes.program_category.list,
  //       badge: "",
  //     },
  //     {
  //       name: "Jenis Identitas",
  //       href: routes.identity_type.list,
  //       badge: "",
  //     },
  //     {
  //       name: "Entitas",
  //       href: routes.master_entity.list,
  //       badge: "",
  //     },
  //   ],
  // },

  {
    name: "Akses Pengguna",
    href: "#",
    icon: <PiUserPlusDuotone />,
    dropdownItems: [
      {
        name: "Pengguna",
        href: routes.user.list,
        badge: "",
      },
      {
        name: "Role Akses",
        href: routes.role.list,
        badge: "",
      },
      {
        name: "Log Aktifitas",
        href: "/user-activity",
        badge: "",
      },
    ],
  },
];
