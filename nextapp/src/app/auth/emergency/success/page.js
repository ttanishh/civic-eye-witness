
import Link from 'next/link';
import { CheckCircle, PhoneCall, ArrowLeft } from 'lucide-react';

export default function EmergencySuccessPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Report Received</h2>
          </div>
          <p className="opacity-90 mt-1">
            Emergency services have been notified
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Your emergency report has been submitted
            </h3>
            <p className="text-gray-600 text-center">
              A responder will contact you shortly
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="bg-green-100 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>Emergency services are being dispatched to your location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-green-100 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>You'll receive a call from emergency services for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-green-100 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Stay at your location if it's safe to do so until help arrives</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-2 pt-4">
            <a
              href="tel:112"
              className="w-full bg-red-600 text-white rounded-md py-3 font-medium flex justify-center items-center gap-2 hover:bg-red-700 transition-colors"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call Emergency Services (112)</span>
            </a>
            
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 rounded-md py-3 font-medium flex justify-center items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
