import { z } from "zod";
import { messages } from "@/config/messages";
import { validateEmail } from "@/validators/common-rules";

export const defaultFormSchema = z.object({
  uuid: z.string().optional(),
  name: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  password: z.string().optional(),
  phone: z.string().optional(),
  role_name: z.string().optional(),
  role_id: z.string().optional(),
  partner_name: z.string().optional(),
  partner_id: z.string().optional(),
});
export const defaultListSchema = defaultFormSchema.optional();

export type DefaultFormInput = z.infer<typeof defaultFormSchema>;
export type DefaultListInput = z.infer<typeof defaultListSchema>;
