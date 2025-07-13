/*
  Warnings:

  - You are about to drop the column `pollAnswerId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Poll` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_pollAnswerId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "pollAnswerId";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "options";

-- CreateTable
CREATE TABLE "_OptionToPollAnswer" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_OptionToPollAnswer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OptionToPollAnswer_B_index" ON "_OptionToPollAnswer"("B");

-- AddForeignKey
ALTER TABLE "_OptionToPollAnswer" ADD CONSTRAINT "_OptionToPollAnswer_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToPollAnswer" ADD CONSTRAINT "_OptionToPollAnswer_B_fkey" FOREIGN KEY ("B") REFERENCES "PollAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
