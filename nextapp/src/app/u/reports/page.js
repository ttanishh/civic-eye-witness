
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Loader, Plus } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    // Mock API call to fetch reports
    const fetchReports = async () => {
      setLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockReports = [
          {
            id: '1',
            title: 'Stolen Bicycle',
            description: 'My bicycle was stolen from outside the mall. It\'s a red mountain bike with a black basket.',
            category: 'theft',
            location: { 
              latitude: 23.022505, 
              longitude: 72.571365, 
              address: 'Central Mall, Ahmedabad' 
            },
            timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
            status: 'in_review',
            urgencyLevel: 3
          },
          {
            id: '2',
            title: 'Vandalism at Park',
            description: 'Someone has spray painted graffiti on the walls of the children\'s play area in City Park.',
            category: 'vandalism',
            location: { 
              latitude: 23.022505, 
              longitude: 72.571365, 
              address: 'City Park, Ahmedabad' 
            },
            timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
            status: 'resolved',
            urgencyLevel: 2
          },
          {
            id: '3',
            title: 'Phone Scam',
            description: 'I received a call from someone claiming to be from my bank asking for my account details.',
            category: 'fraud',
            location: { 
              latitude: 23.022505, 
              longitude: 72.571365, 
              address: 'Residence, Ahmedabad' 
            },
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            status: 'new',
            urgencyLevel: 4
          },
          {
            id: '4',
            title: 'Hit and Run',
            description: 'A vehicle hit my parked car and drove away without leaving any contact information.',
            category: 'other',
            location: { 
              latitude: 23.022505, 
              longitude: 72.571365, 
              address: 'Residential Society, Sector 10, Gandhinagar' 
            },
            timestamp: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
            status: 'assigned',
            urgencyLevel: 3
          },
          {
            id: '5',
            title: 'Shop Breaking',
            description: 'My shop was broken into last night. Electronics and cash were stolen.',
            category: 'theft',
            location: { 
              latitude: 23.022505, 
              longitude: 72.571365, 
              address: 'Market Area, Ahmedabad' 
            },
            timestamp: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
            status: 'new',
            urgencyLevel: 5
          }
        ];
        
        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  const filteredReports = reports.filter(report => {
    // Apply status filter
    if (statusFilter !== 'all' && report.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter (case insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        (report.location.address && report.location.address.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const handleReportClick = (id) => {
    router.push(`/u/reports/${id}`);
  };
  
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Reports</h1>
          <p className="text-gray-600">Track the status of your submitted reports</p>
        </div>
        
        <Link
          href="/u/reports/new"
          className="inline-flex items-center justify-center gap-1 bg-civic-primary text-white px-4 py-2 rounded-md hover:bg-civic-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Report</span>
        </Link>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-civic-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_review">In Review</option>
              <option value="assigned">Assigned</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-civic-primary" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">No reports found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || statusFilter !== 'all' ? 
              'Try changing your search or filter criteria.' : 
              'You haven\'t submitted any reports yet.'}
          </p>
          <Link
            href="/u/reports/new"
            className="inline-flex items-center justify-center gap-1 bg-civic-primary text-white px-4 py-2 rounded-md hover:bg-civic-dark transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Submit a Report</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map(report => (
            <div 
              key={report.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleReportClick(report.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{report.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{formatDate(report.timestamp)}</p>
                </div>
                <StatusBadge status={report.status} />
              </div>
              
              <p className="text-gray-600 mt-3 line-clamp-2">
                {report.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                </span>
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.urgencyLevel <= 2 ? 'bg-green-100 text-green-800' : 
                  report.urgencyLevel >= 4 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Urgency: {report.urgencyLevel}/5
                </span>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {report.location.address}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
