import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Clock,
  Building2,
  DollarSign,
  ArrowLeft,
  Briefcase,
  Upload,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary_min: number | null;
  salary_max: number | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  created_at: string;
}

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const PageLayout = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center h-24 px-4">
            <Navbar />
          </div>
        </header>
        {title && (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
        {children}
        <Footer />
      </div>
    </div>
  </SidebarProvider>
);

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      
      try {
        const { data, error } = await supabase
          .from("job_postings")
          .select("id, title, company, location, type, salary_min, salary_max, description, requirements, benefits, created_at")
          .eq("id", jobId)
          .eq("is_active", true)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          setError("Job not found");
        } else {
          setJob(data);
        }
      } catch (err) {
        setError("Unable to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const format = (n: number) => `$${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${format(min)} - ${format(max)}`;
    if (min) return `${format(min)}+`;
    return `Up to ${format(max!)}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!job) return;

    setIsSubmitting(true);

    try {
      let resumeUrl = null;

      if (resumeFile) {
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, resumeFile);

        if (uploadError) {
          throw new Error("Failed to upload resume");
        }

        // Create a signed URL for secure access (expires in 7 days)
        const { data: signedData, error: signError } = await supabase.storage
          .from("resumes")
          .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days

        if (signError) {
          throw new Error("Failed to generate resume URL");
        }

        resumeUrl = signedData.signedUrl;
      }

      const { error: insertError } = await supabase
        .from("job_applications")
        .insert({
          job_id: job.id,
          job_title: job.title,
          applicant_name: data.name,
          applicant_email: data.email,
          applicant_phone: data.phone || null,
          resume_url: resumeUrl,
        });

      if (insertError) {
        throw new Error("Failed to submit application");
      }

      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Loading... | HirePhaze">
        <main className="flex-1 pb-16 container mx-auto px-4 pt-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
      </PageLayout>
    );
  }

  if (error || !job) {
    return (
      <PageLayout title="Job Not Found | HirePhaze">
        <main className="flex-1 pb-16 container mx-auto px-4 text-center pt-16">
          <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {error || "Job not found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            This position may no longer be available.
          </p>
          <Link to="/careers">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Jobs
            </Button>
          </Link>
        </main>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`${job.title} | HirePhaze Careers`}>
      <Helmet>
        <meta
          name="description"
          content={`Apply for ${job.title} at ${job.company || "our partner company"}. ${job.location ? `Location: ${job.location}.` : ""}`}
        />
      </Helmet>

      <main className="flex-1 pb-16">
        <div className="container mx-auto px-4 pt-8">
          {/* Back Link */}
          <Link
            to="/careers"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all jobs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  {job.type && <Badge className="shrink-0">{job.type}</Badge>}
                </div>

                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  {job.company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      <span>{job.company}</span>
                    </div>
                  )}
                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {formatSalary(job.salary_min, job.salary_max) && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>
                      Posted{" "}
                      {new Date(job.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {job.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About This Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p className="whitespace-pre-wrap">{job.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Requirements */}
              {job.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p className="whitespace-pre-wrap">{job.requirements}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {job.benefits && (
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p className="whitespace-pre-wrap">{job.benefits}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle>Apply Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Ready to take the next step in your career? Submit your application
                    and we'll be in touch.
                  </p>

                  <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Apply for this Position
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      {isSubmitted ? (
                        <div className="text-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                          <DialogTitle className="text-2xl mb-2">
                            Application Submitted!
                          </DialogTitle>
                          <DialogDescription className="mb-6">
                            Thank you for applying for {job.title}. We'll review your
                            application and get back to you soon.
                          </DialogDescription>
                          <Button onClick={() => setIsApplyOpen(false)}>Close</Button>
                        </div>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>
                              Fill out the form below to submit your application.
                            </DialogDescription>
                          </DialogHeader>

                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
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
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone (Optional)</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="space-y-2">
                                <FormLabel>Resume (Optional)</FormLabel>
                                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="resume-upload"
                                  />
                                  <label
                                    htmlFor="resume-upload"
                                    className="cursor-pointer"
                                  >
                                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                    {resumeFile ? (
                                      <p className="text-sm text-foreground font-medium">
                                        {resumeFile.name}
                                      </p>
                                    ) : (
                                      <>
                                        <p className="text-sm text-muted-foreground">
                                          Click to upload PDF or Word
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Max 5MB
                                        </p>
                                      </>
                                    )}
                                  </label>
                                </div>
                              </div>

                              <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  "Submit Application"
                                )}
                              </Button>
                            </form>
                          </Form>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>

                  <p className="text-xs text-muted-foreground text-center">
                    By applying, you agree to our privacy policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default JobDetails;