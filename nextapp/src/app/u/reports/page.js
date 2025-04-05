
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Search, Filter, Plus } from 'lucide-react';
import ReportCard from '@/components/ReportCard';
import Link from 'next/link';

export default function MyReportsPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();
  
  useEffect(() => {
    // Mock API call to fetch reports
    const fetchReports = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockReports = [
          {
            id: '1',
            title: 'Theft at Market Area',
            description: 'My wallet was stolen at the vegetable market. I was near the fruit stalls when it happened.',
            status: 'new',
            timestamp: '2025-04-02T10:30:00',
            category: 'theft',
            location: {
              latitude: 23.022505,
              longitude: 72.571365,
              address: 'Vegetable Market, Ahmedabad',
            },
          },
          {
            id: '2',
            title: 'Vandalism in Park',
            description: 'Public benches in the park have been damaged with spray paint and several lights have been broken.',
            status: 'in_review',
            timestamp: '2025-04-01T15:45:00',
            category: 'vandalism',
            location: {
              latitude: 23.022505,
              longitude: 72.571365,
              address: 'City Park, Ahmedabad',
            },
          },
          {
            id: '3',
            title: 'Suspicious Person',
            description: 'A suspicious person has been loitering around our residential area at night for the past three days.',
            status: 'assigned',
            timestamp: '2025-03-29T20:15:00',
            category: 'other',
            location: {
              latitude: 23.022505,
              longitude: 72.571365,
              address: 'Residential Colony, Sector 7, Gandhinagar',
            },
          },
          {
            id: '4',
            title: 'Accident on Highway',
            description: 'Witnessed a hit and run accident on the highway. A motorcyclist was hit by a speeding car.',
            status: 'resolved',
            timestamp: '2025-03-25T08:20:00',
            category: 'other',
            location: {
              latitude: 23.022505,
              longitude: 72.571365,
              address: 'NH 48, Near Toll Plaza',
            },
          },
        ];
        
        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
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
        (report.location.address && report.location.address.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Reports</h1>
        <Link
          href="/u/reports/new"
          className="flex items-center gap-1 bg-civic-primary text-white px-4 py-2 rounded-md hover:bg-civic-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Report</span>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
        
        <div className="w-full md:w-auto flex">
          <div className="relative flex items-center bg-white border border-gray-300 rounded-md px-3">
            <Filter className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent py-2 pr-8 appearance-none focus:outline-none"
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
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} userType="u" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FileText className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || statusFilter !== 'all'
              ? "No reports match your current filters. Try changing your search criteria."
              : "You haven't submitted any crime reports yet."}
          </p>
          <Link
            href="/u/reports/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark transition-colors"
          >
            Submit New Report
          </Link>
        </div>
      )}
    </div>
  );
}
