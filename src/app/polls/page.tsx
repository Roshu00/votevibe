"use server";
import { prisma } from "@/db/prisma";
import React from "react";

const PoolsPage = async () => {
  const polls = await prisma.poll.findMany();
  return (
    <div>
      <h1>Pools</h1>
      <div>
        {polls.map((poll) => (
          <div key={poll.id}>
            <h2>{poll.title}</h2>
            <p>{poll.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoolsPage;
