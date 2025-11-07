import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Award, Users, Clock, TrendingUp } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import heroOffice from "@/assets/hero-office.jpg";

const VClaude = () => {
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
                  Hire Better Leaders.
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Keep Them Longer. Waste Less Time.
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                  From executive search to full recruitment outsourcing, we deliver quality hires in 30 days—with a 95% retention rate after year one.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Success Stories
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Successful Placements Since 2021</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction (250+ Reviews)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">23</div>
                    <div className="text-sm text-muted-foreground">Days Avg. Time-to-Hire</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">4.2</div>
                    <div className="text-sm text-muted-foreground">Years Avg. Candidate Tenure</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Complete Talent Solutions */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                  Complete Talent Solutions
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12">
                  Whether you need one critical hire or an entire recruitment team, we have the solution.
                </p>
                
                <div className="space-y-8">
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-4">Retained Executive Search</h3>
                    <p className="text-lg text-primary font-semibold mb-4">
                      For VP-level and C-suite positions that define your company's future.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      We become an extension of your leadership team, conducting confidential searches for mission-critical roles. Average placement time: 35-45 days.
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm"><strong>Ideal for:</strong> Private equity firms, fast-growth startups, enterprise companies</p>
                      <p className="text-sm"><strong>Our specialty:</strong> Tech, Healthcare, and Financial Services executives</p>
                    </div>
                    <Button variant="outline">Learn More About Executive Search</Button>
                  </div>
                  
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-4">Recruitment Process Outsourcing (RPO)</h3>
                    <p className="text-lg text-primary font-semibold mb-4">
                      Your complete hiring department—without the overhead.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      From employer branding to onboarding, we manage your entire recruitment function. Our clients reduce cost-per-hire by 40% while cutting time-to-fill in half.
                    </p>
                    <ul className="space-y-2 mb-6 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Customized hiring strategy and employer brand positioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Multi-channel candidate sourcing and screening</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Interview coordination and candidate experience management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Offer negotiation and onboarding support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Ongoing analytics and process optimization</span>
                      </li>
                    </ul>
                    <p className="text-sm mb-6"><strong>Ideal for:</strong> Companies hiring 20+ employees per year, startups scaling rapidly</p>
                    <Button variant="outline">Explore RPO Solutions</Button>
                  </div>
                  
                  <div className="p-8 bg-background rounded-lg border border-border">
                    <h3 className="text-2xl font-bold mb-4">Contingency Talent Search</h3>
                    <p className="text-lg text-primary font-semibold mb-4">
                      Fast, flexible hiring across all levels—pay only for results.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Access our network of 50,000+ pre-vetted professionals across technical, operational, and specialized roles. We source both active job seekers and passive candidates who aren't on the market.
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm"><strong>Our reach:</strong> Mid-level managers, individual contributors, specialized technical roles</p>
                      <p className="text-sm"><strong>Industries served:</strong> Technology, Healthcare, Manufacturing, Professional Services</p>
                    </div>
                    <Button variant="outline">Start Your Search</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Client Success Story */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-4xl">
                <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
                  <p className="text-lg italic text-foreground mb-4">
                    "HirePhaze filled three critical engineering roles in 6 weeks—positions we'd been struggling with for 5 months. All three hires are still with us 2 years later. They don't just find candidates; they find the right cultural fits."
                  </p>
                  <p className="font-semibold">— Sarah Chen, VP of Engineering, TechFlow Solutions</p>
                </div>
              </div>
            </section>

            {/* Why Choose */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                  Why Companies Choose HirePhaze
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <Award className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Deep Industry Expertise</h4>
                    <p className="text-muted-foreground text-sm">15+ years of combined experience in Technology, Healthcare, and Financial Services. We speak your language and understand your challenges.</p>
                  </div>
                  
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <TrendingUp className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Proven Results That Matter</h4>
                    <p className="text-muted-foreground text-sm">500+ placements with a 95% first-year retention rate. Our average client relationship spans 3+ years because we deliver consistent quality.</p>
                  </div>
                  
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <Users className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">True Partnership Approach</h4>
                    <p className="text-muted-foreground text-sm">We take time to understand your culture, growth goals, and team dynamics—not just job descriptions. Every search is customized, never cookie-cutter.</p>
                  </div>
                  
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Speed Without Compromise</h4>
                    <p className="text-muted-foreground text-sm">Our 10-phase vetting process and extensive network mean you see qualified candidates in days, not weeks. Average time-to-hire: 23 days.</p>
                  </div>
                  
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <CheckCircle className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Pre-Vetted Talent Network</h4>
                    <p className="text-muted-foreground text-sm">50,000+ professionals in our database, continuously updated. We've already done the sourcing work before you even reach out.</p>
                  </div>
                  
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <Award className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Support Beyond the Hire</h4>
                    <p className="text-muted-foreground text-sm">90-day guarantee on all placements, plus ongoing check-ins to ensure long-term success. We're invested in retention, not just placement fees.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Career Services */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                  For Job Seekers: Career Advancement Services
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12">
                  Ready to take the next step in your career?
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Career Coaching</h3>
                    <p className="text-muted-foreground mb-4">
                      One-on-one coaching to help you clarify your goals, develop leadership skills, and navigate career transitions with confidence.
                    </p>
                    <p className="text-sm mb-6">
                      <strong>What we cover:</strong> Personal branding, negotiation strategies, leadership development, career pivots
                    </p>
                    <Button variant="outline">Explore Coaching Programs</Button>
                  </div>
                  
                  <div className="p-8 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Resume & LinkedIn Optimization</h3>
                    <p className="text-muted-foreground mb-4">
                      Professional resume writing and LinkedIn profile enhancement to get you noticed by recruiters and hiring managers.
                    </p>
                    <p className="text-sm mb-6">
                      <strong>Packages include:</strong> ATS-optimized resume, compelling LinkedIn headline and summary, keyword optimization
                    </p>
                    <Button variant="outline">View Resume Services</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
              <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Make Your Next Great Hire?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Let's discuss your hiring challenges and show you how HirePhaze can help you build a stronger team.
                </p>
                
                <Button size="lg" onClick={() => setIsBookingOpen(true)} className="mb-8">
                  Book Your Free Consultation
                </Button>

                <div className="text-muted-foreground space-y-2">
                  <p className="font-semibold">Or Reach Out Directly:</p>
                  <p>📧 contact@hirephaze.com</p>
                  <p>📞 832-493-3924</p>
                  <p className="text-sm">Monday–Friday, 8 AM–6 PM CST</p>
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

export default VClaude;