import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CTA() {
  return (
    <section className="py-20 text-center">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Voting Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of organizations already using VoteVibe to make their
            voting process more efficient and secure.
          </p>
          <Button variant="default" size="lg">
            Get Started Today
          </Button>
        </div>
      </Container>
    </section>
  );
}
