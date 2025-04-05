
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-civic-primary" />
            <h1 className="text-xl font-bold text-civic-primary">KAVACH</h1>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} KAVACH - Gujarat Police. All rights reserved.</p>
      </footer>
    </div>
  );
}
