import React from "react";
import { CreatePollForm } from "../../create-poll-form";
import { prisma } from "@/db/prisma";

const EditPollPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const poll = await prisma.poll.findUnique({
    where: {
      id,
    },
    include: {
      Option: true,
    },
  });
  if (!poll) {
    return <div>Poll not found</div>;
  }
  return <CreatePollForm defaultValues={poll} />;
};

export default EditPollPage;
