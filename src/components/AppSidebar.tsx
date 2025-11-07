import { Home, Briefcase, Award, MessageCircle, Layers } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/hirephaze-logo.png";

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

const versionItems = [
  { title: "Original", path: "/" },
  { title: "v_Chat", path: "/v-chat" },
  { title: "v_Kimi", path: "/v-kimi" },
  { title: "v_Claude", path: "/v-claude" },
  { title: "v_Grok", path: "/v-grok" },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

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
            <div className="animate-fade-in flex justify-center">
              <img 
                src={logo} 
                alt="HirePhaze" 
                className="h-16 w-auto" 
                style={{ mixBlendMode: 'darken' }}
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

        <SidebarGroup className="px-2 mt-4">
          {open && (
            <div className="px-2 py-2">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Version Comparison
                </h4>
              </div>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {versionItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className={`rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-primary/20 text-primary font-semibold"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-primary" : "bg-muted-foreground/30"
                        }`} />
                        {open && <span className="text-sm">{item.title}</span>}
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
                Compare different homepage versions using the Version Comparison menu.
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
