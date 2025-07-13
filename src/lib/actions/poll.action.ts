"use server";

import { prisma } from "@/db/prisma";
import { z } from "zod";
import { createPollValidator } from "../validators/poll.validators";
import { getAuthenticatedUser, handleActionReturn } from "./common.action";
import { PollStatus, PollType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPoll = async (
  poll: z.infer<typeof createPollValidator>,
  id?: string
) =>
  handleActionReturn(async () => {
    const validatedPoll = createPollValidator.parse(poll);
    const user = await getAuthenticatedUser();
    const existingPoll = id
      ? await prisma.poll.findUnique({
          where: {
            id,
          },
        })
      : null;

    if (existingPoll && existingPoll.status !== PollStatus.DRAFT) {
      throw new Error("Poll is not draft and cannot be edited");
    }

    if (existingPoll) {
      const updatedPoll = await prisma.poll.update({
        where: { id: existingPoll.id },
        data: {
          title: validatedPoll.title,
          description: validatedPoll.description,
          pollType: validatedPoll.pollType,
          expectedVoters: validatedPoll.expectedVoters,
          options: {
            deleteMany: {},
            create: validatedPoll.options.map((option) => ({
              name: option,
            })),
          },
          user: {
            connect: { id: user.id },
          },
        },
      });
      return updatedPoll;
    }
    const newPoll = await prisma.poll.create({
      data: {
        title: validatedPoll.title,
        description: validatedPoll.description,
        pollType: validatedPoll.pollType,
        expectedVoters: validatedPoll.expectedVoters,
        options: {
          create: validatedPoll.options.map((option) => ({
            name: option,
          })),
        },
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
      include: {
        options: true,
      },
    });
    return polls;
  });

export const answerPoll = async (pollId: string, chosenOptionIds: string[]) =>
  handleActionReturn(async () => {
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
    });

    if (!poll) {
      throw new Error("Poll not found");
    }

    if (poll.pollType === PollType.SINGLE_CHOICE) {
      if (chosenOptionIds.length !== 1) {
        throw new Error("Invalid number of options selected");
      }
    }

    const answer = await prisma.pollAnswer.create({
      data: {
        options: {
          connect: chosenOptionIds.map((optionId) => ({ id: optionId })),
        },
        poll: {
          connect: { id: pollId },
        },
      },
    });

    return answer;
  });

export const activatePoll = async (pollId: string) =>
  handleActionReturn(async () => {
    const existingPoll = await prisma.poll.findUnique({
      where: { id: pollId },
    });
    if (!existingPoll) {
      throw new Error("Poll not found");
    }

    if (existingPoll.status !== PollStatus.DRAFT) {
      throw new Error("Poll is not draft and cannot be activated");
    }

    const poll = await prisma.poll.update({
      where: { id: pollId },
      data: { status: PollStatus.ACTIVE },
    });
    revalidatePath("/creator");
    return poll;
  });
