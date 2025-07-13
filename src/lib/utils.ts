/* eslint-disable @typescript-eslint/no-explicit-any */
import { PollStatus, PollType } from "@prisma/client";
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

export function getPollTypeDisplay(type: PollType): string {
  switch (type) {
    case PollType.SINGLE_CHOICE:
      return "Single Choice";
    case PollType.MULTI_CHOICE:
      return "Multiple Choice";
    case PollType.RANKING:
      return "Ranking";
    case PollType.APPROVAL:
      return "Approval";
    default:
      return type;
  }
}

export function getStatusColor(status: PollStatus) {
  switch (status) {
    case PollStatus.DRAFT:
      return "bg-gray-100 text-gray-800 border-gray-200";
    case PollStatus.SCHEDULED:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case PollStatus.ACTIVE:
      return "bg-green-100 text-green-800 border-green-200";
    case PollStatus.COMPLETED:
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
