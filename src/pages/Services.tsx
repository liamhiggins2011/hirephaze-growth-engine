import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
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
              
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Our Services
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive staffing solutions tailored to your unique needs. From executive search to career coaching, we've got you covered.
                </p>
              </div>
            </div>
            
            <Services />
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ServicesPage;
