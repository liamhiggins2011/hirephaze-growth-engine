-- Make resumes bucket public so download links work
UPDATE storage.buckets SET public = true WHERE id = 'resumes';