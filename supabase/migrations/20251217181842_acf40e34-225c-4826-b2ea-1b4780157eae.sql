-- Fix discovery_submissions exposure - restrict SELECT to staff/admin only

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.discovery_submissions;

-- Create secure policy using the existing is_staff_or_admin function
CREATE POLICY "Staff can view submissions"
ON public.discovery_submissions
FOR SELECT
USING (public.is_staff_or_admin(auth.uid()));