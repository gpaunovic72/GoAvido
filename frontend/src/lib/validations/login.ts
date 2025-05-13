import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("L'email est invalide").min(1, "L'email est requis"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(40, "Le mot de passe ne peut pas contenir plus de 40 caractères"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
