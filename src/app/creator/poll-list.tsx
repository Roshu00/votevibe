"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { activatePoll } from "@/lib/actions/poll.action";
import { Option, Poll, PollStatus } from "@prisma/client";
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Edit,
  Eye,
  MoreHorizontal,
  PlayIcon,
  Plus,
  Search,
  Share2,
  Trash2,
  Users,
  Vote,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PollListProps {
  polls: (Poll & {
    options: Option[];
  })[];
}

export function PollList({ polls }: PollListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch = poll.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || poll.pollType === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeLabel = (type: string) => {
    return type.replace("_", " ");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <TabsContent value="polls" className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search polls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                  <SelectItem value="MULTIPLE_CHOICE">
                    Multiple Choice
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Polls Grid */}
      <div className="grid gap-6">
        {filteredPolls.map((poll) => (
          <Card key={poll.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {poll.title}
                    </h3>
                    <Badge>{poll.status}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{poll.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Vote className="h-4 w-4" />
                      {getTypeLabel(poll.pollType)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {poll.expectedVoters} expected voters
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created {formatDate(poll.createdAt)}
                    </div>
                    {poll.options.length > 0 && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {poll.options.length} options
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {poll.status === PollStatus.DRAFT && (
                      <Button size="sm" onClick={() => activatePoll(poll.id)}>
                        <PlayIcon />
                        Activate
                      </Button>
                    )}
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/polls/${poll.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>

                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/creator/polls/${poll.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/creator/polls/${poll.id}`}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Results
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPolls.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No polls found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || typeFilter !== "all"
                ? "Try adjusting your filters or search terms."
                : "Create your first poll to get started!"}
            </p>
            <Button asChild>
              <Link href="/creator/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Poll
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
}
