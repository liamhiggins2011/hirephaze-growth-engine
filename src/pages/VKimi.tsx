import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import heroOffice from "@/assets/hero-office.jpg";

const VKimi = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
            <div className="flex items-center h-24 px-4">
              <Navbar />
            </div>
          </header>
          
          <main className="flex-1">
            {/* Hero */}
            <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="absolute inset-0 -z-10">
                <img src={heroOffice} alt="Professional office" className="w-full h-full object-cover opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
              </div>
              
              <div className="container mx-auto max-w-6xl text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Your Next Great Hire.
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Delivered in 28 Days or Less.
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                  We fill critical roles with pre-vetted candidates who stay. From executive search to RPO, we act as your talent partner—not just another vendor.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                    I'm Hiring Talent
                  </Button>
                  <Button size="lg" variant="outline">
                    I'm Job Hunting
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <span>150+ Companies Trust Us</span>
                  <span>|</span>
                  <span>500+ Successful Placements</span>
                  <span>|</span>
                  <span>98% Client Retention</span>
                  <span>|</span>
                  <span>&lt;2 Hour Response Time</span>
                </div>
              </div>
            </section>

            {/* How We Deliver */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How We Deliver</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-3">Retained Executive Search</h3>
                    <p className="text-primary font-semibold mb-3">
                      3-5 vetted leaders in 2 weeks. 92% offer acceptance rate.
                    </p>
                    <p className="text-muted-foreground">
                      Dedicated partnerships for critical leadership roles with a 1-year retention guarantee.
                    </p>
                  </div>
                  
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-3">Recruiting Process Outsourcing</h3>
                    <p className="text-primary font-semibold mb-3">
                      Cut cost-per-hire by 40% while scaling 2x faster.
                    </p>
                    <p className="text-muted-foreground">
                      We manage your entire hiring lifecycle—strategy to onboarding—as a seamless extension of your team.
                    </p>
                  </div>
                  
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-3">Direct Hire Recruiting</h3>
                    <p className="text-primary font-semibold mb-3">
                      Access 10,000+ passive candidates in our proprietary network.
                    </p>
                    <p className="text-muted-foreground">
                      Proactive sourcing for mid-to-senior roles across Healthcare IT, Manufacturing, and Finance.
                    </p>
                  </div>
                  
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-3">Career Advancement Services</h3>
                    <p className="text-primary font-semibold mb-3">
                      Coached candidates negotiate $15K+ higher on average.
                    </p>
                    <p className="text-muted-foreground">
                      Interview prep, offer negotiation, and leadership development for professionals ready to level up.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                  Why Companies Choose HirePhaze
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">We Guarantee Our Work</h4>
                      <p className="text-muted-foreground">Free replacement if your hire leaves within 12 months.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Industry-Specific Expertise</h4>
                      <p className="text-muted-foreground">85% of our placements are in Healthcare IT and Manufacturing. We speak your language.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">You Only Interview Finalists</h4>
                      <p className="text-muted-foreground">No resume flooding. We deliver 3-5 pre-qualified candidates who fit your culture and budget.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Real Partnership</h4>
                      <p className="text-muted-foreground">Your dedicated recruiter averages 7 years of tenure with us. You get their direct cell.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-8 rounded-lg border border-border">
                  <p className="text-lg italic text-muted-foreground mb-4">
                    "HirePhaze filled our VP of Engineering role in 19 days. He's still here three years later."
                  </p>
                  <p className="font-semibold">— Sarah Chen, CTO, MedTech Solutions</p>
                </div>
              </div>
            </section>

            {/* Ready to Start */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Ready to Start?</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-xl font-bold mb-3">For Hiring Managers</h3>
                    <p className="text-muted-foreground mb-6">
                      Book a free 15-minute strategy call. Get 3 actionable tips to fill your role faster.
                    </p>
                    <Button onClick={() => setIsBookingOpen(true)}>
                      Schedule Your Free Call
                    </Button>
                  </div>
                  
                  <div className="text-center p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-xl font-bold mb-3">For Professionals</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload your resume for a complimentary review and salary benchmark.
                    </p>
                    <Button variant="outline">
                      Get Free Resume Review
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-8 text-muted-foreground">
                  <p>832-493-3924 | contact@hirephaze.com | Houston, TX</p>
                </div>
              </div>
            </section>
          </main>
          
          <Footer />
          <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VKimi;