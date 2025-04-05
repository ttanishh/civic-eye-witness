
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Lock, 
  Save, 
  Edit2,
  AlertTriangle,
  ArrowLeft,
  Bell,
  BellOff,
  Loader
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    notificationsEnabled: true,
    profileCompleted: false
  });
  
  useEffect(() => {
    // Simulate API fetch delay
    const fetchProfileData = async () => {
      setIsLoading(true);
      
      try {
        // Mock data - in a real app, this would come from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          fullName: 'Amrit Patel',
          phoneNumber: '+919876543210',
          email: 'amrit.patel@example.com',
          address: 'Sector 12, Gandhinagar, Gujarat',
          notificationsEnabled: true,
          profileCompleted: true
        };
        
        setProfileData(mockData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !profileData.fullName) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader className="h-8 w-8 animate-spin text-civic-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600">Manage your personal information and settings</p>
        </div>
        
        <Link
          href="/u/dashboard"
          className="flex items-center text-gray-600 hover:text-civic-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-civic-primary hover:underline"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  <span>Edit</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      } border focus:border-civic-primary focus:ring-civic-primary`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={true} // Phone number cannot be changed as it's the login ID
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-gray-50 border"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Phone number cannot be changed as it's used for authentication
                  </p>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      } border focus:border-civic-primary focus:ring-civic-primary`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Home Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      } border focus:border-civic-primary focus:ring-civic-primary`}
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notificationsEnabled"
                    name="notificationsEnabled"
                    checked={profileData.notificationsEnabled}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-civic-primary focus:ring-civic-primary border-gray-300 rounded"
                  />
                  <label htmlFor="notificationsEnabled" className="ml-2 block text-sm text-gray-700">
                    Enable notifications for report updates
                  </label>
                </div>
                
                {isEditing && (
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-civic-primary"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="animate-spin h-4 w-4 mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        
        {/* Right column - Security and additional options */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Account Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm">Change PIN</span>
                </div>
                <button className="text-civic-primary text-sm hover:underline">
                  Update
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm">Two-Factor Authentication</span>
                </div>
                <button className="text-civic-primary text-sm hover:underline">
                  Enable
                </button>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {profileData.notificationsEnabled ? (
                      <Bell className="h-5 w-5 text-gray-500 mr-2" />
                    ) : (
                      <BellOff className="h-5 w-5 text-gray-500 mr-2" />
                    )}
                    <span className="text-sm">Notification Settings</span>
                  </div>
                  <button className="text-civic-primary text-sm hover:underline">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
            
            <div className="space-y-4">
              <button className="flex items-center text-red-600 hover:text-red-800">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm">Delete Account</span>
              </button>
              
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="text-sm">Download My Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
