import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests or configure specific origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Main API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/chat', chatRoutes);

// Health check and config status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: {
      supabaseConfigured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
    }
  });
});

// Root check
app.get('/', (req, res) => {
  res.send('Muhammad Hassaan Portfolio API Server is Running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  Portfolio Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
