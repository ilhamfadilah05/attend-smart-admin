import { z } from "zod";
import { FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { formatDate } from "@utils/format-date";
import Image from "next/image";
import { Badge, cn, Text } from "rizzui";
import { staticUserStatus } from "@/data/static-data";

export const PageFormSchemaEdit = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const pageRoute = {
  list: "/user",
  create: "/user/create",
  edit: (id: string) => `/user/${id}/edit`,
  details: (id: string) => `/user/${id}`,
  approval: (id: string) => `/user/${id}/approval`,
};
export const title = "Halaman Pengguna";
export const apiPath = "users";

export const filterFields: FilterFieldDto[] = [
  {
    key: "name",
    label: "Nama",
    type: "text",
    ext: "like",
  },
  {
    key: "is_admin",
    label: "Tipe User",
    type: "async-select",
    getDataOptions: async (param?: string) => {
      return [
        {
          label: "Admin CMS",
          value: "true",
        },
        {
          label: "Karyawan",
          value: "false",
        },
      ];
    },
  },
  {
    key: "created_at",
    label: "Tanggal Dibuat",
    type: "date_range",
    required: true,
  },
];

export const columnFormat: DefaultColumnFormat[] = [
  {
    key: "name",
    sortable: true,
    title: "Nama",
    type: "text",
    width: 200,
    formatter(value, row) {
      return (
        <>
          <Text className="text-sm font-bold">{value}</Text>
          <Text className="text-sm">{row?.email}</Text>
        </>
      );
    },
  },

  {
    key: "role",
    sortable: true,
    title: "Nama Role",
    type: "text",
    width: 200,
    formatter(value, row) {
      return (
        <>
          <Text className="text-sm">{value?.name}</Text>
        </>
      );
    },
  },

  {
    key: "is_admin",
    sortable: true,
    title: "Tipe User",
    type: "text",
    width: 200,
    formatter(value, row) {
      return (
        <>
          <Text className="text-sm">{value ? "Admin CMS" : "Karyawan"}</Text>
        </>
      );
    },
  },

  {
    key: "status",
    sortable: true,
    title: "Status",
    type: "text",
    width: 200,
    formatter(value, row) {
      const userStatus = staticUserStatus.find((item) => item.id === value);

      return (
        <Badge
          color={userStatus?.color || "info"}
          className={cn(userStatus?.id === "BLOCK" && "bg-gray-700 text-white")}
        >
          {userStatus?.name || value}
        </Badge>
      );
    },
  },

  {
    key: "created_at",
    sortable: true,
    title: "Tanggal Dibuat",
    type: "date",
    width: 200,
  },
];

export const formatExport = (data: Record<string, any>[]) => {
  return data.map((v) => {
    return {
      "ID Program": v.committee_hid,
      Tipe: v.committee_type,
      Komite: v.title,
      "Deskripsi Singkat": v.short_description,
      "Tanggal Dibuat": formatDate(v.created_at, "DD MMMM YYYY HH:mm"),
    };
  });
};
