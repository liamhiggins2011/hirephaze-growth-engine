import { Card } from "@/components/ui/card";
import { Search, Users, Target, MessageSquare, FileText } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Retained Search",
    description: "Dedicated executive search partnerships for critical leadership positions. We become an extension of your team, committed to finding the perfect fit.",
  },
  {
    icon: Users,
    title: "Recruiting Process Outsourcing",
    description: "Complete end-to-end recruitment solutions. From strategy to onboarding, we manage your entire hiring lifecycle with precision.",
  },
  {
    icon: Search,
    title: "Talent Search",
    description: "Proactive candidate sourcing across all levels. We tap into our extensive network to find both active and passive candidates.",
  },
  {
    icon: MessageSquare,
    title: "Career Coaching",
    description: "Personalized coaching to help professionals navigate their career journey, develop leadership skills, and achieve their goals.",
  },
  {
    icon: FileText,
    title: "Resume Optimization",
    description: "Professional resume and LinkedIn profile enhancement to maximize your visibility and attract the right opportunities.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Staffing Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a full spectrum of recruitment services tailored to your unique needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
