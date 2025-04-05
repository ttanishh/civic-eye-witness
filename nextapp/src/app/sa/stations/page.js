
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  Plus,
  MoreHorizontal,
  Users,
  FileText,
  Edit,
  ChevronDown
} from 'lucide-react';

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const router = useRouter();
  
  useEffect(() => {
    // Mock API call to fetch stations
    const fetchStations = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockStations = [
          {
            id: '1',
            name: 'Bopal Police Station',
            district: 'Ahmedabad',
            address: 'Near Bopal Circle, Bopal, Ahmedabad',
            officerCount: 42,
            activeReports: 27,
            totalReports: 156,
            resolutionRate: 85,
            contactNumber: '+91 79 2717 1234',
            headOfficer: 'PI R.K. Patel',
          },
          {
            id: '2',
            name: 'Vastrapur Police Station',
            district: 'Ahmedabad',
            address: 'Near Vastrapur Lake, Vastrapur, Ahmedabad',
            officerCount: 38,
            activeReports: 31,
            totalReports: 142,
            resolutionRate: 82,
            contactNumber: '+91 79 2631 5678',
            headOfficer: 'PI M.S. Singh',
          },
          {
            id: '3',
            name: 'Satellite Police Station',
            district: 'Ahmedabad',
            address: 'Satellite Road, Ahmedabad',
            officerCount: 35,
            activeReports: 24,
            totalReports: 128,
            resolutionRate: 80,
            contactNumber: '+91 79 2676 9012',
            headOfficer: 'PI A.K. Sharma',
          },
          {
            id: '4',
            name: 'Vadaj Police Station',
            district: 'Ahmedabad',
            address: 'Vadaj, Ahmedabad',
            officerCount: 32,
            activeReports: 18,
            totalReports: 98,
            resolutionRate: 78,
            contactNumber: '+91 79 2321 3456',
            headOfficer: 'PI S.J. Patel',
          },
          {
            id: '5',
            name: 'Varachha Police Station',
            district: 'Surat',
            address: 'Varachha Road, Surat',
            officerCount: 45,
            activeReports: 35,
            totalReports: 165,
            resolutionRate: 76,
            contactNumber: '+91 261 221 5678',
            headOfficer: 'PI K.R. Shah',
          },
          {
            id: '6',
            name: 'Athwa Police Station',
            district: 'Surat',
            address: 'Athwa Lines, Surat',
            officerCount: 42,
            activeReports: 28,
            totalReports: 145,
            resolutionRate: 81,
            contactNumber: '+91 261 234 9012',
            headOfficer: 'PI P.M. Desai',
          },
          {
            id: '7',
            name: 'Kalavad Road Police Station',
            district: 'Rajkot',
            address: 'Kalavad Road, Rajkot',
            officerCount: 36,
            activeReports: 22,
            totalReports: 112,
            resolutionRate: 79,
            contactNumber: '+91 281 245 3456',
            headOfficer: 'PI D.S. Jadeja',
          },
          {
            id: '8',
            name: 'GIDC Police Station',
            district: 'Vadodara',
            address: 'GIDC Area, Vadodara',
            officerCount: 34,
            activeReports: 25,
            totalReports: 120,
            resolutionRate: 77,
            contactNumber: '+91 265 232 7890',
            headOfficer: 'PI N.V. Modi',
          },
        ];
        
        setStations(mockStations);
      } catch (error) {
        console.error('Error fetching stations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStations();
  }, []);
  
  const filteredStations = stations.filter(station => {
    // Apply district filter
    if (districtFilter !== 'all' && station.district !== districtFilter) {
      return false;
    }
    
    // Apply search filter (case insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        station.name.toLowerCase().includes(query) ||
        station.district.toLowerCase().includes(query) ||
        station.address.toLowerCase().includes(query) ||
        station.headOfficer.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const districts = [...new Set(stations.map(station => station.district))];
  
  const handleStationClick = (id) => {
    router.push(`/sa/stations/${id}`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Police Stations Management</h1>
        <Link 
          href="/sa/stations/new"
          className="inline-flex items-center gap-1 bg-civic-primary text-white px-4 py-2 rounded-md hover:bg-civic-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Station</span>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search stations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-civic-primary focus:border-transparent"
          />
        </div>
        
        <div className="w-full md:w-auto flex">
          <div className="relative inline-block w-full md:w-auto">
            <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-transparent w-full appearance-none focus:outline-none pr-8"
              >
                <option value="all">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
        </div>
      ) : filteredStations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div 
              key={station.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleStationClick(station.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">{station.name}</h2>
                  <button 
                    className="text-gray-400 hover:text-gray-600 p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // In a real app, this would open a dropdown menu
                      alert('Options menu would open here');
                    }}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{station.address}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs mb-1">Officers</div>
                    <div className="font-semibold flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{station.officerCount}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs mb-1">Active Cases</div>
                    <div className="font-semibold flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{station.activeReports}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs mb-1">Total Reports</div>
                    <div className="font-semibold">{station.totalReports}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs mb-1">Resolution Rate</div>
                    <div className="font-semibold">{station.resolutionRate}%</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    <span className="font-medium">{station.district} District</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">{station.headOfficer}</span>
                <Link 
                  href={`/sa/stations/${station.id}/edit`}
                  className="text-civic-primary hover:text-civic-dark"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Building2 className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stations found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || districtFilter !== 'all'
              ? "No stations match your current filters. Try changing your search criteria."
              : "No police stations have been added to the system yet."}
          </p>
          <Link
            href="/sa/stations/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark transition-colors"
          >
            Add New Station
          </Link>
        </div>
      )}
    </div>
  );
}
