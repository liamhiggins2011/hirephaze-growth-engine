import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").max(500).optional().or(z.literal("")),
  desiredRole: z.string().trim().min(2, "Please describe what roles you're looking for").max(200),
  message: z.string().trim().max(1000).optional(),
});

const CandidateDiscoveryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      desiredRole: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("discovery_submissions").insert({
        type: "candidate",
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        linkedin_url: values.linkedin || null,
        desired_role: values.desiredRole,
        message: values.message || null,
      });

      if (error) throw error;

      toast.success("Thanks for joining our network! We'll reach out when relevant opportunities arise.");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit. Please try again or email us directly at liam@hirephaze.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <User className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Join the Talent Network
        </h2>
        <p className="text-muted-foreground mt-2">
          Get matched with curated opportunities that fit your goals
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="desiredRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What role(s) are you looking for? *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Senior Product Manager, Engineering Lead, Sales Director" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anything else we should know?</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Location preferences, remote/hybrid/onsite, salary expectations, timeline, industries you're interested in..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full min-h-[44px]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join Talent Network"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We respect your inbox. No spam, just relevant opportunities.
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default CandidateDiscoveryForm;