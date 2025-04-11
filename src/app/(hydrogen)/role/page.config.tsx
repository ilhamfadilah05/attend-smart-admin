import { z } from "zod";
import { FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { formatDate } from "@utils/format-date";
import Image from "next/image";

export const PageFormSchemaEdit = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const pageRoute = {
  list: "/role",
  create: "/role/create",
  edit: (id: string) => `/role/${id}/edit`,
  details: (id: string) => `/role/${id}`,
  approval: (id: string) => `/role/${id}/approval`,
};
export const title = "Hak Akses";
export const apiPath = "roles";

export const filterFields: FilterFieldDto[] = [
  {
    key: "name",
    label: "Nama",
    type: "text",
    ext: "like",
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
