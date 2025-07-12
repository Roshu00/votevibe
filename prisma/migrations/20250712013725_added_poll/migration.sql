-- CreateEnum
CREATE TYPE "PollType" AS ENUM ('SINGLE_CHOICE', 'MULTI_CHOICE', 'RANKING', 'APPROVAL');

-- CreateTable
CREATE TABLE "Poll" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "userId" UUID NOT NULL,
    "pollType" "PollType" NOT NULL,
    "expectedVoters" INTEGER,
    "options" TEXT[],

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pollId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "pollAnswerId" UUID,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollAnswer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pollId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "chosenOptionIds" TEXT[],

    CONSTRAINT "PollAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollAnswerId_fkey" FOREIGN KEY ("pollAnswerId") REFERENCES "PollAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswer" ADD CONSTRAINT "PollAnswer_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
