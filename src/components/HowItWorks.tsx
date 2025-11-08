import { Search, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "We learn your roles, team, and urgency in a focused 15–30 minute call.",
  },
  {
    icon: Lightbulb,
    title: "Design",
    description: "We recommend a clear engagement model: hourly, project, or role-based.",
  },
  {
    icon: Target,
    title: "Deliver",
    description: "Targeted sourcing, real conversations, and shortlists you'd actually hire.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How HirePhaze Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent, founder-led process designed for modern teams
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="text-sm font-semibold text-primary mb-2">
                Step {index + 1}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center animate-fade-in">
          <Link to="/#contact">
            <Button size="lg">
              See if HirePhaze is a fit →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
