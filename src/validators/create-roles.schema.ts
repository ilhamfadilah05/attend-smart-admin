import { z } from "zod";
import { messages } from "@/config/messages";

// form zod validation schema
export const roleFormSchema = z.object({
  name: z.string().min(1, { message: messages.roleNameIsRequired }),
  roleList: z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type RoleFormInput = z.infer<typeof roleFormSchema>;
