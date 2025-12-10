-- Create discovery_submissions table for both employers and candidates
CREATE TABLE public.discovery_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('employer', 'candidate')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  company_size TEXT,
  industry TEXT,
  roles_to_fill TEXT,
  hiring_timeline TEXT,
  linkedin_url TEXT,
  desired_role TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.discovery_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (public forms)
CREATE POLICY "Anyone can submit discovery forms" 
ON public.discovery_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view submissions (for admin purposes)
CREATE POLICY "Authenticated users can view submissions" 
ON public.discovery_submissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Add trigger for updated_at
CREATE TRIGGER update_discovery_submissions_updated_at
BEFORE UPDATE ON public.discovery_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();