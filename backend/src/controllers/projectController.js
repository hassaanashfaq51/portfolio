import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsJsonPath = path.resolve(__dirname, '../../data/projects.json');

const getLocalProjectsFallback = () => {
  try {
    if (fs.existsSync(projectsJsonPath)) {
      const raw = fs.readFileSync(projectsJsonPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read local projects.json fallback:', err);
  }
  return [];
};

// 1. Get all projects
export const getProjects = async (req, res) => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return res.json(data);
      }
    }

    // Fallback to local data
    const localProjects = getLocalProjectsFallback();
    res.json(localProjects);
  } catch (error) {
    const localProjects = getLocalProjectsFallback();
    res.json(localProjects);
  }
};

// 2. Create a project
export const createProject = async (req, res) => {
  try {
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const { title, description, technologies, features, live_url, github_url, image_url } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required fields' });
    }

    const newProject = {
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
      features: Array.isArray(features) ? features : [],
      live_url: live_url || '',
      github_url: github_url || '',
      image_url: image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured || !supabase) {
      return res.status(500).json({ error: 'Supabase database is not configured' });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select();

    if (error || !data || data.length === 0) {
      return res.status(500).json({ error: 'Failed to create project: ' + (error?.message || 'Unknown error') });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project: ' + error.message });
  }
};

// 3. Update a project
export const updateProject = async (req, res) => {
  try {
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const { id } = req.params;
    const updates = req.body;

    if (!isSupabaseConfigured || !supabase) {
      return res.status(500).json({ error: 'Supabase database is not configured' });
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select();

    if (error || !data || data.length === 0) {
      return res.status(500).json({ error: 'Failed to update project: ' + (error?.message || 'Unknown error') });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project: ' + error.message });
  }
};

// 4. Delete a project
export const deleteProject = async (req, res) => {
  try {
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const { id } = req.params;

    if (!isSupabaseConfigured || !supabase) {
      return res.status(500).json({ error: 'Supabase database is not configured' });
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete project: ' + error.message });
    }

    res.json({ message: 'Project deleted successfully from Supabase' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project: ' + error.message });
  }
};
