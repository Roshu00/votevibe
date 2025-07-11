import { Shield, Zap, Users, TrendingUp, Vote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: Shield,
    title: "Secure & Transparent",
    description:
      "Blockchain-powered security ensures your vote is safe and verifiable while maintaining complete anonymity.",
    color: "blue",
    badge: "Most Popular",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get real-time voting results and analytics as votes are cast, with no waiting time.",
    color: "green",
    badge: "Real-time",
  },
  {
    icon: Users,
    title: "Accessible to All",
    description:
      "Vote from anywhere, anytime. Our platform works on all devices and is designed for everyone.",
    color: "purple",
    badge: "Universal",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description:
      "Detailed analytics and insights help you understand voting patterns and trends.",
    color: "orange",
    badge: "Advanced",
  },
  {
    icon: Vote,
    title: "Multiple Vote Types",
    description:
      "Support for various voting methods including ranked choice, approval voting, and more.",
    color: "red",
    badge: "Flexible",
  },
  {
    icon: Shield,
    title: "Audit Trail",
    description:
      "Complete audit trail ensures transparency and builds trust in the voting process.",
    color: "indigo",
    badge: "Compliant",
  },
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  indigo: "bg-indigo-100 text-indigo-600",
};

export function Features() {
  return (
    <section id="features" className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose VoteVibe?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the next generation of voting technology with our
            innovative features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow relative"
              >
                {feature.badge && (
                  <Badge className="absolute top-4 right-4" variant="secondary">
                    {feature.badge}
                  </Badge>
                )}
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      colorClasses[feature.color as keyof typeof colorClasses]
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
