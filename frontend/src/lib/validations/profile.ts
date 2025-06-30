import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .max(20, "The name must not exceed 20 characters")
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  email: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      "The email is invalid"
    )
    .optional(),
  password: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine(
      (val) => !val || (val.length >= 8 && val.length <= 20),
      "The password must contain between 8 and 20 characters"
    )
    .optional(),
  confirmPassword: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine(
      (val) => !val || (val.length >= 8 && val.length <= 20),
      "The password must contain between 8 and 20 characters"
    )
    .optional(),
  pictureUrl: z
    .union([
      z
        .any()
        .transform((value) => {
          if (value instanceof FileList) return value[0];
          return value;
        })
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
          "The file must be an image"
        )
        .refine(
          (file) => file?.size <= 1024 * 1024 * 5,
          "The file must be less than 5MB"
        ),
      z.string().url("The URL is invalid"),
    ])
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
