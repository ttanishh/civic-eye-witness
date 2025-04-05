
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, FileText, BarChart3, LogOut, Menu, X, User } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { signOut } from '@/lib/auth'
import { toast } from 'sonner'

export default function UserLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
      
      if (!user) {
        router.push('/auth')
      }
    })
    
    return () => unsubscribe()
  }, [router])
  
  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to sign out')
      console.error(error)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-civic-primary" />
              <h1 className="text-xl font-bold text-civic-primary">KAVACH</h1>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/u/dashboard" className="text-gray-600 hover:text-civic-primary">
                Dashboard
              </Link>
              <Link href="/u/report" className="text-gray-600 hover:text-civic-primary">
                New Report
              </Link>
              <Link href="/u/my-reports" className="text-gray-600 hover:text-civic-primary">
                My Reports
              </Link>
              <Link href="/u/statistics" className="text-gray-600 hover:text-civic-primary">
                Statistics
              </Link>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-1 text-gray-600 hover:text-civic-primary"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              href="/u/dashboard" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/u/report" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Report
            </Link>
            <Link 
              href="/u/my-reports" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Reports
            </Link>
            <Link 
              href="/u/statistics" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Statistics
            </Link>
            <button 
              onClick={handleSignOut}
              className="px-3 py-2 text-left rounded-md hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} KAVACH. All rights reserved.</p>
          <p className="mt-1">Powered by blockchain technology for your privacy and security.</p>
        </div>
      </footer>
    </div>
  )
}
