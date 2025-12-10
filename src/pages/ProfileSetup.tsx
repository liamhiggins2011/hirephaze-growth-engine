import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Loader2, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const profileSchema = z.object({
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters").max(100),
  role: z.string().trim().min(2, "Role must be at least 2 characters").max(100),
  industry: z.string().min(1, "Please select an industry"),
  phoneNumber: z.string().trim().max(20).optional(),
});

const industries = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Professional Services",
  "Real Estate",
  "Education",
  "Media & Entertainment",
  "Energy & Utilities",
  "Transportation & Logistics",
  "Other",
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    industry: "",
    phoneNumber: "",
  });

  // Check if profile is already complete
  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setCheckingProfile(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("company_name, role, industry")
          .eq("id", user.id)
          .single();

        if (!error && data?.company_name && data?.role && data?.industry) {
          // Profile already complete, redirect to home
          navigate("/");
          return;
        }
      } catch (err) {
        console.error("Error checking profile:", err);
      }
      
      setCheckingProfile(false);
    };

    if (!authLoading) {
      checkProfile();
    }
  }, [user, authLoading, navigate]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    try {
      const validated = profileSchema.parse(form);

      const { error } = await supabase
        .from("profiles")
        .update({
          company_name: validated.companyName,
          role: validated.role,
          industry: validated.industry,
          phone_number: validated.phoneNumber || null,
        })
        .eq("id", user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save your profile. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile complete!",
          description: "Welcome to HirePhaze. Let's find your next great hire.",
        });
        navigate("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  if (authLoading || checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src="/hirephaze-logo.png" alt="HirePhaze" className="h-[105px] w-auto" />
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us about your company so we can better serve your hiring needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Acme Inc."
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="Head of Talent, CEO, HR Manager..."
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={form.industry}
                  onValueChange={(value) => setForm({ ...form, industry: value })}
                  disabled={loading}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={handleSkip}
                  disabled={loading}
                >
                  Skip for now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;