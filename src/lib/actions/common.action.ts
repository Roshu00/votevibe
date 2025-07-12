import { auth } from "../auth";
import { formatErrors } from "../utils";

export const getAuthenticatedUser = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
};

// handle action return

export const handleActionReturn = async <T>(
  func: () => Promise<T>,
  message?: string
) => {
  try {
    const data = await func();
    return { success: true, message: message || "Action successful", data };
  } catch (error) {
    return { success: false, message: formatErrors(error), data: null };
  }
};
