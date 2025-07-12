import { z } from "zod";

// Define poll types as a const array to avoid Prisma import issues
export const POLL_TYPES = [
  "SINGLE_CHOICE",
  "MULTI_CHOICE",
  "RANKING",
  "APPROVAL",
] as const;

// create poll validator
export const createPollValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pollType: z.enum(POLL_TYPES),
  expectedVoters: z.number().min(1, "Expected voters must be at least 1"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required"),
});

export type CreatePollInput = z.infer<typeof createPollValidator>;
