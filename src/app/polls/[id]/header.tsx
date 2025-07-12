import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Copy, Share2, Vote } from "lucide-react";
import React from "react";

export const Header = () => {
  const copyPollLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };
  return (
    <header className="py-6 border-b bg-white/80 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">VoteVibe</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={copyPollLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
