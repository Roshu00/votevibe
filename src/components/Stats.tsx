import { Container } from "@/components/ui/container";

const stats = [
  { value: "1M+", label: "Votes Cast" },
  { value: "500+", label: "Organizations" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

export function Stats() {
  return (
    <section className="bg-blue-600 py-20">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
