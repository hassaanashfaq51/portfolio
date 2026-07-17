-- SQL Migration script to initialize the Database Schema for Muhammad Hassaan's Full-Stack Portfolio
-- This completely replaces any previous portfolio schema and sets up tables, RLS policies, and default seeds.

-- =========================================================================
-- 1. CLEANUP PREVIOUS RESOURCES
-- =========================================================================
-- Drop old tables that might exist from previous configurations
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS lead_consultations CASCADE;

-- =========================================================================
-- 2. CREATE SCHEMAS & TABLES
-- =========================================================================

-- Create Projects Table
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Contact Messages (Inquiries) Table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Consultations Table
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =========================================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- 4. CONFIGURE SECURITY POLICIES
-- =========================================================================

-- --- Projects Policies ---
-- Allow public select (anyone can view projects)
CREATE POLICY "Allow public read access to projects" 
ON projects FOR SELECT 
TO public 
USING (true);

-- Allow authenticated users (admin) full write access to projects
CREATE POLICY "Allow authenticated full write access to projects" 
ON projects FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- --- Contact Messages Policies ---
-- Allow public insert (anyone can send a message)
CREATE POLICY "Allow public insert access to contact_messages" 
ON contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated users (admin) read/delete access to contact_messages
CREATE POLICY "Allow authenticated read/delete to contact_messages" 
ON contact_messages FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- --- Consultations Policies ---
-- Allow public insert (anyone can request a consultation)
CREATE POLICY "Allow public insert access to consultations" 
ON consultations FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated users (admin) read/delete access to consultations
CREATE POLICY "Allow authenticated read/delete to consultations" 
ON consultations FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- =========================================================================
-- 5. SEED INITIAL PORTFOLIO DATA
-- =========================================================================
INSERT INTO projects (id, title, description, technologies, features, live_url, github_url, image_url, created_at)
VALUES 
(
  'proj-1', 
  'U2 Collective HR Management Portal', 
  'Full-stack HR and employee management portal featuring payrolls, administrative actions, and role-based access control.', 
  ARRAY['React.js', 'Node.js', 'Supabase'], 
  ARRAY['Role-based access control', 'Payroll generation', 'Interactive analytics dashboard'], 
  'https://u2-collective-portal-hqk8.vercel.app', 
  'https://github.com/hassaanashfaq51/u2-collective-portal', 
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  '2026-07-11 00:00:00+00'
);
