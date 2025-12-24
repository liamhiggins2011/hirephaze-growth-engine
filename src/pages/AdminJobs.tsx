import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Briefcase, Eye, EyeOff } from "lucide-react";

interface JobPosting {
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
  is_active: boolean;
  created_at: string;
}

const emptyJob = {
  title: "",
  company: "HirePhaze",
  location: "",
  type: "Full-time",
  salary_min: "",
  salary_max: "",
  description: "",
  requirements: "",
  benefits: "",
  is_active: true,
};

const AdminJobs = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState(emptyJob);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const checkStaffStatus = async () => {
      if (!user) return;
      
      const { data } = await supabase.rpc("is_staff_or_admin", {
        _user_id: user.id,
      });
      
      if (!data) {
        toast.error("Access denied. Staff or admin role required.");
        navigate("/");
        return;
      }
      
      setIsStaff(true);
      fetchJobs();
    };

    if (user) {
      checkStaffStatus();
    }
  }, [user, navigate]);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("job_postings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load jobs");
      console.error(error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const jobData = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      type: formData.type,
      salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
      salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
      description: formData.description.trim() || null,
      requirements: formData.requirements.trim() || null,
      benefits: formData.benefits.trim() || null,
      is_active: formData.is_active,
    };

    if (editingJob) {
      const { error } = await supabase
        .from("job_postings")
        .update(jobData)
        .eq("id", editingJob.id);

      if (error) {
        toast.error("Failed to update job");
        console.error(error);
      } else {
        toast.success("Job updated successfully");
        fetchJobs();
        closeDialog();
      }
    } else {
      const { error } = await supabase.from("job_postings").insert({
        ...jobData,
        created_by: user?.id,
      });

      if (error) {
        toast.error("Failed to create job");
        console.error(error);
      } else {
        toast.success("Job created successfully");
        fetchJobs();
        closeDialog();
      }
    }

    setSubmitting(false);
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary_min: job.salary_min?.toString() || "",
      salary_max: job.salary_max?.toString() || "",
      description: job.description || "",
      requirements: job.requirements || "",
      benefits: job.benefits || "",
      is_active: job.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    const { error } = await supabase.from("job_postings").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete job");
      console.error(error);
    } else {
      toast.success("Job deleted successfully");
      fetchJobs();
    }
  };

  const toggleActive = async (job: JobPosting) => {
    const { error } = await supabase
      .from("job_postings")
      .update({ is_active: !job.is_active })
      .eq("id", job.id);

    if (error) {
      toast.error("Failed to update job status");
      console.error(error);
    } else {
      toast.success(`Job ${job.is_active ? "hidden" : "published"}`);
      fetchJobs();
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingJob(null);
    setFormData(emptyJob);
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "—";
    const format = (n: number) => `$${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${format(min)} - ${format(max)}`;
    if (min) return `${format(min)}+`;
    return `Up to ${format(max!)}`;
  };

  if (authLoading || !isStaff) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
            <div className="flex items-center h-24 px-4">
              <Navbar />
            </div>
          </header>

          <Helmet>
            <title>Manage Job Postings | HirePhaze Admin</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>

          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Manage Job Postings
                </h1>
                <p className="text-muted-foreground mt-1">
                  Create and manage job listings for your careers page
                </p>
              </div>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setFormData(emptyJob)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingJob ? "Edit Job Posting" : "Create Job Posting"}
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          placeholder="e.g. Senior Software Engineer"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Company name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="e.g. New York, NY or Remote"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Job Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData({ ...formData, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="salary_min">Min Salary (USD/year)</Label>
                        <Input
                          id="salary_min"
                          type="number"
                          value={formData.salary_min}
                          onChange={(e) =>
                            setFormData({ ...formData, salary_min: e.target.value })
                          }
                          placeholder="e.g. 80000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary_max">Max Salary (USD/year)</Label>
                        <Input
                          id="salary_max"
                          type="number"
                          value={formData.salary_max}
                          onChange={(e) =>
                            setFormData({ ...formData, salary_max: e.target.value })
                          }
                          placeholder="e.g. 120000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Describe the role and responsibilities..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={formData.requirements}
                        onChange={(e) =>
                          setFormData({ ...formData, requirements: e.target.value })
                        }
                        placeholder="List required skills and qualifications..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea
                        id="benefits"
                        value={formData.benefits}
                        onChange={(e) =>
                          setFormData({ ...formData, benefits: e.target.value })
                        }
                        placeholder="List perks and benefits..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, is_active: checked })
                        }
                      />
                      <Label htmlFor="is_active">Publish immediately</Label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={closeDialog}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting && (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        )}
                        {editingJob ? "Update Job" : "Create Job"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : jobs.length === 0 ? (
              <Card>
                <CardContent className="p-16 text-center">
                  <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No job postings yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first job posting to start attracting candidates.
                  </p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {job.company}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.type}</Badge>
                        </TableCell>
                        <TableCell>{formatSalary(job.salary_min, job.salary_max)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={job.is_active ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleActive(job)}
                          >
                            {job.is_active ? (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" />
                                Hidden
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(job.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(job)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleDelete(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminJobs;
