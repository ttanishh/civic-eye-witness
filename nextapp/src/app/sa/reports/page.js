
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Calendar, 
  Building2, 
  MapPin, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader
} from 'lucide-react';
import { toast } from 'sonner';
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
    station: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  
  // Districts and stations for filters
  const districts = ['Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Gandhinagar'];
  const stations = {
    'Ahmedabad': ['Bopal Police Station', 'Satellite Police Station', 'Vastrapur Police Station', 'Navrangpura Police Station'],
    'Surat': ['Varachha Police Station', 'Athwa Police Station'],
    'Rajkot': ['Kalavad Road Police Station'],
    'Vadodara': ['GIDC Police Station'],
    'Gandhinagar': ['Sector 21 Police Station']
  };
  
  useEffect(() => {
    // Mock API call to fetch reports
    const fetchReports = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock data
        const mockReports = Array.from({ length: 50 }, (_, i) => {
          const statuses = ['new', 'in_review', 'assigned', 'resolved', 'closed'];
          const categories = ['theft', 'assault', 'vandalism', 'fraud', 'harassment', 'other'];
          const district = districts[Math.floor(Math.random() * districts.length)];
          const stationName = stations[district][Math.floor(Math.random() * stations[district].length)];
          
          // Generate random date within the last 30 days
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          
          return {
            id: `${i + 1}`,
            title: `Report #${i + 1}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            status,
            timestamp: date.toISOString(),
            district,
            stationName,
            location: {
              address: `${district}, Gujarat`,
              latitude: 23.022505 + (Math.random() * 0.1 - 0.05),
              longitude: 72.571365 + (Math.random() * 0.1 - 0.05),
            },
            reportedBy: '+91' + Math.floor(Math.random() * 9000000000 + 1000000000),
            urgencyLevel: Math.floor(Math.random() * 5) + 1,
          };
        });
        
        // Sort by date (newest first)
        mockReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setReports(mockReports);
        setTotalPages(Math.ceil(mockReports.length / 10));
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast.error('Failed to load reports');
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
    setCurrentPage(1); // Reset to first page when filter changes
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
    if (filters.station !== 'all' && report.stationName !== filters.station) {
      return false;
    }
    
    // Apply date filter
    if (filters.date !== 'all') {
      const reportDate = new Date(report.timestamp);
      const today = new Date();
      
      if (filters.date === 'today') {
        // Check if it's today
        if (reportDate.getDate() !== today.getDate() || 
            reportDate.getMonth() !== today.getMonth() || 
            reportDate.getFullYear() !== today.getFullYear()) {
          return false;
        }
      } else if (filters.date === 'week') {
        // Check if it's within last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        if (reportDate < oneWeekAgo) {
          return false;
        }
      } else if (filters.date === 'month') {
        // Check if it's within last 30 days
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
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
        report.district.toLowerCase().includes(query) ||
        report.stationName.toLowerCase().includes(query) ||
        (report.location.address && report.location.address.toLowerCase().includes(query)) ||
        report.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Pagination
  const itemsPerPage = 10;
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleRowClick = (id) => {
    router.push(`/sa/reports/${id}`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Reports</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                toast.success('Reports refreshed successfully');
              }, 1000);
            }}
            className="flex items-center gap-1 p-2 text-gray-600 hover:text-civic-primary"
          >
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
          <div className="flex flex-col lg:flex-row gap-4">
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
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                  >
                    <option value="all">All Statuses</option>
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
                  <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.district}
                    onChange={(e) => {
                      handleFilterChange('district', e.target.value);
                      handleFilterChange('station', 'all'); // Reset station when district changes
                    }}
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
              
              {filters.district !== 'all' && (
                <div className="relative inline-block">
                  <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <select
                      value={filters.station}
                      onChange={(e) => handleFilterChange('station', e.target.value)}
                      className="bg-transparent pr-8 appearance-none focus:outline-none text-sm"
                    >
                      <option value="all">All Stations</option>
                      {stations[filters.district].map(station => (
                        <option key={station} value={station}>{station}</option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-civic-primary" />
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-800 mb-2">No reports found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Police Station
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedReports.map((report) => (
                    <tr 
                      key={report.id}
                      onClick={() => handleRowClick(report.id)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{report.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.stationName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredReports.length)}</span> of <span className="font-medium">{filteredReports.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm font-medium">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredReports.length / itemsPerPage)))}
                  disabled={currentPage >= Math.ceil(filteredReports.length / itemsPerPage)}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
