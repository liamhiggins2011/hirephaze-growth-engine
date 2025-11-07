import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import heroOffice from "@/assets/hero-office.jpg";

const VChat = () => {
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
                  Right Talent. Right Now.
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Every Phase Covered.
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                  HirePhaze partners with growth-focused companies to deliver vetted, high-impact talent through retained search, RPO, and targeted sourcing—so you hire faster, smarter, and with confidence.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Hiring Solutions
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-8">
                  Also supporting professionals with career coaching and resume optimization.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Successful Placements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">150+</div>
                    <div className="text-sm text-muted-foreground">Partner Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Support on Active Searches</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Who We Serve */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Who Are You?</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-4">For Employers</h3>
                    <p className="text-lg font-semibold text-primary mb-3">I'm Hiring Talent</p>
                    <p className="text-muted-foreground mb-6">
                      Build a pipeline of qualified, culture-aligned candidates for critical roles.
                    </p>
                    <Button variant="outline">View Employer Services</Button>
                  </div>
                  
                  <div className="p-8 bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-4">For Candidates</h3>
                    <p className="text-lg font-semibold text-primary mb-3">I'm Advancing My Career</p>
                    <p className="text-muted-foreground mb-6">
                      Level up your brand, your strategy, and your opportunities with expert guidance.
                    </p>
                    <Button variant="outline">View Candidate Services</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Employer Services */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
                  Hiring Solutions for High-Growth Teams
                </h2>
                <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                  Whether you're scaling rapidly, filling a key leadership role, or standardizing your talent function, HirePhaze becomes an extension of your team—plugging in where you need us most.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Retained Search</h3>
                    <p className="text-muted-foreground">
                      Partner-level support for VP, Director, and C-suite roles. We map your market, target top passive talent, manage outreach, interviews, and offers—staying engaged until the right leader is in the seat.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Recruitment Process Outsourcing (RPO)</h3>
                    <p className="text-muted-foreground">
                      Your embedded recruiting arm. We design and run your end-to-end hiring lifecycle: sourcing, screening, coordination, interviewing, reporting, and candidate experience—so your internal team can stay focused on growth.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Targeted Talent Search</h3>
                    <p className="text-muted-foreground">
                      Project-based searches for critical individual contributors and emerging leaders. Fast, curated shortlists of pre-vetted candidates aligned to your technical, cultural, and timeline needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                    Talk to Us About a Search
                  </Button>
                </div>
              </div>
            </section>

            {/* Why HirePhaze */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                  Why Companies Choose HirePhaze
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Specialized Expertise</h4>
                      <p className="text-muted-foreground">Deep understanding of talent markets in key verticals.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Speed Without Sacrifice</h4>
                      <p className="text-muted-foreground">Streamlined sourcing and screening to reduce time-to-hire while maintaining high standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Quality-First Vetting</h4>
                      <p className="text-muted-foreground">Every candidate is evaluated for skills, track record, and long-term fit—not just keyword matches.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Flexible Engagement Models</h4>
                      <p className="text-muted-foreground">Retained, RPO, and project-based solutions tailored to your growth stage and budget.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Human + Tech Advantage</h4>
                      <p className="text-muted-foreground">Modern sourcing tools powered by hands-on recruiters who actually build relationships.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Post-Placement Support</h4>
                      <p className="text-muted-foreground">Structured check-ins to ensure retention and performance beyond day one.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-8 rounded-lg border border-border">
                  <p className="text-lg italic text-muted-foreground mb-4">
                    "HirePhaze helped us fill three critical leadership roles in under 60 days. Their candidates weren't just qualified—they were the right people."
                  </p>
                  <p className="font-semibold">— VP, People & Culture, Growth-Stage Company</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Hire or Ready to Grow?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Tell us what you're building—or where you're headed—and we'll respond with a tailored plan.
                </p>
                
                <Button size="lg" onClick={() => setIsBookingOpen(true)} className="mb-8">
                  Book Your Free Consultation
                </Button>

                <div className="text-muted-foreground">
                  <p className="mb-2">Prefer direct contact?</p>
                  <p>Email: contact@hirephaze.com</p>
                  <p>Call/Text: 832-493-3924</p>
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

export default VChat;