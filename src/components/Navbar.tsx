import { Button } from "@/components/ui/button";
import logo from "@/assets/hirephaze-logo.png";
import { useSidebar } from "@/components/ui/sidebar";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <nav className="flex items-center justify-between flex-1 px-4">
        <button 
          onClick={toggleSidebar}
          className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src={logo} alt="HirePhaze" className="h-20 w-auto" style={{ mixBlendMode: 'darken' }} />
        </button>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>
            Get Started
          </Button>
        </div>
    </nav>
  );
};

export default Navbar;
