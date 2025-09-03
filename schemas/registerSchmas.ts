import z, { refine } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Nom invalide"),
    phoneNumber: z
      .string()
      .regex(
        /^\+?[1-9]\d{7,14}$/,
        "Le numéro doit être au format international (+225...)"
      ),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "Les mots de passe ne correspondent pas",
  });
