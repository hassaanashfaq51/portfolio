-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  avatar TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- HERO TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS hero (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  tagline TEXT,
  subtitle TEXT,
  description TEXT,
  profile_image TEXT,
  profile_image_public_id TEXT,
  cta_primary_text VARCHAR(100) DEFAULT 'View Projects',
  cta_primary_link VARCHAR(255) DEFAULT '/projects',
  cta_secondary_text VARCHAR(100) DEFAULT 'Contact Me',
  cta_secondary_link VARCHAR(255) DEFAULT '/contact',
  typing_words JSONB DEFAULT '["Full Stack Developer", "UI/UX Designer", "Problem Solver"]',
  stats JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ABOUT TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  biography TEXT,
  personal_story TEXT,
  mission TEXT,
  vision TEXT,
  career_goals TEXT,
  image TEXT,
  image_public_id TEXT,
  years_of_experience INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  clients_served INTEGER DEFAULT 0,
  achievements JSONB DEFAULT '[]',
  certificates JSONB DEFAULT '[]',
  timeline JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(150) NOT NULL,
  description TEXT,
  short_description TEXT,
  icon VARCHAR(100),
  image TEXT,
  image_public_id TEXT,
  technologies JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  price VARCHAR(100),
  cta_text VARCHAR(100) DEFAULT 'Get Started',
  cta_link VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  short_description TEXT,
  technologies JSONB DEFAULT '[]',
  github_link TEXT,
  live_link TEXT,
  features JSONB DEFAULT '[]',
  challenges TEXT,
  solutions TEXT,
  status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'planned', 'archived')),
  completion_date DATE,
  tags JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECT IMAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  public_id TEXT,
  alt VARCHAR(255),
  is_cover BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILLS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) DEFAULT 'frontend' CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'soft_skills', 'other')),
  icon VARCHAR(100),
  color VARCHAR(50),
  proficiency INTEGER DEFAULT 80 CHECK (proficiency BETWEEN 0 AND 100),
  years_of_experience DECIMAL(3,1) DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EDUCATION TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  degree VARCHAR(200) NOT NULL,
  institute VARCHAR(200) NOT NULL,
  field_of_study VARCHAR(200),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  grade VARCHAR(50),
  description TEXT,
  achievements JSONB DEFAULT '[]',
  certificates JSONB DEFAULT '[]',
  image TEXT,
  image_public_id TEXT,
  location VARCHAR(200),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EXPERIENCE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company VARCHAR(200) NOT NULL,
  role VARCHAR(200) NOT NULL,
  type VARCHAR(50) DEFAULT 'full_time' CHECK (type IN ('full_time', 'part_time', 'freelance', 'internship', 'contract', 'remote')),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  responsibilities JSONB DEFAULT '[]',
  technologies JSONB DEFAULT '[]',
  achievements JSONB DEFAULT '[]',
  company_logo TEXT,
  company_logo_public_id TEXT,
  company_url TEXT,
  location VARCHAR(200),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TESTIMONIALS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  company VARCHAR(150),
  role VARCHAR(150),
  review TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar TEXT,
  avatar_public_id TEXT,
  project_name VARCHAR(200),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MESSAGES (CONTACT) TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(300),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RESUME TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS resume (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  public_id TEXT,
  filename VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SOCIAL LINKS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(100),
  label VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SETTINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_title VARCHAR(200),
  site_description TEXT,
  logo TEXT,
  logo_public_id TEXT,
  favicon TEXT,
  footer_text TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  analytics_id VARCHAR(100),
  primary_color VARCHAR(20) DEFAULT '#6C63FF',
  accent_color VARCHAR(20) DEFAULT '#2CB67D',
  theme VARCHAR(20) DEFAULT 'dark',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEO TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS seo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meta_title VARCHAR(200),
  meta_description TEXT,
  keywords TEXT,
  og_title VARCHAR(200),
  og_description TEXT,
  og_image TEXT,
  og_image_public_id TEXT,
  twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
  robots TEXT DEFAULT 'index, follow',
  canonical_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo ENABLE ROW LEVEL SECURITY;

-- Public read policies (for portfolio public pages)
CREATE POLICY "Public read hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Public read about" ON about FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read project_images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read resume" ON resume FOR SELECT USING (true);
CREATE POLICY "Public read social_links" ON social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read seo" ON seo FOR SELECT USING (true);

-- Service role bypass (for backend API)
CREATE POLICY "Service role all" ON users USING (auth.role() = 'service_role');
CREATE POLICY "Service role messages" ON messages USING (auth.role() = 'service_role');

-- Allow insert for contact form (public)
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

-- ============================================================
-- SEED DATA (Optional - Defaults)
-- ============================================================
INSERT INTO settings (site_title, site_description, footer_text, theme)
VALUES ('My Portfolio', 'Premium Full Stack Developer Portfolio', '© 2024 Portfolio. All rights reserved.', 'dark')
ON CONFLICT DO NOTHING;

INSERT INTO seo (meta_title, meta_description, keywords, robots)
VALUES (
  'Portfolio | Full Stack Developer',
  'Premium Full Stack Developer specializing in React, Node.js, and modern web technologies.',
  'developer, portfolio, react, nodejs, fullstack',
  'index, follow'
) ON CONFLICT DO NOTHING;
