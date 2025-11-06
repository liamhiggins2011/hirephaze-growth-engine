import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroOffice from "@/assets/hero-office.jpg";
import { useEffect, useRef } from "react";

const Hero = () => {
  const hiddenGcalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    script.onload = () => {
      if (hiddenGcalRef.current && (window as any).calendar) {
        (window as any).calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hbfkRcYh8BHLtTfyTx2vChxVmG5vZGWnY82OOPtQPuZcJWFwFC2Gu0ePEd1nDtf-HzNKObws6?gv=true',
          color: '#039BE5',
          label: 'Schedule Consultation',
          target: hiddenGcalRef.current,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handleScheduleClick = () => {
    const btn = hiddenGcalRef.current?.querySelector('button') as HTMLButtonElement | null;
    if (btn) btn.click();
    else window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hbfkRcYh8BHLtTfyTx2vChxVmG5vZGWnY82OOPtQPuZcJWFwFC2Gu0ePEd1nDtf-HzNKObws6?gv=true', '_blank');
  };
  return (
    <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroOffice} 
          alt="Modern professional office environment" 
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Revolutionizing Talent Acquisition</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect Hire,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Every Phaze of the Way
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From executive search to resume optimization, we deliver comprehensive staffing solutions 
            that transform your hiring process and accelerate your growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="group" onClick={handleScheduleClick}>
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Services
            </Button>
          </div>
          
          <div ref={hiddenGcalRef} className="sr-only" aria-hidden="true" />
          
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
