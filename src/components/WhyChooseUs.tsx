import { CheckCircle2 } from "lucide-react";
import teamSuccess from "@/assets/team-success.jpg";

const benefits = [
  {
    title: "Industry Expertise",
    description: "Deep understanding of market dynamics and talent landscapes across multiple sectors",
  },
  {
    title: "Proven Track Record",
    description: "Hundreds of successful placements with a 98% client satisfaction rate",
  },
  {
    title: "Personalized Approach",
    description: "Tailored strategies that align with your unique company culture and goals",
  },
  {
    title: "Speed & Efficiency",
    description: "Streamlined processes that reduce time-to-hire without compromising quality",
  },
  {
    title: "Extensive Network",
    description: "Access to a vast pool of pre-vetted, qualified candidates across all levels",
  },
  {
    title: "End-to-End Support",
    description: "From initial consultation to post-placement follow-up, we're with you every step",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why Partner with HirePhaze?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're not just filling positions—we're building lasting partnerships and transforming 
              careers. Our comprehensive approach ensures success at every phase of the hiring journey.
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
