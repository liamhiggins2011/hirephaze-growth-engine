import { Home, Briefcase, Award, MessageCircle, Menu } from "lucide-react";
import { NavLink } from "@/components/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "#hero", icon: Home },
  { title: "Services", url: "#services", icon: Briefcase },
  { title: "Why Choose Us", url: "#why-us", icon: Award },
  { title: "Contact", url: "#contact", icon: MessageCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                HirePhaze
              </h2>
              <p className="text-xs text-muted-foreground">
                Navigate your journey
              </p>
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
                    <SidebarMenuButton
                      onClick={() => scrollToSection(item.url)}
                      className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-primary/10 hover:scale-105 active:scale-95"
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
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {open && (
          <div className="mt-auto px-6 pb-8 animate-fade-in">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs font-semibold text-primary">Quick Access</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use the menu to navigate through different sections instantly.
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
