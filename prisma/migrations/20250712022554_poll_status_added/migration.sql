-- CreateEnum
CREATE TYPE "PollStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "scheduleDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "PollStatus" NOT NULL DEFAULT 'DRAFT';
