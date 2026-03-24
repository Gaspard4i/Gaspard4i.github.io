import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import PageLayout from '@/components/templates/PageLayout'
import AdminLayout from '@/components/templates/AdminLayout'
import ProtectedRoute from '@/components/templates/ProtectedRoute'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import ProjectDetail from '@/pages/ProjectDetail'
import SkillDetail from '@/pages/SkillDetail'

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminProfile = lazy(() => import('@/pages/admin/AdminProfile'))
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'))
const AdminSkills = lazy(() => import('@/pages/admin/AdminSkills'))
const AdminExperiences = lazy(() => import('@/pages/admin/AdminExperiences'))
const AdminMessages = lazy(() => import('@/pages/admin/AdminMessages'))
const AdminSoftSkills = lazy(() => import('@/pages/admin/AdminSoftSkills'))

function AppContent() {
  useTheme()
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Public */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/skills/:id" element={<SkillDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="soft-skills" element={<AdminSoftSkills />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-100" />}>
      <AppContent />
    </Suspense>
  )
}
