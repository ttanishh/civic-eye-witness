
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Check, Loader } from 'lucide-react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState('phone');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleRequestOTP = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    
    // Mock OTP sending - in a real app, you would call an API here
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };
  
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    
    if (!otpCode || otpCode.length !== 6) {
      alert('Please enter a valid verification code');
      return;
    }
    
    setIsLoading(true);
    
    // Mock verification - in a real app, you would call an API here
    setTimeout(() => {
      setIsLoading(false);
      
      // Redirect based on role (for demo purposes)
      if (phoneNumber.endsWith('0000')) {
        router.push('/sa/dashboard'); // Super admin
      } else if (phoneNumber.endsWith('1111')) {
        router.push('/a/dashboard'); // Admin
      } else {
        router.push('/u/reports'); // Regular user
      }
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-civic-primary to-civic-secondary p-6 text-white">
          <h2 className="text-2xl font-bold">Login to KAVACH</h2>
          <p className="opacity-90 mt-1">
            Your identity is protected with blockchain technology
          </p>
        </div>
        
        <div className="p-6">
          {step === 'phone' ? (
            <form onSubmit={handleRequestOTP}>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-civic-primary"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter your phone number with country code
                </p>
              </div>
              
              <div id="recaptcha-container"></div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-civic-primary text-white rounded-md py-3 font-medium flex justify-center items-center gap-2 hover:bg-civic-dark transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-civic-primary text-center text-2xl tracking-widest"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the 6-digit code sent to {phoneNumber}
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-civic-primary text-white rounded-md py-3 font-medium flex justify-center items-center gap-2 hover:bg-civic-dark transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <Check className="h-5 w-5" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-gray-600 mt-3 text-sm py-2 hover:underline"
              >
                Change phone number
              </button>
            </form>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Don't have an account yet?{' '}
              <Link href="/auth/signup" className="text-civic-primary hover:underline">
                Register here
              </Link>
            </p>
            
            <div className="text-center">
              <Link
                href="/auth/emergency"
                className="inline-flex items-center gap-1 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium hover:bg-red-100"
              >
                <Shield className="h-4 w-4" />
                <span>Emergency Reporting (No Login Required)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
