import { Card } from "@/components/ui/card";
import { Briefcase, Award, Users } from "lucide-react";

const FounderSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Led by Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Founded by a talent leader, not a sales rep
          </p>
        </div>
        
        <Card className="p-8 md:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2">Liam Higgins</h3>
              <p className="text-primary font-medium mb-4">Founder & Lead Talent Partner</p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With over 10 years of experience in high-growth recruiting across fintech, SaaS, and tech, 
                Liam has supported companies from early-stage startups to enterprise scale. Having worked 
                with Google and other high-scale tech environments, he brings hands-on expertise to every search. 
                HirePhaze is founder-led by design—every engagement is personally overseen, ensuring quality, 
                transparency, and real results.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">10+ Years</div>
                <div className="text-sm text-muted-foreground">In high-growth recruiting</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Proven Track Record</div>
                <div className="text-sm text-muted-foreground">Google & tech leaders</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Hands-On</div>
                <div className="text-sm text-muted-foreground">Every search overseen directly</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FounderSection;
