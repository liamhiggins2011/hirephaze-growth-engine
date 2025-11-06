import logo from "@/assets/hirephaze-logo.png";
import { Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <img src={logo} alt="HirePhaze" className="h-8 w-auto mb-4" style={{ filter: 'brightness(0) invert(1)' }} />
            <p className="text-secondary-foreground/80 mb-4">
              Transforming talent acquisition through innovative solutions and personalized service.
            </p>
            <p className="text-secondary-foreground/80 mb-4">
              <a href="tel:832-493-3924" className="hover:text-primary transition-colors">832-493-3924</a>
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#services" className="hover:text-primary transition-colors">Retained Search</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">RPO</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Talent Search</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Coaching</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Resume Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} HirePhaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
