
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Check, Loader, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('details');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleRequestOTP = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    
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
      router.push('/u/reports');
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-civic-primary to-civic-secondary p-6 text-white">
          <h2 className="text-2xl font-bold">Create KAVACH Account</h2>
          <p className="opacity-90 mt-1">
            Your identity is protected with blockchain technology
          </p>
        </div>
        
        <div className="p-6">
          {step === 'details' ? (
            <form onSubmit={handleRequestOTP}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-civic-primary"
                  required
                />
              </div>
              
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <UserPlus className="h-5 w-5" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full text-gray-600 mt-3 text-sm py-2 hover:underline"
              >
                Back to details
              </button>
            </form>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-civic-primary hover:underline">
                Login here
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
