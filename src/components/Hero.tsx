import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export function Hero() {
  return (
    <section className="py-20 text-center">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Make Every Vote
            <span className="text-blue-600 block">Count</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the future of democratic decision-making. VoteVibe makes voting
            accessible, secure, and engaging for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/creator">
              <Button
                variant="default"
                size="lg"
                className="flex items-center justify-center"
              >
                Start Voting Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
