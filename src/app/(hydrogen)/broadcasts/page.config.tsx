import { z } from "zod";
import { FilterFieldDto } from "@/app/shared/default-page/dto";
import { DefaultColumnFormat } from "@/app/shared/default-page/default-list/default-column";
import Image from "next/image";
import { Badge, Text } from "rizzui";

export const urlRoot = "broadcasts";
export const title = "Broadcast";
export const apiPath = "broadcasts";

export const pageRoute = {
  list: `/${urlRoot}`,
  create: `/${urlRoot}/create`,
  edit: (id: string) => `/${urlRoot}/${id}/edit`,
  details: (id: string) => `/${urlRoot}/${id}`,
  send: (id: string) => `/${urlRoot}/${id}/send`,
};

// form schema
export const PageFormSchemaEdit = z.object({
  title: z.string().min(1, { message: "Must contain at least 1 character(s)" }),
  body: z.string().min(1, { message: "Must contain at least 1 character(s)" }),
  image: z.any().optional(),
});

// form schema send broadcast
export const PageFormSendBroadcastSchemaEdit = z.object({
  id_employees: z.array(z.string().optional()).optional(),
  id_branches: z.array(z.string().optional()).optional(),
});

export type PageFormInputEdit = z.infer<typeof PageFormSchemaEdit>;
export type PageFormInputSendBroadcast = z.infer<
  typeof PageFormSendBroadcastSchemaEdit
>;

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
    title: "#",
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
    key: "title",
    sortable: true,
    title: "Judul",
    type: "text",
    width: 250,
    textClassName: "line-clamp-2",
  },
  {
    key: "body",
    sortable: false,
    title: "Isi Broadcast",
    type: "text",
    width: 200,
    textClassName: "line-clamp-2",
  },
];

export interface CampaignNewsDto {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
