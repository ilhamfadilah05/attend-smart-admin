import { z } from "zod";
import { FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { Badge, cn, Text } from "rizzui";
import { staticSubmissionStatus, staticUserStatus } from "@/data/static-data";

export const urlRoot = "submissions";
export const title = "Perizinan Karyawan";
export const apiPath = "submissions";

export const pageRoute = {
  list: `/${urlRoot}`,
  create: `/${urlRoot}/create`,
  edit: (id: string) => `/${urlRoot}/${id}/edit`,
  details: (id: string) => `/${urlRoot}/${id}`,
};

// form schema
export const PageFormSchemaEdit = z.object({
  id_employee: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  reason: z.string().optional(),
  start_date: z.string().min(1),
  end_date: z.string().min(1),
  image: z.any().optional(),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const filterFields: FilterFieldDto[] = [
  {
    key: "employee_name",
    label: "Nama Karyawan",
    type: "text",
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
    key: "type",
    sortable: false,
    width: 200,
    title: "Tipe Perizinan",
    type: "text",
  },
  {
    key: "status",
    sortable: false,
    width: 200,
    title: "Status",
    type: "text",
    formatter(value, row) {
      const submissionStatus = staticSubmissionStatus.find(
        (item) => item.id === value
      );

      return (
        <Badge
          color={submissionStatus?.color || "info"}
          className={cn(
            submissionStatus?.id === "BLOCK" && "bg-gray-700 text-white"
          )}
        >
          {submissionStatus?.name || value}
        </Badge>
      );
    },
  },
  {
    key: "start_date",
    sortable: false,
    title: "Tanggal Awal",
    type: "date",
    width: 200,
  },
  {
    key: "end_date",
    sortable: false,
    title: "Tanggal Akhir",
    type: "date",
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
