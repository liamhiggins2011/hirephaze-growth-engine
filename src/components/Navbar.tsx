import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  return (
    <nav className="flex items-center justify-between flex-1 px-4">
        <button 
          onClick={toggleSidebar}
          className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src="/hirephaze-logo.png?v=2" alt="HirePhaze logo" className="h-10 md:h-12 w-auto" />
        </button>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/employers" className="text-foreground hover:text-primary transition-colors">
            Employers
          </Link>
          <Link to="/candidates" className="text-foreground hover:text-primary transition-colors">
            Candidates
          </Link>
          <Link to="/services" className="text-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button>
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
