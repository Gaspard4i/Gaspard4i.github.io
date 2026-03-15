import { Outlet } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import { usePageView } from '@/hooks/usePageView'

export default function PageLayout() {
  usePageView()
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
