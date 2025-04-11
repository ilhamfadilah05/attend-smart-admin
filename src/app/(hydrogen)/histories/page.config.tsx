import { z } from "zod";
import { DefaultOption, FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import { formatDate } from "@utils/format-date";
import Image from "next/image";
import { Badge, Text } from "rizzui";

export const PageFormSchemaEdit = z.object({
  id_employee: z.string().optional(),
  name_employee: z.string().optional(),
  lat_long: z.string().optional(),
  lat_long_branch: z.string().optional(),
  radius_branch: z.number().optional(),
  date_attend: z.any().optional(),
  delayed: z.number().optional(),
  type: z.string().optional(),
  address: z.string().optional(),
  image: z.any().optional(),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;

export const pageRoute = {
  list: "/histories",
  create: "/histories/create",
  edit: (id: string) => `/histories/${id}/edit`,
  details: (id: string) => `/histories/${id}`,
  approval: (id: string) => `/histories/${id}/approval`,
};
export const title = "Histori Absensi";
export const apiPath = "/histories";

export const filterFields: FilterFieldDto[] = [
  {
    key: "name",
    label: "Nama",
    type: "text",
  },
  {
    key: "date_attend",
    label: "Tanggal",
    type: "date_range",
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
          onError={(e) => {
            e.currentTarget.src = "/no_image_available.jpg";
          }}
        />
      );
    },
  },

  {
    key: "employee_name",
    sortable: true,
    title: "Nama Karyawan",
    width: 200,
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
    key: "date_attend",
    sortable: true,
    title: "Tanggal Absensi",
    type: "date",
    width: 200,
  },
  {
    key: "type",
    sortable: true,
    title: "Tipe Absensi",
    type: "text",
    width: 150,
  },
  {
    key: "delayed",
    sortable: true,
    title: "Status Absensi",
    type: "text",
    width: 180,
    formatter(value, row) {
      return (
        <Badge
          color={row?.delayed === 0 ? "success" : "danger"}
          className="text-xs"
        >
          {row?.delayed === 0
            ? "Tepat Waktu"
            : `Terlambat ${row?.delayed} Menit`}
        </Badge>
      );
    },
  },
  {
    key: "department_name",
    sortable: true,
    title: "Jabatan",
    width: 200,
    type: "text",
    textClassName: "line-clamp-2",
  },
  {
    key: "branch_name",
    sortable: true,
    title: "Cabang",
    width: 200,
    type: "text",
    textClassName: "line-clamp-2",
  },
];
