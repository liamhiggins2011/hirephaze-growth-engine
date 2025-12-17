-- Make resumes bucket private
UPDATE storage.buckets SET public = false WHERE id = 'resumes';

-- Drop existing permissive policy
DROP POLICY IF EXISTS "Authenticated users can view resumes" ON storage.objects;

-- Create policy for staff/admin to view resumes
CREATE POLICY "Staff can view resumes"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'resumes' AND
  public.is_staff_or_admin(auth.uid())
);

-- Keep upload policy for public job applications (if not exists)
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');