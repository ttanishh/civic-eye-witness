
import Link from 'next/link'
import { Shield, FileText, BarChart3, Phone } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-civic-primary" />
            <h1 className="text-2xl font-bold text-civic-primary">KAVACH</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/auth" className="text-gray-600 hover:text-civic-primary">Login</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-civic-primary">About</Link></li>
              <li><Link href="/help" className="text-gray-600 hover:text-civic-primary">Help</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
                  Secure, Anonymous, <span className="text-civic-primary">Decentralized</span> Crime Reporting
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  KAVACH empowers citizens to safely report incidents with blockchain-verified privacy protection and transparency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/auth" 
                    className="px-6 py-3 bg-civic-primary text-white rounded-md text-center font-medium hover:bg-civic-dark transition-colors"
                  >
                    Report a Crime
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md text-center font-medium hover:bg-gray-50 transition-colors"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/hero-image.jpg" 
                  alt="KAVACH Crime Reporting" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/3b82f6/FFFFFF?text=KAVACH';
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-civic-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-civic-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                <p className="text-gray-600">
                  Verify your identity with phone number authentication. Your personal information is encrypted and protected.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-civic-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-civic-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Reports</h3>
                <p className="text-gray-600">
                  Provide details of incidents with optional evidence. All data is securely stored on the blockchain.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-civic-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-civic-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Follow the status of your reports as they move through investigation and resolution.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="bg-civic-primary text-white rounded-xl p-8 md:p-12 shadow-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Powered by Blockchain Technology</h2>
                <p className="text-lg mb-8">
                  KAVACH uses decentralized blockchain technology to ensure that your reports cannot be tampered with or deleted, while still protecting your personal information.
                </p>
                <Link 
                  href="/about" 
                  className="px-6 py-3 bg-white text-civic-primary rounded-md inline-block font-medium hover:bg-opacity-90 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <h3 className="font-bold text-xl">KAVACH</h3>
              </div>
              <p className="text-gray-300">
                Empowering citizens with secure and anonymous crime reporting.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/auth" className="text-gray-300 hover:text-white">Report Crime</Link></li>
                <li><Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
                <li><Link href="/statistics" className="text-gray-300 hover:text-white">Statistics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Emergency</h4>
              <p className="text-gray-300 mb-2">
                For immediate assistance, please contact your local emergency services.
              </p>
              <p className="font-bold">Emergency: 911</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} KAVACH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
