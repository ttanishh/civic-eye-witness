
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Phone, MapPin, Loader, ArrowRight } from 'lucide-react';
import MapPicker from '@/components/MapPicker';

export default function EmergencyReportPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [emergencyType, setEmergencyType] = useState('assault');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || !description || !location) {
      alert('Please fill all the required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call - in a real app, you would call an API here
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/auth/emergency/success');
    }, 2000);
  };
  
  const handleLocationSelect = (loc) => {
    setLocation(loc);
  };
  
  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-red-600 p-6 text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Emergency Report</h2>
          </div>
          <p className="opacity-90 mt-1">
            Submit urgent report - help is on the way
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm">
            <p className="font-medium">This is for emergencies requiring immediate attention.</p>
            <p className="mt-1">For non-emergency situations, please <Link href="/auth/login" className="underline">log in</Link> to file a standard report.</p>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Your Phone Number
            </label>
            <div className="flex">
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+919876543210"
                className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <div className="bg-gray-100 flex items-center justify-center px-4 border-y border-r border-gray-300 rounded-r-md">
                <Phone className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              This will be used to contact you about the emergency
            </p>
          </div>
          
          <div>
            <label htmlFor="emergencyType" className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Type
            </label>
            <select
              id="emergencyType"
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="assault">Assault/Violence</option>
              <option value="accident">Accident</option>
              <option value="medical">Medical Emergency</option>
              <option value="fire">Fire</option>
              <option value="theft">Theft/Robbery in Progress</option>
              <option value="other">Other Emergency</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              What's happening? (Brief description)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the emergency situation..."
              rows={3}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            ></textarea>
          </div>
          
          <div>
            <MapPicker 
              onLocationSelect={handleLocationSelect}
              initialLocation={null}
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white rounded-md py-3 font-medium flex justify-center items-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Sending Emergency Report...</span>
                </>
              ) : (
                <>
                  <span>Submit Emergency Report</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
