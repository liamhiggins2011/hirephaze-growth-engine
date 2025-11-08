import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Users, Clock, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

const pricingModels = [
  {
    title: "Hourly Support",
    description: "Pay for recruiting hours as you need them",
    features: [
      "Flexible scheduling",
      "No minimum commitment",
      "Ideal for 1-3 roles",
      "Direct communication",
    ],
  },
  {
    title: "Project-Based",
    description: "Fixed scope for specific hiring initiatives",
    features: [
      "Clear deliverables",
      "Defined timeline",
      "Best for 3-10 roles",
      "Milestone-based payments",
    ],
  },
  {
    title: "Embedded Partner",
    description: "Dedicated recruiting capacity for your team",
    features: [
      "Ongoing partnership",
      "10+ roles or continuous hiring",
      "Strategic planning included",
      "Volume discounts",
    ],
  },
];

const EmployersPage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center">
              <Navbar />
            </div>
          </header>
          
          <main className="flex-1">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
              <Link to="/">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              {/* Hero Section */}
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Recruiting Support That Scales
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    With Your Team
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Turn recruiting on when you need it. Turn it off when you don't. No agency bloat, no long-term contracts.
                </p>
                <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                  Schedule a 15-Min Call
                </Button>
              </div>

              {/* Problem/Solution */}
              <section className="mb-20">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-8 bg-muted/30">
                    <h3 className="text-2xl font-bold text-foreground mb-4">The Problem</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>• Full-time recruiters are expensive and risky when hiring is uneven</li>
                      <li>• Agencies charge 20-30% and often send unqualified candidates</li>
                      <li>• DIY recruiting takes founders and managers away from building</li>
                      <li>• Job boards flood you with noise, not signal</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-8 bg-primary/5 border-primary/20">
                    <h3 className="text-2xl font-bold text-foreground mb-4">The HirePhaze Way</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Pay only for the hours or projects you need</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Founder-led: every search is personally overseen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Transparent process with real-time pipeline visibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Quality over quantity: targeted outreach, not spray and pray</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </section>

              {/* Pricing Models */}
              <section className="mb-20">
                <h2 className="text-3xl font-bold text-center text-foreground mb-4">
                  Simple, Flexible Pricing
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Choose the model that fits your hiring needs. No surprises, no hidden fees.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {pricingModels.map((model, index) => (
                    <Card key={model.title} className="p-6 hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 100}ms` }}>
                      <h3 className="text-xl font-bold text-foreground mb-2">{model.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{model.description}</p>
                      <ul className="space-y-3">
                        {model.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button variant="outline" onClick={() => setIsBookingOpen(true)}>
                    Discuss Pricing for Your Needs
                  </Button>
                </div>
              </section>

              {/* Process */}
              <section className="mb-20">
                <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                  What Working Together Looks Like
                </h2>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Discovery Call</h3>
                    <p className="text-sm text-muted-foreground">15-30 mins to understand your roles, team, and timeline</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Proposal</h3>
                    <p className="text-sm text-muted-foreground">Clear scope, timeline, and pricing in plain English</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Execution</h3>
                    <p className="text-sm text-muted-foreground">Weekly updates, transparent pipeline, regular check-ins</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Results</h3>
                    <p className="text-sm text-muted-foreground">Qualified candidates, interview-ready shortlists</p>
                  </Card>
                </div>
              </section>

              {/* CTA */}
              <section className="text-center">
                <Card className="p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Ready to Hire Without the Overhead?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Let's talk about your hiring needs. No pitch deck, no commitment—just a real conversation about what you're looking for.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                      Book a Discovery Call
                    </Button>
                    <Link to="/#contact">
                      <Button size="lg" variant="outline">
                        Send Us Your Job Spec
                      </Button>
                    </Link>
                  </div>
                </Card>
              </section>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
      
      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </SidebarProvider>
  );
};

export default EmployersPage;
