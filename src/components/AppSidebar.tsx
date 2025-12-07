import { Home, Briefcase, Building2, Users, MessageCircle, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Employers", url: "/employers", icon: Building2 },
  { title: "Candidates", url: "/candidates", icon: Users },
  { title: "Careers", url: "/careers", icon: FileText },
  { title: "Services", url: "/services", icon: Briefcase },
  { title: "About", url: "/about", icon: Users },
  { title: "Contact", url: "/#contact", icon: MessageCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar
      className={`${
        open ? "w-72" : "w-16"
      } transition-all duration-300 border-r-0 backdrop-blur-xl bg-background/80`}
      collapsible="icon"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/3 to-transparent -z-10" />
      
      <SidebarContent className="gap-0 pt-8">
        <div className="px-3 mb-8">
          {open && (
            <div className="animate-fade-in flex justify-center">
              <img 
                src="/hirephaze-logo.png?v=2" 
                alt="HirePhaze logo" 
                className="h-24 w-auto"
              />
            </div>
          )}
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-primary/10 hover:scale-105 active:scale-95"
                        activeClassName="bg-primary/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 group-hover:rotate-6">
                            <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          
                          {open && (
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </span>
                          )}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
