import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Building2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  companyName: z.string().trim().min(2, "Company name is required").max(100),
  companySize: z.string().min(1, "Please select company size"),
  industry: z.string().min(1, "Please select industry"),
  rolesToFill: z.string().trim().min(2, "Please describe the roles you need to fill").max(500),
  hiringTimeline: z.string().min(1, "Please select a timeline"),
  message: z.string().trim().max(1000).optional(),
});

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

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

const timelines = [
  "Immediately (within 2 weeks)",
  "Within 1 month",
  "Within 3 months",
  "Planning ahead (3+ months)",
];

const EmployerDiscoveryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      companySize: "",
      industry: "",
      rolesToFill: "",
      hiringTimeline: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("discovery_submissions").insert({
        type: "employer",
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        company_name: values.companyName,
        company_size: values.companySize,
        industry: values.industry,
        roles_to_fill: values.rolesToFill,
        hiring_timeline: values.hiringTimeline,
        message: values.message || null,
      });

      if (error) throw error;

      toast.success("Thanks for reaching out! We'll be in touch within 24 hours.");
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
          <Building2 className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Start Your Hiring Journey
        </h2>
        <p className="text-muted-foreground mt-2">
          Tell us about your hiring needs and we'll craft a tailored approach
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
                  <FormLabel>Your Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
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
                  <FormLabel>Work Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@company.com" {...field} />
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
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="rolesToFill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What roles are you looking to fill? *</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="e.g., Senior Software Engineer, Product Manager, 2-3 Sales roles..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hiringTimeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hiring Timeline *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need to hire?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    rows={3}
                    placeholder="Budget expectations, specific challenges, what you've tried before..."
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
              "Get My Custom Proposal"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We'll respond within 24 hours with a tailored approach for your needs.
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default EmployerDiscoveryForm;