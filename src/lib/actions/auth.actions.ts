"use server";
import { hashSync } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "../auth";
import { formatErrors } from "../utils";
import {
  signInFormSchema,
  signUpFormSchema,
} from "../validators/auth.validators";
import { prisma } from "@/db/prisma";

// Sign in user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log(user, "USER ACTION");
    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error, "ERROR ACTION");
    return { success: false, message: "Invalid credentials." };
  }
}

// Sign out function
export async function signOutUser() {
  await signOut();
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    console.log(user);
    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);
    console.log(prisma, "PRISMA");
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", { email: user.email, password: plainPassword });

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error, "ERROR ACTION");
    return { success: false, message: formatErrors(error) };
  }
}
