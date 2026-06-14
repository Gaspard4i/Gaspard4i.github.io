import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
// Wiki Minecraft mods : routes désactivées tant que la documentation n'est pas finalisée.
// import Wiki from '@/pages/Wiki'
// import WikiCategory from '@/pages/WikiCategory'
// import WikiModDetail from '@/pages/WikiModDetail'

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminProfile = lazy(() => import('@/pages/admin/AdminProfile'))
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'))
const AdminSkills = lazy(() => import('@/pages/admin/AdminSkills'))
const AdminExperiences = lazy(() => import('@/pages/admin/AdminExperiences'))
const AdminMessages = lazy(() => import('@/pages/admin/AdminMessages'))
const AdminSoftSkills = lazy(() => import('@/pages/admin/AdminSoftSkills'))
const AdminHeroRoles = lazy(() => import('@/pages/admin/AdminHeroRoles'))
const AdminTranslations = lazy(() => import('@/pages/admin/AdminTranslations'))

const SuiviLayout = lazy(() => import('@/components/templates/SuiviLayout'))
const SuiviLogin = lazy(() => import('@/pages/suivi/SuiviLogin'))
const SuiviDashboard = lazy(() => import('@/pages/suivi/SuiviDashboard'))
const SuiviItems = lazy(() => import('@/pages/suivi/SuiviItems'))
const SuiviEmails = lazy(() => import('@/pages/suivi/SuiviEmails'))
const SuiviImport = lazy(() => import('@/pages/suivi/SuiviImport'))
const SuiviInfos = lazy(() => import('@/pages/suivi/SuiviInfos'))
const SuiviProgress = lazy(() => import('@/pages/suivi/SuiviProgress'))

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
          {/* Wiki Minecraft mods : routes désactivées tant que la documentation n'est pas finalisée.
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:categoryId" element={<WikiCategory />} />
          <Route path="/wiki/:categoryId/:modId" element={<WikiModDetail />} />
          <Route path="/wiki/:categoryId/:modId/:sectionId" element={<WikiModDetail />} />
          */}
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
          <Route path="hero-roles" element={<AdminHeroRoles />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="translations" element={<AdminTranslations />} />
        </Route>

        {/* Suivi alternance (espace privé dédié) */}
        <Route path="/suivi-alternance/login" element={<SuiviLogin />} />
        <Route path="/suivi-alternance/avancement" element={<SuiviProgress />} />
        <Route
          path="/suivi-alternance"
          element={
            <ProtectedRoute redirectTo="/suivi-alternance/login">
              <SuiviLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuiviDashboard />} />
          <Route path="candidatures" element={<SuiviItems />} />
          <Route path="offres" element={<Navigate to="/suivi-alternance/candidatures" replace />} />
          <Route path="prospection" element={<Navigate to="/suivi-alternance/candidatures" replace />} />
          <Route path="emails" element={<SuiviEmails />} />
          <Route path="infos" element={<SuiviInfos />} />
          <Route path="import" element={<SuiviImport />} />
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
