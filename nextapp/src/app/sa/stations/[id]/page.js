
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Save, 
  Trash2, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users,
  User,
  FileText,
  CheckCircle,
  Loader
} from 'lucide-react';
import { toast } from 'sonner';

export default function StationDetailPage() {
  const [station, setStation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    address: '',
    contactNumber: '',
    email: '',
    headOfficer: '',
    jurisdiction: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();
  const router = useRouter();
  
  useEffect(() => {
    const fetchStationDetails = async () => {
      setIsLoading(true);
      
      try {
        // Mock API call - in a real app, this would fetch from a database
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const stationData = {
          id: params.id,
          name: 'Bopal Police Station',
          district: 'Ahmedabad',
          address: 'Near Bopal Circle, Bopal, Ahmedabad',
          contactNumber: '+91 79 2717 1234',
          email: 'bopal.ps@gujaratpolice.gov.in',
          headOfficer: 'PI R.K. Patel',
          jurisdiction: 'Bopal, South Bopal, Ghuma, Ambli',
          officerCount: 42,
          activeReports: 27,
          totalReports: 156,
          resolutionRate: 85,
          coordinates: {
            latitude: 23.0225,
            longitude: 72.5714
          }
        };
        
        setStation(stationData);
        setFormData({
          name: stationData.name,
          district: stationData.district,
          address: stationData.address,
          contactNumber: stationData.contactNumber,
          email: stationData.email,
          headOfficer: stationData.headOfficer,
          jurisdiction: stationData.jurisdiction
        });
      } catch (error) {
        console.error('Error fetching station details:', error);
        toast.error('Failed to load station details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStationDetails();
  }, [params.id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Mock API call - in a real app, this would update the station details
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setStation(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      toast.success('Station details updated successfully');
    } catch (error) {
      console.error('Error updating station:', error);
      toast.error('Failed to update station details');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this police station? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Mock API call - in a real app, this would delete the station
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Police station deleted successfully');
      router.push('/sa/stations');
    } catch (error) {
      console.error('Error deleting station:', error);
      toast.error('Failed to delete police station');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-civic-primary" />
      </div>
    );
  }
  
  if (!station) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800">Station not found</h2>
        <p className="text-gray-600 mt-2">The requested police station could not be found.</p>
        <button
          onClick={() => router.push('/sa/stations')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Stations
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.push('/sa/stations')}
            className="mr-4 text-gray-600 hover:text-civic-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">{station.name}</h1>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark"
          >
            Edit Station
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Station Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Station Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="headOfficer" className="block text-sm font-medium text-gray-700 mb-1">
                        Head Officer
                      </label>
                      <input
                        type="text"
                        id="headOfficer"
                        name="headOfficer"
                        value={formData.headOfficer}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
                        Jurisdiction Areas
                      </label>
                      <input
                        type="text"
                        id="jurisdiction"
                        name="jurisdiction"
                        value={formData.jurisdiction}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-4">Location on Map</h2>
                  
                  <div className="bg-gray-100 aspect-video rounded-lg border border-gray-200 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Map with station location would be shown here</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Coordinates: {station.coordinates?.latitude}, {station.coordinates?.longitude}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-civic-primary"
                  >
                    {isSaving ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="-ml-1 mr-2 h-4 w-4" />
                        Save Changes
                      </span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Station Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Building2 className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Station Name</h3>
                        <p className="mt-1">{station.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p className="mt-1">{station.address}</p>
                        <p className="text-sm text-gray-500">
                          District: {station.district}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                        <p className="mt-1">{station.contactNumber}</p>
                        <p className="text-sm text-gray-500">{station.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Head Officer</h3>
                        <p className="mt-1">{station.headOfficer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Jurisdiction Areas</h3>
                        <p className="mt-1">{station.jurisdiction}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mt-6 mb-4">Location on Map</h2>
                  
                  <div className="bg-gray-100 aspect-video rounded-lg border border-gray-200 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Map with station location would be shown here</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Coordinates: {station.coordinates?.latitude}, {station.coordinates?.longitude}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Station Overview</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-full mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">{station.officerCount}</h3>
                    <p className="text-sm text-gray-500">Officers</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 p-1.5 bg-amber-100 text-amber-600 rounded-full mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">{station.activeReports}</h3>
                    <p className="text-sm text-gray-500">Active Cases</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 p-1.5 bg-green-100 text-green-600 rounded-full mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">{station.resolutionRate}%</h3>
                    <p className="text-sm text-gray-500">Resolution Rate</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 p-1.5 bg-gray-100 text-gray-600 rounded-full mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">{station.totalReports}</h3>
                    <p className="text-sm text-gray-500">Total Reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center">
                <Users className="h-5 w-5 text-civic-primary mr-2" />
                <span>Manage Officers</span>
              </button>
              
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center">
                <FileText className="h-5 w-5 text-civic-primary mr-2" />
                <span>View Reports</span>
              </button>
              
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center">
                <MapPin className="h-5 w-5 text-civic-primary mr-2" />
                <span>Edit Jurisdiction</span>
              </button>
              
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center">
                <Mail className="h-5 w-5 text-civic-primary mr-2" />
                <span>Contact Station</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
