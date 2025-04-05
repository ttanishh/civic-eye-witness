
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Calendar, 
  Tag, 
  MapPin, 
  Clock,
  ChevronDown,
  User,
  Building2
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function SuperAdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    date: 'all',
    district: 'all',
    station: 'all',
  });
  const router = useRouter();
  
  useEffect(() => {
    // Mock API call to fetch reports
    const fetchReports = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockReports = Array.from({ length: 20 }, (_, i) => {
          const statuses = ['new', 'in_review', 'assigned', 'resolved', 'closed'];
          const categories = ['theft', 'assault', 'vandalism', 'fraud', 'harassment', 'other'];
          const locations = [
            'Vegetable Market, Ahmedabad',
            'City Park, Ahmedabad',
            'Residential Colony, Sector 7, Gandhinagar',
            'NH 48, Near Toll Plaza',
            'Shopping Mall, CG Road',
          ];
          const titles = [
            'Theft at Market Area',
            'Vandalism in Park',
            'Suspicious Person Sighting',
            'Accident on Highway',
            'Harassment Case',
            'Fraud Report',
            'Shop Breaking',
            'Vehicle Damage',
          ];
          const districts = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'];
          const stations = [
            'Bopal Police Station',
            'Vastrapur Police Station',
            'Satellite Police Station',
            'Gandhinagar Sector 7 Police Station',
            'Kalavad Road Police Station',
          ];
          
          // Generate random date within the last 30 days
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          const district = districts[Math.floor(Math.random() * districts.length)];
          
          return {
            id: `${i + 1}`,
            title: titles[Math.floor(Math.random() * titles.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            status,
            timestamp: date.toISOString(),
            location: {
              address: locations[Math.floor(Math.random() * locations.length)],
              latitude: 23.022505 + (Math.random() * 0.1 - 0.05),
              longitude: 72.571365 + (Math.random() * 0.1 - 0.05),
            },
            reportedBy: '+91' + Math.floor(Math.random() * 9000000000 + 1000000000),
            district,
            station: stations[Math.floor(Math.random() * stations.length)],
            urgencyLevel: Math.floor(Math.random() * 5) + 1,
          };
        });
        
        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const filteredReports = reports.filter(report => {
    // Apply status filter
    if (filters.status !== 'all' && report.status !== filters.status) {
      return false;
    }
    
    // Apply category filter
    if (filters.category !== 'all' && report.category !== filters.category) {
      return false;
    }
    
    // Apply district filter
    if (filters.district !== 'all' && report.district !== filters.district) {
      return false;
    }
    
    // Apply station filter
    if (filters.station !== 'all' && report.station !== filters.station) {
      return false;
    }
    
    // Apply date filter
    if (filters.date !== 'all') {
      const reportDate = new Date(report.timestamp);
      const today = new Date();
      
      if (filters.date === 'today') {
        if (reportDate.getDate() !== today.getDate() || 
            reportDate.getMonth() !== today.getMonth() || 
            reportDate.getFullYear() !== today.getFullYear()) {
          return false;
        }
      } else if (filters.date === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        if (reportDate < oneWeekAgo) {
          return false;
        }
      } else if (filters.date === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        if (reportDate < oneMonthAgo) {
          return false;
        }
      }
    }
    
    // Apply search filter (case insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        (report.location.address && report.location.address.toLowerCase().includes(query)) ||
        report.id.toLowerCase().includes(query) ||
        report.station.toLowerCase().includes(query) ||
        report.district.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleRowClick = (id) => {
    router.push(`/sa/reports/${id}`);
  };
  
  // Extract unique districts and stations for filters
  const districts = [...new Set(reports.map(report => report.district))];
  const stations = [...new Set(reports.map(report => report.station))];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Reports</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 p-2 text-gray-600 hover:text-civic-primary">
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
          <button className="flex items-center gap-1 p-2 text-gray-600 hover:text-civic-primary">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-civic-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative inline-block">
                <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                  <Tag className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="theft">Theft</option>
                    <option value="assault">Assault</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="fraud">Fraud</option>
                    <option value="harassment">Harassment</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="assigned">Assigned</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.district}
                    onChange={(e) => handleFilterChange('district', e.target.value)}
                    className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                  >
                    <option value="all">All Districts</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                  <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.station}
                    onChange={(e) => handleFilterChange('station', e.target.value)}
                    className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                  >
                    <option value="all">All Stations</option>
                    {stations.map(station => (
                      <option key={station} value={station}>{station}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Police Station
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr 
                    key={report.id}
                    onClick={() => handleRowClick(report.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      KVH-{report.id.padStart(6, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {report.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.station}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">No reports match your current filters.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  status: 'all',
                  category: 'all',
                  date: 'all',
                  district: 'all',
                  station: 'all',
                });
              }}
              className="mt-2 text-civic-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {filteredReports.length} reports found
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-civic-primary text-white rounded-md text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
