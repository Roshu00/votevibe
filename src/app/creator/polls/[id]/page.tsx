import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  BarChart3,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { cn, getPollTypeDisplay, getStatusColor } from "@/lib/utils";

// Helper function to format dates
function formatDate(date: Date | null | undefined): string {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const PollDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      answers: {
        include: {
          options: true,
          _count: {
            select: {
              options: true,
            },
          },
        },
      },
      options: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!poll) {
    return notFound();
  }
  const totalVotes = poll.answers.length;
  const totalAnswers = poll.answers.reduce((acc, curr) => {
    acc = acc + curr._count.options;
    return acc;
  }, 0);
  const totalOptions = poll.options.length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{poll.title}</h1>
          <p className="text-gray-600 mt-2">Created by {poll.user.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Results
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Poll Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Poll Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Votes</p>
                  <p className="text-xl font-semibold">{totalVotes}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Options</p>
                  <p className="text-xl font-semibold">{totalOptions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="text-sm font-medium">
                    {formatDate(poll.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-sm font-medium">
                    {formatDate(poll.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Poll Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Poll Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <Badge className={getStatusColor(poll.status)}>
                    {poll.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Poll Type
                </label>
                <p className="mt-1 text-gray-900">
                  {getPollTypeDisplay(poll.pollType)}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="mt-1 text-gray-900">{poll.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <p className="mt-1 text-gray-900">
                  {formatDate(poll.startDate)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <p className="mt-1 text-gray-900">{formatDate(poll.endDate)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <p className="mt-1 text-gray-900">{formatDate(poll.dueDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Schedule Date
                </label>
                <p className="mt-1 text-gray-900">
                  {formatDate(poll.scheduleDate)}
                </p>
              </div>
            </div>

            {poll.expectedVoters && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Expected Voters
                </label>
                <p className="mt-1 text-gray-900">{poll.expectedVoters}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Poll Options Card */}
        <Card>
          <CardHeader>
            <CardTitle>Poll Options</CardTitle>
            <CardDescription>
              {poll.options.length} option{poll.options.length !== 1 ? "s" : ""}{" "}
              available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {poll.options.map((option, index) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-3 border rounded-lg relative"
                >
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-full bg-blue-300 rounded-lg z-1"
                    )}
                    style={{
                      width: `${
                        (poll.answers.filter((answer) =>
                          answer.options.some((o) => o.id === option.id)
                        ).length /
                          totalAnswers) *
                        100
                      }%`,
                    }}
                  />
                  <div className="flex items-center gap-3 z-20">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="font-medium">{option.name}</span>
                  </div>
                  <Badge variant="secondary" className="z-20">
                    {
                      poll.answers.filter((answer) =>
                        answer.options.some((o) => o.id === option.id)
                      ).length
                    }
                    votes
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Votes Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Votes</CardTitle>
            <CardDescription>
              Latest {Math.min(poll.answers.length, 5)} votes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {poll.answers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No votes yet</p>
            ) : (
              <div className="space-y-3">
                {poll.answers.map((answer) => (
                  <div key={answer.id} className=" p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Voted on {formatDate(answer.createdAt)}
                        </p>
                        <p className="text-sm font-medium">
                          Selected: {answer.options.length} option
                          {answer.options.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {formatDate(answer.createdAt).split(",")[0]}
                      </Badge>
                    </div>
                    {answer.options.map((option) => (
                      <div key={option.id}>
                        <p>{option.name}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PollDetails;
