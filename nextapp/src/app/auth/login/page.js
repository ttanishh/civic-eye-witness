
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Phone, ArrowRight, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, this would send OTP to the phone
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move to OTP verification step
      setStep('otp');
      toast.success('OTP sent to your phone');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus to next input field after entry
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, this would verify the OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard on successful login
      toast.success('Login successful');
      router.push('/u/dashboard');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-civic-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to KAVACH</h1>
          <p className="text-gray-600 mt-1">Secure crime reporting platform</p>
        </div>
        
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">We'll send a verification code to this number</p>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-civic-primary text-white py-3 px-4 rounded-md hover:bg-civic-dark transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                <span className="flex items-center">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Verification Code
              </label>
              <p className="text-xs text-gray-500 mb-3">
                A 6-digit code has been sent to {phoneNumber}
              </p>
              
              <div className="flex justify-between mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent text-lg"
                    required
                  />
                ))}
              </div>
              
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-civic-primary hover:underline"
                >
                  Change Number
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.info('Resending OTP...');
                    setTimeout(() => toast.success('OTP sent again!'), 1000);
                  }}
                  className="text-civic-primary hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-civic-primary text-white py-3 px-4 rounded-md hover:bg-civic-dark transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  Verify & Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-civic-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-red-500">Emergency?</span>
          </div>
          <Link
            href="/auth/emergency"
            className="mt-2 block w-full text-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Report Emergency (No Login Required)
          </Link>
        </div>
      </div>
    </div>
  );
}
