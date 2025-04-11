import { z } from "zod";
import { messages } from "@/config/messages";
import { validateEmail } from "@/validators/common-rules";

// form zod validation schem
export const userFormSchemaEdit = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  password: z.string().nullish(),
  phone: z.string().nullish(),
  is_admin: z.boolean().nullish(),
  role_name: z.string().nullish(),
  role_id: z.string().nullish(),
  partner_name: z.string().nullish(),
  partner_id: z.string().nullish(),
  nik: z.string().nullish(),
  start_date: z.string().nullish(),
  end_date: z.string().nullish(),
});

export type UserFormInputEdit = z.infer<typeof userFormSchemaEdit>;
