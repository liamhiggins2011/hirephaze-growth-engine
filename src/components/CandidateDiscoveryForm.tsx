import { useState, useRef } from "react";
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
import { Loader2, User, Upload, FileText, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").max(500).optional().or(z.literal("")),
  desiredRole: z.string().trim().min(2, "Please describe what roles you're looking for").max(200),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  message: z.string().trim().max(1000).optional(),
});

const experienceLevels = [
  "Entry Level (0-2 years)",
  "Mid Level (3-5 years)",
  "Senior (6-10 years)",
  "Lead/Principal (10+ years)",
  "Executive/C-Suite",
];

const CandidateDiscoveryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      desiredRole: "",
      experienceLevel: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadResume = async (file: File, email: string): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${email.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.${fileExt}`;
    const filePath = `applications/${fileName}`;

    const { error } = await supabase.storage
      .from("resumes")
      .upload(filePath, file);

    if (error) {
      console.error("Resume upload error:", error);
      return null;
    }

    // Create a signed URL for secure access (expires in 7 days for email notification)
    const { data, error: signError } = await supabase.storage
      .from("resumes")
      .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days

    if (signError) {
      console.error("Signed URL error:", signError);
      return null;
    }

    return data.signedUrl;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    let resumeUrl: string | null = null;

    try {
      // Upload resume if provided
      if (resumeFile) {
        setUploadingResume(true);
        resumeUrl = await uploadResume(resumeFile, values.email);
        setUploadingResume(false);
      }

      // Save to database
      const { error: dbError } = await supabase.from("discovery_submissions").insert({
        type: "candidate",
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        linkedin_url: values.linkedin || null,
        desired_role: values.desiredRole,
        message: values.message || null,
      });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-discovery-notification", {
        body: {
          type: "candidate",
          name: values.name,
          email: values.email,
          phone: values.phone,
          linkedin: values.linkedin,
          desiredRole: values.desiredRole,
          experienceLevel: values.experienceLevel,
          resumeUrl: resumeUrl,
          message: values.message,
        },
      });

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      toast.success("Thanks for applying! We'll reach out when relevant opportunities arise.");
      form.reset();
      setResumeFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit. Please try again or email us directly at liam@hirephaze.com");
    } finally {
      setIsSubmitting(false);
      setUploadingResume(false);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <User className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Apply to Join Our Talent Network
        </h2>
        <p className="text-muted-foreground mt-2">
          Submit your information and we'll match you with curated opportunities
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
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Resume (optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 transition-colors hover:border-primary/50">
              {resumeFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">{resumeFile.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF or Word (max 5MB)
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>

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
                {uploadingResume ? "Uploading resume..." : "Submitting..."}
              </>
            ) : (
              "Submit Application"
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