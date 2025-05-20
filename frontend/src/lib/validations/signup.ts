import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "The name is required")
      .max(20, "The name must not exceed 20 characters"),
    email: z
      .string()
      .email("The email is invalid")
      .min(1, "The email is required"),
    password: z
      .string()
      .min(8, "The password must contain at least 8 characters")
      .max(20, "The password must not exceed 20 characters"),
    confirmPassword: z
      .string()
      .min(8, "The password must contain at least 8 characters")
      .max(20, "The password must not exceed 20 characters"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The two passwords are not identical",
        path: ["confirmPassword"],
      });
    }
  });

export type SignupFormData = z.infer<typeof signupSchema>;
