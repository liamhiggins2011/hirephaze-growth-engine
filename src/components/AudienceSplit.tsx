import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BookingModal from "./BookingModal";

const AudienceSplit = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Who We Partner With
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">For Employers</h3>
            
            <p className="text-muted-foreground mb-6">
              Need recruiting support?
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">On-demand recruiters you can turn on/off</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Fractional talent partner for 10–100+ hires</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Search + screening done for you</span>
              </li>
            </ul>
            
            <Button size="lg" className="w-full" onClick={() => setIsBookingOpen(true)}>
              Talk to HirePhaze
            </Button>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow" id="talent-network">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <User className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">For Candidates</h3>
            
            <p className="text-muted-foreground mb-6">
              Exploring your next role?
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Direct access to curated opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Honest feedback and guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Optional career support add-ons</span>
              </li>
            </ul>
            
            <Link to="/candidates" className="w-full block">
              <Button size="lg" variant="outline" className="w-full">
                Join Talent Network
              </Button>
            </Link>
          </Card>
        </div>
      </div>
      
      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
};

export default AudienceSplit;
