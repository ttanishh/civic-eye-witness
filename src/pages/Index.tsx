
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Users, Lock, Smartphone } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-civic-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Civic Eye Witness
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            A secure and anonymous platform for reporting incidents, powered by blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-civic-accent hover:bg-civic-accent/90 text-black"
              asChild
            >
              <Link to="/login">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-civic-light p-6 rounded-lg">
              <div className="bg-civic-primary inline-block p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Anonymous Reporting</h3>
              <p className="text-muted-foreground">
                Submit reports without revealing your identity. Your privacy is protected through blockchain technology.
              </p>
            </div>
            
            <div className="bg-civic-light p-6 rounded-lg">
              <div className="bg-civic-primary inline-block p-3 rounded-full mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Tracking</h3>
              <p className="text-muted-foreground">
                Follow the status of your reports as they move through the investigation process.
              </p>
            </div>
            
            <div className="bg-civic-light p-6 rounded-lg">
              <div className="bg-civic-primary inline-block p-3 rounded-full mb-4">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simple Authentication</h3>
              <p className="text-muted-foreground">
                No crypto wallet needed. Just verify your phone number to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-civic-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Verify Phone</h3>
              <p className="text-sm text-muted-foreground">
                Authenticate using your phone number with a simple verification code.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-civic-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Submit Report</h3>
              <p className="text-sm text-muted-foreground">
                Provide details about the incident, including location and description.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-civic-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Blockchain Storage</h3>
              <p className="text-sm text-muted-foreground">
                Your report is securely stored on the blockchain, ensuring immutability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-civic-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Track Status</h3>
              <p className="text-sm text-muted-foreground">
                Follow your report's status as it moves through investigation stages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-civic-primary inline-block p-3 rounded-full mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Trust & Security</h2>
            <p className="text-lg mb-6">
              Your safety and privacy are our top priorities. Our platform combines the benefits of blockchain technology with user-friendly authentication.
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <div className="bg-civic-success rounded-full p-1 mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>No personal information is publicly visible</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-civic-success rounded-full p-1 mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Reports cannot be altered or deleted</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-civic-success rounded-full p-1 mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>IP tracking for enhanced security</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-civic-success rounded-full p-1 mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Sensitive data stored off-chain with IPFS</span>
              </li>
            </ul>
            <Button size="lg" asChild>
              <Link to="/login">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-civic-dark text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Civic Eye Witness</h2>
            <p className="mb-4">A decentralized crime reporting platform</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="#how-it-works" className="hover:underline">How It Works</Link>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Use</a>
            </div>
            <p className="mt-8 text-sm text-civic-secondary">
              © 2025 Civic Eye Witness. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
