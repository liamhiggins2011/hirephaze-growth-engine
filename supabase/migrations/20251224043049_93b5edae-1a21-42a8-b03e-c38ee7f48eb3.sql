-- Create job_postings table for internal job management
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT 'HirePhaze',
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-time',
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Public can view active job postings
CREATE POLICY "Anyone can view active job postings"
ON public.job_postings
FOR SELECT
USING (is_active = true);

-- Staff/admin can view all job postings (including inactive)
CREATE POLICY "Staff can view all job postings"
ON public.job_postings
FOR SELECT
USING (is_staff_or_admin(auth.uid()));

-- Staff/admin can create job postings
CREATE POLICY "Staff can create job postings"
ON public.job_postings
FOR INSERT
WITH CHECK (is_staff_or_admin(auth.uid()));

-- Staff/admin can update job postings
CREATE POLICY "Staff can update job postings"
ON public.job_postings
FOR UPDATE
USING (is_staff_or_admin(auth.uid()));

-- Staff/admin can delete job postings
CREATE POLICY "Staff can delete job postings"
ON public.job_postings
FOR DELETE
USING (is_staff_or_admin(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_job_postings_updated_at
BEFORE UPDATE ON public.job_postings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();