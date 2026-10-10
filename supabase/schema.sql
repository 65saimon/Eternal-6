-- ====================================================================
-- QUANTRIX INTELLIGENCE - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ====================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('SaaS', 'Automation', 'R&D')),
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    cover_image TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    metrics JSONB DEFAULT '{}'::jsonb,
    client TEXT,
    live_url TEXT,
    github_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Services Table (3 Core Pillars)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    pillar TEXT NOT NULL CHECK (pillar IN ('SaaS', 'Automation', 'R&D')),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    icon TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service_interest TEXT,
    budget_range TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Auto-update updated_at timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- PROJECTS POLICIES
-- Anyone can view published projects
CREATE POLICY "Allow public read access to published projects"
    ON public.projects
    FOR SELECT
    USING (status = 'published');

-- Authenticated admins can view all projects (including drafts)
CREATE POLICY "Allow authenticated users to view all projects"
    ON public.projects
    FOR SELECT
    TO authenticated
    USING (true);

-- Authenticated admins can insert projects
CREATE POLICY "Allow authenticated users to insert projects"
    ON public.projects
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Authenticated admins can update projects
CREATE POLICY "Allow authenticated users to update projects"
    ON public.projects
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Authenticated admins can delete projects
CREATE POLICY "Allow authenticated users to delete projects"
    ON public.projects
    FOR DELETE
    TO authenticated
    USING (true);

-- SERVICES POLICIES
-- Public can read all services
CREATE POLICY "Allow public read access to services"
    ON public.services
    FOR SELECT
    USING (true);

-- Authenticated admins can manage services
CREATE POLICY "Allow authenticated users to modify services"
    ON public.services
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- CONTACT SUBMISSIONS POLICIES
-- Public (anonymous) can submit inquiries
CREATE POLICY "Allow anonymous submission of contact forms"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated users can view inquiries
CREATE POLICY "Allow authenticated users to view contact inquiries"
    ON public.contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Only authenticated users can update inquiry statuses
CREATE POLICY "Allow authenticated users to update contact inquiries"
    ON public.contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ====================================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION
-- ====================================================================

-- Insert storage bucket for project images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read project images
CREATE POLICY "Public Read Access for Project Images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'project-images');

-- Only authenticated users can upload project images
CREATE POLICY "Authenticated Upload Access for Project Images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'project-images');

-- Only authenticated users can update/delete project images
CREATE POLICY "Authenticated Modification for Project Images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated Deletion for Project Images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'project-images');
