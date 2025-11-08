import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroOffice from "@/assets/hero-office.jpg";
import BookingModal from "./BookingModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroOffice} 
          alt="Recruiting consultant leading a discovery call with startup team in modern office" 
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-background/40 sm:bg-background/0" />
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Revolutionizing Talent Acquisition</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            On-Demand Recruiting for Startups & Growing Teams
          </h1>
          
          <h2 className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Flexible recruiting support designed for lean, high-growth teams. We provide on-demand recruiting, fractional recruiting services, and embedded talent solutions — no agency overhead, just results.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="group w-full sm:w-auto" onClick={() => setIsBookingOpen(true)}>
              Schedule a 15-Min Discovery Call
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/employers" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Submit a Role
              </Button>
            </Link>
          </div>
          
          <Link to="/candidates" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block mt-4">
            I'm a candidate → View opportunities
          </Link>
          
          <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Placements Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
