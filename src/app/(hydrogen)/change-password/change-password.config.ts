import { z } from "zod";
import { messages } from "@/config/messages";
import { validateConfirmPassword, validateNewPassword } from "@/validators/common-rules";

// form zod validation schema
export const resetPasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, { message: messages.passwordRequired }),
    newPassword: validateNewPassword,
    confirmedPassword: validateConfirmPassword,
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmedPassword"], // Correct path for the confirmedPassword field
  });

// generate form types from zod validation schema
export type ResetPasswordFormTypes = z.infer<typeof resetPasswordFormSchema>;
