"use server";

import { prisma } from "@/db/prisma";
import { z } from "zod";
import { createPollValidator } from "../validators/poll.validators";
import { getAuthenticatedUser, handleActionReturn } from "./common.action";

export const createPoll = async (poll: z.infer<typeof createPollValidator>) =>
  handleActionReturn(async () => {
    const validatedPoll = createPollValidator.parse(poll);
    const user = await getAuthenticatedUser();
    const newPoll = await prisma.poll.create({
      data: {
        title: validatedPoll.title,
        description: validatedPoll.description,
        pollType: validatedPoll.pollType,
        expectedVoters: validatedPoll.expectedVoters,
        options: validatedPoll.options,
        user: {
          connect: { id: user.id },
        },
      },
    });
    return newPoll;
  });

export const getUserPolls = async () =>
  handleActionReturn(async () => {
    const user = await getAuthenticatedUser();
    const polls = await prisma.poll.findMany({
      where: {
        userId: user.id,
      },
    });
    return polls;
  });
