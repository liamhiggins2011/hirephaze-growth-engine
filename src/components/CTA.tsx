import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";

type CalendarSchedulingButton = {
  load: (config: { url: string; color: string; label: string; target: Element }) => void;
};

declare global {
  interface Window {
    calendar?: {
      schedulingButton?: CalendarSchedulingButton;
    };
  }
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().min(1, "Company is required").max(100),
  message: z.string().min(1, "Message is required").max(1000),
});

const CTA = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendarButtonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load Google Calendar scheduling CSS
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load and initialize Google Calendar scheduling script
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    
    script.onload = () => {
      const schedulingButton = window.calendar?.schedulingButton;

      if (calendarButtonRef.current && schedulingButton) {
        schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hbfkRcYh8BHLtTfyTx2vChxVmG5vZGWnY82OOPtQPuZcJWFwFC2Gu0ePEd1nDtf-HzNKObws6?gv=true',
          color: '#039BE5',
          label: 'Book Your Free Consultation',
          target: calendarButtonRef.current,
        });
      }
    };
    
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: values,
      });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Hire Smarter in 2025?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's talk about your hiring needs—no sales pitch, just a real conversation about what you need.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Email Us</div>
                  <a href="mailto:liam@hirephaze.com" className="text-muted-foreground hover:text-primary transition-colors">
                    liam@hirephaze.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Call Us</div>
                  <a href="tel:832-493-3924" className="text-muted-foreground hover:text-primary transition-colors">
                    832-493-3924
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Tell us about your hiring needs..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full min-h-[44px]" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Us Your Job Spec"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
        
        <div className="mt-16 animate-fade-in">
          <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Book a Discovery Call</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              15 minutes to understand your needs, zero pressure
            </p>
            <div ref={calendarButtonRef} className="inline-block" />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;
