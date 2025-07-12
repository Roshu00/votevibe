import { prisma } from "@/db/prisma";
import React from "react";
import AnswerPoll from "./answer-form";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const title = `Poll about ${id}`;
  return {
    title,
    openGraph: {
      images: [
        `https://yourdomain.com/api/og?title=${encodeURIComponent(title)}`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        `https://yourdomain.com/api/og?title=${encodeURIComponent(title)}`,
      ],
    },
  };
}

const PollPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const poll = await prisma.poll.findUnique({
    where: {
      id,
    },
  });

  if (!poll) {
    return notFound();
  }

  return <AnswerPoll poll={poll} />;
};

export default PollPage;
