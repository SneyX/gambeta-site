'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <>
      {isHomePage && <Navbar />}
      <main className="relative overflow-hidden">
        {children}
      </main>
      {isHomePage && <Footer />}
    </>
  )
} 