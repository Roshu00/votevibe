import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserPolls } from "@/lib/actions/poll.action";
import {
  BarChart3,
  Clock,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react";
import Link from "next/link";
import { PollList } from "./poll-list";

const mockStats = {
  totalPolls: 12,
  activePolls: 3,
  totalParticipants: 1247,
  averageParticipation: 78,
};

export default async function CreatorDashboard() {
  const polls = await getUserPolls();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="py-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">VoteVibe</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                Creator Dashboard
              </Badge>
              <Button asChild>
                <Link href="/creator/polls/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Poll
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Creator! 👋
            </h1>
            <p className="text-gray-600">
              Manage your polls, track engagement, and create new voting
              sessions.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Polls
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.totalPolls}
                    </p>
                  </div>
                  <Vote className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Polls
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockStats.activePolls}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Participants
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {mockStats.totalParticipants}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg. Participation
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {mockStats.averageParticipation}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="polls" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="polls">My Polls</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Polls Grid */}
            <PollList polls={polls.data || []} />

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Poll Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Analytics Coming Soon
                    </h3>
                    <p className="text-gray-600">
                      Detailed analytics and insights will be available here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Settings Coming Soon
                    </h3>
                    <p className="text-gray-600">
                      Customize your dashboard preferences and notifications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
