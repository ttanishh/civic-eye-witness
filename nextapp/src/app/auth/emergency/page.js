
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, MapPin, Phone, Upload, Camera, FileType, AlertTriangle, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function EmergencyReportPage() {
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [description, setDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const detectLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          toast.success('Location detected successfully');
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Failed to detect location. Please try again.');
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
      setIsLocating(false);
    }
  };
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length > 0) {
      const newFiles = selectedFiles.map(file => ({
        id: Math.random().toString(36).substring(2),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'document'
      }));
      
      setFiles([...files, ...newFiles]);
      toast.success(`${selectedFiles.length} file(s) added`);
    }
  };
  
  const removeFile = (id) => {
    const fileToRemove = files.find(file => file.id === id);
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFiles(files.filter(file => file.id !== id));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      toast.error('Please detect your location before submitting');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Please provide a brief description of the emergency');
      return;
    }
    
    if (!contactPhone.trim()) {
      toast.error('Please provide a contact phone number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, this would submit the emergency report
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Emergency reported successfully');
      
      // Redirect to a confirmation page
      router.push('/auth/emergency/confirmation');
    } catch (error) {
      toast.error('Failed to submit emergency report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Emergency Reporting</h1>
          <p className="text-red-600 mt-1 font-medium">No login required for emergencies</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
              </label>
              <button
                type="button"
                onClick={detectLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-gray-50 rounded-md py-3 px-4 hover:bg-gray-100 transition-colors"
              >
                <MapPin className="h-5 w-5 text-gray-500" />
                {isLocating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Detecting location...
                  </span>
                ) : location ? (
                  <span>
                    Location detected (Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)})
                  </span>
                ) : (
                  <span>Detect my current location</span>
                )}
              </button>
              <p className="mt-1 text-xs text-gray-500">This helps us identify the nearest police station</p>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Briefly describe what's happening..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contact"
                  type="tel"
                  placeholder="9876543210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">We'll use this to contact you if needed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Photos/Videos (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-civic-primary hover:text-civic-dark">
                      <span>Upload files</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file"
                        accept="image/*,video/*,.pdf,.doc,.docx" 
                        multiple 
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, MP4, PDF up to 10MB
                  </p>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {files.map(file => (
                    <div key={file.id} className="relative border border-gray-200 rounded-md p-2">
                      {file.type === 'image' ? (
                        <div>
                          <img src={file.preview} alt="Preview" className="h-20 w-full object-cover rounded" />
                          <div className="flex items-center mt-1 text-xs">
                            <Camera className="h-3 w-3 mr-1" />
                            <span className="truncate">{file.file.name}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-20 bg-gray-100 rounded">
                          <FileType className="h-8 w-8 text-gray-400" />
                          <span className="text-xs mt-1 text-gray-500 truncate w-full text-center">{file.file.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="absolute top-1 right-1 bg-red-100 rounded-full p-1 text-red-500 hover:bg-red-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center font-medium">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Submit Emergency Report
                  <Send className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
            
            <Link
              href="/auth/login"
              className="block w-full text-center border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
