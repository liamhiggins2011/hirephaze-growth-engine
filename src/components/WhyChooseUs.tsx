import { CheckCircle2 } from "lucide-react";
import teamSuccess from "@/assets/team-success.jpg";

const benefits = [
  {
    title: "On-Demand, Not Overhead",
    description: "Turn us up or down based on hiring volume. No bloated retainers or long-term commitments.",
  },
  {
    title: "Founder-Led Delivery",
    description: "You're working with someone who's shipped real searches, not an SDR reading a script.",
  },
  {
    title: "Transparent, Flexible Models",
    description: "Hourly, project-based, or embedded. Simple pricing written in plain English.",
  },
  {
    title: "Built for Modern Teams",
    description: "Remote, async, global talent—we design around how you actually work.",
  },
  {
    title: "No Agency Bloat",
    description: "Fast decisions, direct communication, real accountability. No bureaucracy.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why Teams Choose HirePhaze
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Modern recruiting without the corporate baggage. Flexible, transparent, and built for how you actually work.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title} 
                  className="flex gap-3 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={teamSuccess} 
                alt="Diverse team of professionals in modern office" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
