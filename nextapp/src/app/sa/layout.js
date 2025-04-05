
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  BarChart2, 
  Building2, 
  LogOut, 
  Menu,
  X,
  User,
  Bell
} from 'lucide-react';

export default function SuperAdminLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Navigation items
  const navigation = [
    { name: 'Dashboard', href: '/sa/dashboard', icon: LayoutDashboard },
    { name: 'Stations', href: '/sa/stations', icon: Building2 },
    { name: 'Reports', href: '/sa/reports', icon: FileText },
    { name: 'Analytics', href: '/sa/analytics', icon: BarChart2 },
  ];
  
  const handleSignOut = () => {
    // In a real app, you would implement signOut functionality here
    console.log('Sign out clicked');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-900 text-white shadow-sm sticky top-0 z-10">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Link href="/sa/dashboard">
                <Shield className="h-6 w-6 text-white" />
              </Link>
              <h1 className="text-xl font-bold">KAVACH SUPER ADMIN</h1>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <button className="p-2 text-gray-300 hover:text-white relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center gap-1 text-white pr-2 border-r border-gray-700">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Super Admin</span>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-1 text-gray-300 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <nav className="px-4 py-3 flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'bg-gray-700 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="flex items-center gap-2 px-3 py-2 text-white">
              <User className="h-5 w-5" />
              <span>Super Admin</span>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-left rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} KAVACH - Gujarat Police. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
