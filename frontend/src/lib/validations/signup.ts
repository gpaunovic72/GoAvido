import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom est requis")
      .max(20, "Le nom ne pas dépasser 20 caractères"),
    email: z
      .string()
      .email("L'email est invalide")
      .min(1, "L'email est requis"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(20, "Le mot de passe ne pas dépasser 20 caractères"),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(20, "Le mot de passe ne pas dépasser 20 caractères"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les deux mots de passe ne sont pas identique",
        path: ["confirmPassword"],
      });
    }
  });

export type SignupFormData = z.infer<typeof signupSchema>;
