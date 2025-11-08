import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AudienceSplit from "@/components/AudienceSplit";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import FounderSection from "@/components/FounderSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
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
            <div id="hero">
              <Hero />
            </div>
            <AudienceSplit />
            <HowItWorks />
            <div id="services">
              <Services />
            </div>
            <div id="why-us">
              <WhyChooseUs />
            </div>
            <FounderSection />
            <div id="contact">
              <CTA />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
