import { z } from "zod";
// Schema for signing users in

export const signInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// Schema for signing up users

export const signUpFormSchema = z
  .object({
    email: z.email(),
    name: z.string().min(3, "Name must be at least 3 characters."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters."),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "Passwords don't match.",
      path: ["confirmPassword"],
    }
  );
