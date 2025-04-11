import { z } from "zod";
import { messages } from "@/config/messages";
import { validateNewPassword, validateConfirmPassword } from "./common-rules";

// form zod validation schema
export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: messages.passwordRequired })
      .min(6, { message: messages.passwordLengthMin }),
    newPassword: validateNewPassword,
    confirmedPassword: validateConfirmPassword,
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmedPassword"], // Correct path for the confirmedPassword field
  });

// generate form types from zod validation schema
export type PasswordFormTypes = z.infer<typeof passwordFormSchema>;
