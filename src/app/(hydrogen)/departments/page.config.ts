import { z } from "zod";
import { FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";

export const urlRoot = "departments";
export const title = "Jabatan";
export const apiPath = "departments";

export const pageRoute = {
  list: `/${urlRoot}`,
  create: `/${urlRoot}/create`,
  edit: (id: string) => `/${urlRoot}/${id}/edit`,
  details: (id: string) => `/${urlRoot}/${id}`,
};

// form schema
export const PageFormSchemaEdit = z.object({
  name: z.string().min(1, { message: "Must contain at least 1 character(s)" }),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const filterFields: FilterFieldDto[] = [
  {
    key: "name",
    label: "Nama",
    type: "text",
  },
];

export const columnFormat: DefaultColumnFormat[] = [
  {
    key: "name",
    sortable: true,
    // width: 200,
    title: "Nama",
    type: "text",
  },
  {
    key: "created_at",
    sortable: true,
    title: "Tanggal Dibuat",
    type: "date",
    // width: 200,
  },
];

export interface CampaignNewsDto {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
