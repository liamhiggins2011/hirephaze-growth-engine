import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Zap, Shield } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import heroOffice from "@/assets/hero-office.jpg";

const VGrok = () => {
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
                  Revolutionizing Talent Acquisition
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    with Phazed Precision
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                  From executive search to resume optimization, we deliver comprehensive staffing solutions that transform your hiring process, accelerate business growth, and empower careers. Whether you're an employer seeking top talent or a professional advancing your path, HirePhaze guides you through every phase with expertise and innovation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Services
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Placements Made in Tech, Finance, and Healthcare</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction Based on Independent Surveys</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">150+</div>
                    <div className="text-sm text-muted-foreground">Partner Companies Across Diverse Industries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available Via Email, Chat, and Dedicated Agents</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Comprehensive Staffing Solutions */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                  Comprehensive Staffing Solutions
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12">
                  We offer a full spectrum of recruitment services tailored to your unique needs. Choose from options designed for employers or professionals.
                </p>
                
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-8 text-center">For Employers</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-background rounded-lg border border-border">
                      <Target className="w-10 h-10 text-primary mb-4" />
                      <h4 className="text-xl font-bold mb-3">Retained Search</h4>
                      <p className="text-muted-foreground mb-4">
                        Dedicated executive search partnerships for critical leadership positions. We become an extension of your team, committed to finding the perfect fit—guaranteeing results within 90 days.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>In-depth market mapping</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Confidential candidate outreach</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Cultural alignment assessments</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-8 bg-background rounded-lg border border-border">
                      <Zap className="w-10 h-10 text-primary mb-4" />
                      <h4 className="text-xl font-bold mb-3">Recruiting Process Outsourcing</h4>
                      <p className="text-muted-foreground mb-4">
                        Complete end-to-end recruitment solutions. From strategy to onboarding, we manage your entire hiring lifecycle with precision.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Customized recruitment strategies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Applicant tracking system integration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Onboarding support to ensure smooth transitions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-8 bg-background rounded-lg border border-border">
                      <Shield className="w-10 h-10 text-primary mb-4" />
                      <h4 className="text-xl font-bold mb-3">Talent Search</h4>
                      <p className="text-muted-foreground mb-4">
                        Proactive candidate sourcing across all levels. We tap into our extensive network to find both active and passive candidates.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Access to 10,000+ pre-vetted candidates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>AI-driven matching for faster results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Multi-channel sourcing (LinkedIn, industry events, referrals)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-8 text-center">For Professionals</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-8 bg-background rounded-lg border border-border">
                      <h4 className="text-xl font-bold mb-3">Career Coaching</h4>
                      <p className="text-muted-foreground mb-4">
                        Personalized coaching to help professionals navigate their career journey, develop leadership skills, and achieve their goals.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>One-on-one sessions with certified coaches</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Skill development workshops</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Goal-setting and progress tracking</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-8 bg-background rounded-lg border border-border">
                      <h4 className="text-xl font-bold mb-3">Resume Optimization</h4>
                      <p className="text-muted-foreground mb-4">
                        Professional resume and LinkedIn profile enhancement to maximize your visibility and attract the right opportunities.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Keyword optimization for ATS systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Custom branding statements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Profile makeover with professional summaries</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Partner */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
                  Why Partner with HirePhaze?
                </h2>
                <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                  Unlike traditional recruiters, we focus on cultural alignment, reducing turnover by 30% on average. We're not just filling positions—we're building lasting partnerships and transforming careers. Our comprehensive approach ensures success at every phase of the hiring journey.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Industry Expertise</h4>
                      <p className="text-muted-foreground text-sm">Deep understanding of market dynamics and talent landscapes across tech, finance, healthcare, and more.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Proven Track Record</h4>
                      <p className="text-muted-foreground text-sm">Hundreds of successful placements with a 98% client satisfaction rate, backed by client testimonials.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Personalized Approach</h4>
                      <p className="text-muted-foreground text-sm">Tailored strategies that align with your unique company culture and goals.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Speed & Efficiency</h4>
                      <p className="text-muted-foreground text-sm">Streamlined processes that reduce time-to-hire by up to 40% without compromising quality.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Extensive Network</h4>
                      <p className="text-muted-foreground text-sm">Access to a vast pool of pre-vetted, qualified candidates across all levels.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">End-to-End Support</h4>
                      <p className="text-muted-foreground text-sm">From initial consultation to post-placement follow-up, we're with you every step.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Transform Your Hiring?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Let's discuss how HirePhaze can help you find the perfect talent or take your career to the next level.
                </p>
                
                <Button size="lg" onClick={() => setIsBookingOpen(true)} className="mb-8">
                  Schedule a Consultation
                </Button>

                <div className="text-muted-foreground space-y-2">
                  <p><strong>Contact Us</strong></p>
                  <p>Email: contact@hirephaze.com</p>
                  <p>Call: 832-493-3924</p>
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

export default VGrok;