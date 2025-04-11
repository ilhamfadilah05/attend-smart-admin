import { z } from "zod";
import { FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { Text } from "rizzui";

export const urlRoot = "branches";
export const title = "Cabang";
export const apiPath = "branches";

export const pageRoute = {
  list: `/${urlRoot}`,
  create: `/${urlRoot}/create`,
  edit: (id: string) => `/${urlRoot}/${id}/edit`,
  details: (id: string) => `/${urlRoot}/${id}`,
};

// form schema
export const PageFormSchemaEdit = z.object({
  name: z.string().min(1),
  radius: z.number().min(1),
  tolerance: z.number().min(1),
  lat_long: z.string().min(1),
  work_start_time: z.string().optional(),
  work_end_time: z.string().optional(),
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
    key: "work_start_time",
    sortable: false,
    // width: 200,
    title: "Jam Masuk",
    type: "text",
  },
  {
    key: "work_end_time",
    sortable: false,
    // width: 200,
    title: "Jam Pulang",
    type: "text",
  },
  {
    key: "is_default",
    sortable: false,
    // width: 200,
    title: "Tipe",
    type: "text",
    formatter(value, row) {
      return <Text className="">{value ? "Pusat" : "Cabang"}</Text>;
    },
  },
  {
    key: "created_at",
    sortable: true,
    title: "Tanggal Dibuat",
    type: "date",
    // width: 200,
  },
];
