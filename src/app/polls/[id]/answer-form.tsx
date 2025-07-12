"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Poll } from "@prisma/client";
import {
  BarChart3,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Users,
  Vote,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "./header";

interface AnswerPollProps {
  poll: Poll;
}

function AnswerPollClient({ poll }: AnswerPollProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Mock results data - replace with actual data from your backend
  const mockResults = poll.options.map((option) => ({
    option,
    votes: Math.floor(Math.random() * 100) + 10,
    percentage: Math.floor(Math.random() * 40) + 10,
  }));

  const totalVotes = mockResults.reduce((sum, result) => sum + result.votes, 0);

  const handleOptionSelect = (option: string) => {
    if (poll.pollType === "SINGLE_CHOICE") {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleVote = async () => {
    if (selectedOptions.length === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setHasVoted(true);
    setShowResults(true);
    setIsSubmitting(false);
  };

  const getTypeLabel = (type: string) => {
    return type.replace("_", " ");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      <Container>
        <div className="max-w-4xl mx-auto py-8">
          {/* Poll Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {poll.title}
                    </h1>
                    <Badge variant="secondary">
                      {getTypeLabel(poll.pollType)}
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    {poll.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {poll.expectedVoters || 0} expected voters
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created {formatDate(poll.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Vote className="h-4 w-4" />
                      {poll.options.length} options
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Voting Section */}
          {!hasVoted && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Cast Your Vote
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {poll.pollType === "SINGLE_CHOICE" ? (
                  <div className="space-y-3">
                    {poll.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name="poll-option"
                          value={option}
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleOptionSelect(option)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`option-${index}`}
                          className="text-lg cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {poll.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`option-${index}`}
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleOptionSelect(option)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`option-${index}`}
                          className="text-lg cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {poll.pollType === "SINGLE_CHOICE"
                      ? "Select one option"
                      : "Select one or more options"}
                  </p>
                  <Button
                    onClick={handleVote}
                    disabled={selectedOptions.length === 0 || isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Submit Vote
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {showResults && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Poll Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Total votes: {totalVotes}</span>
                  <span>Your vote has been recorded!</span>
                </div>

                <div className="space-y-4">
                  {mockResults.map((result, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{result.option}</span>
                        <span className="text-sm text-gray-600">
                          {result.votes} votes ({result.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${result.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <p className="text-green-800">
                      Thank you for participating! Your vote has been
                      successfully recorded.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/creator")}>
              Back to Dashboard
            </Button>
            {hasVoted && (
              <Button
                variant="outline"
                onClick={() => setShowResults(!showResults)}
              >
                {showResults ? "Hide Results" : "Show Results"}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AnswerPollClient;
