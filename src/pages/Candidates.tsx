import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Briefcase, TrendingUp, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import CandidateDiscoveryForm from "@/components/CandidateDiscoveryForm";
import { Helmet } from "react-helmet";

const benefits = [
  {
    icon: Briefcase,
    title: "Curated Opportunities",
    description: "We work with high-growth startups and established tech companies hiring for real roles, not ghost jobs.",
  },
  {
    icon: Heart,
    title: "Honest Feedback",
    description: "No ghosting. You'll get real, actionable feedback whether you're a fit or not.",
  },
  {
    icon: TrendingUp,
    title: "Career Guidance",
    description: "Optional resume review, interview prep, and salary negotiation support.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description: "Talk directly to the founder, not a junior recruiter reading from a script.",
  },
];

const CandidatesPage = () => {
  return (
    <SidebarProvider>
      <Helmet>
        <title>HirePhaze for Job Seekers – Career Coaching & Recruiting Connections</title>
        <meta name="description" content="Get direct access to curated roles and transparent feedback. Explore open opportunities with HirePhaze." />
        <meta name="keywords" content="career coaching, job seeker support, recruiter connections, remote roles, tech jobs, startup careers" />
        <link rel="canonical" href="https://hirephaze.com/candidates" />
      </Helmet>
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
                  Your Career, Guided by Real Recruiters
                </h1>
                <h2 className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get personalized help, open role access, and honest feedback — built around your goals. Whether you're exploring remote roles, seeking career coaching, or looking for recruiter connections in tech and startups, HirePhaze connects you with real opportunities.
                </h2>
              </div>

              {/* Benefits */}
              <section className="mb-20">
                <header className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground">
                    Why Join HirePhaze's Network?
                  </h2>
                </header>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {benefits.map((benefit, index) => (
                    <Card key={benefit.title} className="p-6 hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </Card>
                  ))}
                </div>
              </section>

              {/* How It Works */}
              <section className="mb-20">
                <h2 className="text-3xl font-bold text-center text-foreground mb-4">
                  How It Works
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Simple, transparent, and respectful of your time
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Submit Your Info</h3>
                    <p className="text-muted-foreground">Tell us about yourself and what you're looking for</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">2</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">We Match You</h3>
                    <p className="text-muted-foreground">When relevant roles open up, we'll reach out with details</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">3</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Direct Intros</h3>
                    <p className="text-muted-foreground">Skip the black hole—get connected directly to hiring teams</p>
                  </div>
                </div>
              </section>

              {/* Discovery Form */}
              <section className="mb-20" id="discovery">
                <CandidateDiscoveryForm />
              </section>

              {/* Optional Services */}
              <section>
                <Card className="p-8 bg-muted/30 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Need Career Coaching or Resume Help?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    We offer optional career services including resume reviews, interview preparation, and salary negotiation coaching.
                  </p>
                  <Link to="/services">
                    <Button variant="outline">
                      Explore Career Services
                    </Button>
                  </Link>
                </Card>
              </section>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CandidatesPage;