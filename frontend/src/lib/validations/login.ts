import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("The email is invalid")
    .min(1, "The email is required"),
  password: z
    .string()
    .min(8, "The password must contain at least 8 characters")
    .max(40, "The password must not contain more than 40 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
