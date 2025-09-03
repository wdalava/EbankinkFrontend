import z from "zod";

export const LoginSchema = z.object({
  phone: z.string().min(10, "Numéro invalide !"),
  password: z.string().min(8, "Mot de passe trop court !"),
});
