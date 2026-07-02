import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import CustomCursor from './components/ui/CustomCursor'
import LoadingScreen from './components/ui/LoadingScreen'
import { Suspense, lazy, useState, useEffect } from 'react'

// Public Pages
import MainLayout from './layouts/MainLayout'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Services = lazy(() => import('./pages/Services'))
const Skills = lazy(() => import('./pages/Skills'))
const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin Pages
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminProjects = lazy(() => import('./pages/admin/Projects'))
const AdminServices = lazy(() => import('./pages/admin/Services'))
const AdminSkills = lazy(() => import('./pages/admin/Skills'))
const AdminEducation = lazy(() => import('./pages/admin/Education'))
const AdminExperience = lazy(() => import('./pages/admin/Experience'))
const AdminTestimonials = lazy(() => import('./pages/admin/Testimonials'))
const AdminMessages = lazy(() => import('./pages/admin/Messages'))
const AdminHero = lazy(() => import('./pages/admin/Hero'))
const AdminAbout = lazy(() => import('./pages/admin/About'))
const AdminResume = lazy(() => import('./pages/admin/Resume'))
const AdminSocial = lazy(() => import('./pages/admin/Social'))
const AdminSEO = lazy(() => import('./pages/admin/SEO'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <CustomCursor />
          <Suspense fallback={<LoadingScreen minimal />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="hero" element={<AdminHero />} />
                <Route path="about" element={<AdminAbout />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="education" element={<AdminEducation />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="resume" element={<AdminResume />} />
                <Route path="social" element={<AdminSocial />} />
                <Route path="seo" element={<AdminSEO />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </DataProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
