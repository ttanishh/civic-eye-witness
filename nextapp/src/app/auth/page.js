
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ArrowRight, Check, Loader } from 'lucide-react'
import { toast } from 'sonner'
import { auth } from '@/lib/firebase'
import { initRecaptcha, sendOTP, verifyOTP } from '@/lib/auth'

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [step, setStep] = useState('phone')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    // Initialize recaptcha
    initRecaptcha('recaptcha-container')
    
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/u/dashboard')
      }
    })
    
    return () => unsubscribe()
  }, [router])
  
  const handleRequestOTP = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Format phone number with international code if not already formatted
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`
      
      const result = await sendOTP(formattedPhone)
      
      if (result.success) {
        toast.success('Verification code sent!', {
          description: 'Please check your phone for the code.'
        })
        setStep('otp')
      } else {
        toast.error('Failed to send verification code', {
          description: result.error || 'Please try again later.'
        })
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      toast.error('Something went wrong', {
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    
    if (!otpCode || otpCode.length !== 6) {
      toast.error('Please enter a valid verification code')
      return
    }
    
    setIsLoading(true)
    
    try {
      const result = await verifyOTP(otpCode)
      
      if (result.success) {
        toast.success('Successfully authenticated!', {
          description: 'Redirecting to dashboard...'
        })
        router.push('/u/dashboard')
      } else {
        toast.error('Invalid verification code', {
          description: result.error || 'Please try again.'
        })
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      toast.error('Something went wrong', {
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-civic-primary" />
            <h1 className="text-xl font-bold text-civic-primary">KAVACH</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-civic-primary to-civic-secondary p-6 text-white">
              <h2 className="text-2xl font-bold">Secure Authentication</h2>
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
                        <span>Verify</span>
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
                <p className="text-sm text-gray-600">
                  Your phone number is securely hashed and stored on the blockchain. It is never exposed publicly or stored in plaintext.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
