
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Loader, 
  AlertTriangle, 
  Camera, 
  FileText,
  ShieldAlert 
} from 'lucide-react';
import MapPicker from '@/components/MapPicker';
import MediaUploader from '@/components/MediaUploader';

export default function NewReportPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('theft');
  const [location, setLocation] = useState(null);
  const [urgencyLevel, setUrgencyLevel] = useState(2);
  const [media, setMedia] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleLocationSelect = (loc) => {
    setLocation(loc);
  };
  
  const handleMediaUpload = (files) => {
    setMedia(files);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !location) {
      alert('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call - in a real app, you would upload to blockchain here
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/u/reports');
    }, 2000);
  };
  
  const getUrgencyLabel = (level) => {
    switch (level) {
      case 1: return 'Low (Not time-sensitive)';
      case 2: return 'Medium-Low';
      case 3: return 'Medium (Standard priority)';
      case 4: return 'Medium-High';
      case 5: return 'High (Urgent attention needed)';
      default: return 'Medium (Standard priority)';
    }
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/u/reports"
          className="mr-4 inline-flex items-center text-gray-600 hover:text-civic-primary"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold">Submit New Report</h1>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Important:</span> For emergencies requiring immediate attention, please{' '}
              <Link href="/auth/emergency" className="font-medium underline">
                file an emergency report
              </Link>{' '}
              or call 112 directly.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Report Details</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Report Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title describing the incident"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                required
              >
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="fraud">Fraud</option>
                <option value="harassment">Harassment</option>
                <option value="traffic">Traffic Violation</option>
                <option value="public_nuisance">Public Nuisance</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of what happened"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                required
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                Please include relevant details such as when it happened, who was involved, and any other important information.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgencyLevel(level)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      urgencyLevel === level 
                        ? level <= 2 
                          ? "bg-green-500 text-white" 
                          : level >= 4 
                            ? "bg-red-500 text-white" 
                            : "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {getUrgencyLabel(urgencyLevel)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Location Details</h2>
          
          <MapPicker 
            onLocationSelect={handleLocationSelect}
            initialLocation={null}
          />
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Evidence</h2>
          
          <MediaUploader 
            onUpload={handleMediaUpload} 
            maxFiles={5}
          />
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Supported file types: Images (JPG, PNG), Videos (MP4), Documents (PDF)</p>
            <p>Maximum size: 10MB per file</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-civic-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            <span className="font-medium">Privacy Notice:</span> Your identity is protected. Report details will be stored securely on the blockchain, and personal information will not be publicly visible. Location data will only be shared with authorized law enforcement personnel.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link
            href="/u/reports"
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors text-center"
          >
            Cancel
          </Link>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 bg-civic-primary text-white rounded-md hover:bg-civic-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
