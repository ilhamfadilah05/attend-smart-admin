import { z } from "zod";
import { DefaultOption, FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { formatDate } from "@utils/format-date";
import Image from "next/image";
import { Badge, Text } from "rizzui";

export const PageFormSchemaEdit = z.object({
  id_user: z.string().min(1),
  id_department: z.string().min(1),
  id_branch: z.string().min(1),
  id_salary: z.string().optional(),
  name: z.string().min(1),
  gender: z.string().min(1),
  address: z.string().min(1),
  image: z.any().optional(),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const pageRoute = {
  list: "/employees",
  create: "/employees/create",
  edit: (id: string) => `/employees/${id}/edit`,
  details: (id: string) => `/employees/${id}`,
  approval: (id: string) => `/employees/${id}/approval`,
};
export const title = "Karyawan";
export const apiPath = "/employees";

export const filterFields: FilterFieldDto[] = [
  {
    key: "name",
    label: "Nama",
    type: "text",
  },
];

export const columnFormat: DefaultColumnFormat[] = [
  {
    key: "image",
    sortable: false,
    type: "text",
    width: 80,
    title: "",
    formatter(value, row) {
      return (
        <Image
          src={row?.image}
          alt={row?.image}
          width={80}
          height={20}
          sizes="(max-width: 80px) 100vw"
          className="rounded-sm object-cover"
          style={{
            borderRadius: "10%",
            border: "1px solid #fff",
          }}
        />
      );
    },
  },

  {
    key: "name",
    sortable: true,
    title: "Nama Karyawan",
    type: "text",
    textClassName: "line-clamp-2",
    formatter(value, row) {
      return (
        <div>
          <Text className="text-sm font-bold">{value}</Text>
          <Text className="text-gray-600 text-xs">{row?.email}</Text>
        </div>
      );
    },
  },
  {
    key: "phone",
    sortable: false,
    title: "No. Handphone",
    type: "text",
    textClassName: "line-clamp-2",
  },
  {
    key: "department_name",
    sortable: false,
    title: "Jabatan",
    type: "text",
    textClassName: "line-clamp-2",
  },

  {
    key: "branch_name",
    sortable: false,
    title: "Cabang",
    type: "text",
    textClassName: "line-clamp-2",
  },
  {
    key: "created_at",
    sortable: true,
    title: "Tanggal Dibuat",
    type: "date",
    textClassName: "line-clamp-2",
  },
];
