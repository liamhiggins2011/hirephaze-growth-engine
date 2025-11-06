import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/hirephaze-logo.png";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
            <div className="flex items-center h-16 px-4">
              <SidebarTrigger className="mr-4 hover:bg-primary/10 transition-colors p-1 rounded-lg">
                <img src={logo} alt="Menu" className="h-8 w-auto" style={{ mixBlendMode: 'darken' }} />
              </SidebarTrigger>
              <Navbar />
            </div>
          </header>
          
          <main className="flex-1">
            <div id="hero">
              <Hero />
            </div>
            <div id="services">
              <Services />
            </div>
            <div id="why-us">
              <WhyChooseUs />
            </div>
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
