/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatErrors(error: any) {
  if (error.name === "ZodError") {
    // Handle zod error
    console.log(error.issues, "ERROR ZOD");
    const fieldErrors = Object.keys(error.issues).map(
      (field) => error.issues[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target ? error.meta?.target[0] : "Field";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
