import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Helmet } from "react-helmet";
import { ArrowRight, Briefcase, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

const About = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  return (
    <SidebarProvider>
      <Helmet>
        <title>About HirePhaze – Modern Recruiting & Career Partners</title>
        <meta name="description" content="Learn about HirePhaze's mission to make hiring and career moves faster, clearer, and more human." />
        <meta name="keywords" content="startup recruiter, tech recruiting, fractional recruiter, on-demand recruiting, Liam Higgins" />
        <link rel="canonical" href="https://hirephaze.com/about" />
      </Helmet>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
            <div className="flex items-center h-24 px-4">
              <Navbar />
            </div>
          </header>
          
          <main className="flex-1">
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16 animate-fade-in">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                    A Modern Recruiting Partner, Built by a Recruiter
                  </h1>
                  
                  <div className="prose prose-lg mx-auto text-muted-foreground">
                    <p className="text-lg leading-relaxed mb-6">
                      HirePhaze was founded by <strong>Liam Higgins</strong>, a recruiting leader with over 10 years of experience helping startups, tech companies, and high-growth SaaS organizations build exceptional teams. Having worked at companies like Google and led talent acquisition for fast-scaling fintech and technology startups, Liam understands the unique challenges of hiring in dynamic environments.
                    </p>
                    
                    <p className="text-lg leading-relaxed mb-6">
                      After years of navigating the traditional recruiting agency world, Liam saw a gap: companies needed flexible, transparent, and founder-led recruiting support—not rigid contracts and sales-driven processes. HirePhaze was built to fill that gap, offering on-demand recruiting, fractional recruiter partnerships, and embedded talent solutions tailored to modern teams.
                    </p>
                    
                    <p className="text-lg leading-relaxed mb-8">
                      Whether you're a startup recruiting partner looking to scale your team or a candidate seeking honest career guidance, HirePhaze combines deep tech recruiting expertise with a human-first approach. We're not just another agency—we're your partner in building better teams and careers.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">10+ Years</h3>
                    <p className="text-muted-foreground">Tech & startup recruiting experience</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">500+ Hires</h3>
                    <p className="text-muted-foreground">Across fintech, SaaS & tech</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Founder-Led</h3>
                    <p className="text-muted-foreground">Direct access, no middlemen</p>
                  </Card>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Ready to work together?
                  </h2>
                  <Button size="lg" onClick={() => setIsBookingOpen(true)} className="group">
                    Book a Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </section>
          </main>
          
          <Footer />
        </div>
      </div>
      
      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </SidebarProvider>
  );
};

export default About;
