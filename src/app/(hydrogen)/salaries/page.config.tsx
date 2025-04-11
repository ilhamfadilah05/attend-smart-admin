import { z } from "zod";
import { DefaultOption, FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { defaultService } from "@/app/shared/default-page/default-service";

export const urlRoot = "salaries";
export const title = "Gaji Karyawan";
export const apiPath = "salaries";

export const pageRoute = {
  list: `/${urlRoot}`,
  create: `/${urlRoot}/create`,
  edit: (id: string) => `/${urlRoot}/${id}/edit`,
  details: (id: string) => `/${urlRoot}/${id}`,
};

// form schema
export const PageFormSchemaEdit = z.object({
  id_employee: z.string().min(1),
  base_salary: z.number().min(1),
  meal_allowance: z.number().min(1),
  health_allowance: z.number().min(1),
  bonus_amount: z.number().min(1),
  absence_deduction_amount: z.number().min(1),
  overtime_amount: z.number().min(1),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const filterFields: FilterFieldDto[] = [
  {
    key: "name",
    label: "Nama Karyawan",
    type: "text",
  },
  {
    key: "id_department",
    label: "Jabatan",
    type: "async-select",
    getDataOptions: async (param?: string) => {
      let result: DefaultOption[] = [];

      const dataOpts = await defaultService<any[]>({
        url: "/departments",
        params: { name: param },
      });
      if (dataOpts?.data && dataOpts?.meta?.status) {
        return dataOpts.data.map((v: any) => ({
          label: v.name,
          value: v.uuid,
        }));
      }

      return result;
    },
  },
];

export const columnFormat: DefaultColumnFormat[] = [
  {
    key: "employee_name",
    sortable: true,
    width: 200,
    title: "Nama Karyawan",
    type: "text",
  },
  {
    key: "department_name",
    sortable: false,
    width: 200,
    title: "Jabatan",
    type: "text",
  },
  {
    key: "base_salary",
    sortable: false,
    width: 200,
    title: "Gaji Pokok",
    type: "currency",
  },
  {
    key: "meal_allowance",
    sortable: false,
    width: 200,
    title: "Tunj. Makan",
    type: "currency",
  },
  {
    key: "health_allowance",
    sortable: false,
    width: 200,
    title: "Tunj. Kesehatan",
    type: "currency",
  },
  {
    key: "created_at",
    sortable: true,
    title: "Tanggal Dibuat",
    type: "date",
    width: 200,
  },
];
