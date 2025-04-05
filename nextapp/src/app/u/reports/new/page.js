
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Camera, 
  Upload, 
  FileType, 
  AlertTriangle, 
  Send, 
  ChevronLeft,
  User,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export default function NewReportPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgencyLevel: '3',
    witnesses: [],
    location: null
  });
  const [files, setFiles] = useState([]);
  const [newWitness, setNewWitness] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const detectLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // In a real app, you would reverse geocode to get the address
          const location = { 
            latitude, 
            longitude, 
            address: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}` 
          };
          
          setFormData(prev => ({ ...prev, location }));
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
  
  const addWitness = () => {
    if (newWitness.trim()) {
      setFormData(prev => ({
        ...prev,
        witnesses: [...prev.witnesses, { id: Date.now(), description: newWitness.trim() }]
      }));
      setNewWitness('');
    }
  };
  
  const removeWitness = (id) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter(witness => witness.id !== id)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please provide a title for your report');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Please provide a description of the incident');
      return;
    }
    
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }
    
    if (!formData.location) {
      toast.error('Please detect your location before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, this would submit the report to the blockchain
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Report submitted successfully');
      
      // Redirect to reports list
      router.push('/u/reports');
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Clean up file previews on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-600 hover:text-civic-primary"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold ml-4">Submit New Report</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Report Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Briefly describe the incident"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="theft">Theft</option>
                  <option value="assault">Assault</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="fraud">Fraud</option>
                  <option value="harassment">Harassment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Provide as much detail as possible about what happened..."
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  required
                ></textarea>
              </div>
            </div>
            
            <div>
              <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level
              </label>
              <select
                id="urgencyLevel"
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
              >
                <option value="1">Low (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Medium (3)</option>
                <option value="4">High (4)</option>
                <option value="5">Critical (5)</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Select the appropriate urgency level for this incident
              </p>
            </div>
            
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
                ) : formData.location ? (
                  <span className="text-left">
                    {formData.location.address}
                  </span>
                ) : (
                  <span>Detect my current location</span>
                )}
              </button>
              <p className="mt-1 text-xs text-gray-500">
                This helps us assign your report to the correct police station
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Evidence (Photos/Videos/Documents)
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
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {files.map(file => (
                    <div key={file.id} className="relative border border-gray-200 rounded-md p-2">
                      {file.type === 'image' ? (
                        <div>
                          <img src={file.preview} alt="Preview" className="h-24 w-full object-cover rounded" />
                          <div className="flex items-center mt-1 text-xs">
                            <Camera className="h-3 w-3 mr-1" />
                            <span className="truncate">{file.file.name}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-24 bg-gray-100 rounded">
                          <FileType className="h-10 w-10 text-gray-400" />
                          <span className="text-xs mt-1 text-gray-500 truncate w-full text-center px-2">{file.file.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="absolute top-1 right-1 bg-red-100 rounded-full p-1 text-red-500 hover:bg-red-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Witnesses (Optional)
              </label>
              <div className="flex items-start mb-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Witness name or description"
                    value={newWitness}
                    onChange={(e) => setNewWitness(e.target.value)}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={addWitness}
                  className="ml-2 bg-civic-primary text-white px-4 py-3 rounded-md hover:bg-civic-dark transition-colors"
                >
                  Add
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 mb-3">
                Add details of any witnesses to the incident
              </p>
              
              {formData.witnesses.length > 0 && (
                <div className="space-y-2">
                  {formData.witnesses.map(witness => (
                    <div key={witness.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{witness.description}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeWitness(witness.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-civic-primary text-white py-3 px-6 rounded-md hover:bg-civic-dark transition-colors flex items-center justify-center sm:w-auto w-full"
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
                    Submit Report
                    <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/u/dashboard')}
                className="border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors sm:w-auto w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
