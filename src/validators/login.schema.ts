import { z } from "zod";

// form zod validation schema
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Kolom email wajib diisi" }).email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Kolom password wajib diisi" }),
  rememberMe: z.boolean().optional(),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
