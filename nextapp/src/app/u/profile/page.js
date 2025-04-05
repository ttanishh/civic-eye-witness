
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Phone, 
  Shield, 
  Key, 
  Lock, 
  Globe, 
  LogOut, 
  Save, 
  Loader 
} from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('+919876543210');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Profile updated successfully');
    }, 1000);
  };
  
  const handleLogout = () => {
    // In a real app, you would implement logout logic here
    router.push('/auth/login');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSaveProfile}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary bg-gray-50"
                        disabled
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Phone number cannot be changed as it's used for authentication.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="gu">Gujarati</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="notifications"
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="h-4 w-4 text-civic-primary focus:ring-civic-primary border-gray-300 rounded"
                      />
                      <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                        Enable Notifications
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="darkMode"
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="h-4 w-4 text-civic-primary focus:ring-civic-primary border-gray-300 rounded"
                      />
                      <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
                        Dark Mode
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-civic-primary"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="-ml-1 mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-gray-500">{phone}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Account Type</span>
                <span className="font-medium">Citizen</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium">April 2, 2025</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-civic-primary" />
              Security
            </h2>
            
            <div className="space-y-4">
              <button className="w-full text-left py-2 px-3 flex items-center justify-between rounded-md hover:bg-gray-50">
                <div className="flex items-center">
                  <Key className="h-5 w-5 mr-2 text-gray-400" />
                  <span>Change Authentication Method</span>
                </div>
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button className="w-full text-left py-2 px-3 flex items-center justify-between rounded-md hover:bg-gray-50">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-gray-400" />
                  <span>Privacy Settings</span>
                </div>
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 flex items-center justify-between rounded-md text-red-600 hover:bg-red-50"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Log Out</span>
                </div>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
