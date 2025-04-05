
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  MapPin, 
  BarChart
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import ReportCard from '@/components/ReportCard';

export default function AdminDashboardPage() {
  const [recentReports, setRecentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to fetch stats and reports
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockReports = [
          {
            id: '1',
            title: 'Theft at Market Area',
            description: 'Wallet stolen at the vegetable market',
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
            description: 'Public benches damaged with spray paint',
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
            description: 'Suspicious person loitering around residential area',
            status: 'assigned',
            timestamp: '2025-03-29T20:15:00',
            category: 'other',
            location: {
              latitude: 23.022505,
              longitude: 72.571365,
              address: 'Residential Colony, Sector 7, Gandhinagar',
            },
          },
        ];
        
        setRecentReports(mockReports);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Station Dashboard</h1>
        <div className="text-sm text-gray-500">
          Bopal Police Station, Ahmedabad
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="New Reports" 
          value="12" 
          icon={FileText}
          change="3"
          changeType="increase"
          color="blue"
        />
        <StatsCard 
          title="Assigned Cases" 
          value="18" 
          icon={Users}
          change="5"
          changeType="increase"
          color="purple"
        />
        <StatsCard 
          title="Resolved This Month" 
          value="27" 
          icon={CheckCircle}
          change="12"
          changeType="increase"
          color="green"
        />
        <StatsCard 
          title="Avg. Resolution Time" 
          value="3.2 days" 
          icon={Clock}
          change="0.5"
          changeType="decrease"
          color="amber"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Jurisdiction Map</h2>
            <button className="text-civic-primary text-sm hover:underline">View Full Map</button>
          </div>
          
          <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Map view displaying incidents in your jurisdiction</p>
              <p className="text-gray-400 text-xs mt-1">(Map integration would be implemented here)</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Case Distribution</h2>
            <button className="text-civic-primary text-sm hover:underline">View Analytics</button>
          </div>
          
          <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <BarChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Case distribution by category and status</p>
              <p className="text-gray-400 text-xs mt-1">(Chart would be implemented here)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
          <Link href="/a/reports" className="text-civic-primary text-sm hover:underline flex items-center">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReports.map(report => (
              <ReportCard key={report.id} report={report} userType="a" />
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Officer Status</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium text-gray-600">SK</span>
                </div>
                <div>
                  <div className="text-sm font-medium">SI Suresh Kumar</div>
                  <div className="text-xs text-gray-500">5 active cases</div>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                On Duty
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium text-gray-600">RP</span>
                </div>
                <div>
                  <div className="text-sm font-medium">ASI Rakesh Patel</div>
                  <div className="text-xs text-gray-500">3 active cases</div>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                On Duty
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium text-gray-600">AS</span>
                </div>
                <div>
                  <div className="text-sm font-medium">HC Amit Singh</div>
                  <div className="text-xs text-gray-500">2 active cases</div>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Off Duty
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-civic-primary text-sm hover:underline">
              View All Officers
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
          
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Response Time Alert:</span> 3 reports have been waiting for more than 24 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    <span className="font-medium">Hotspot Alert:</span> Increased theft reports near Market Area in the last 48 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Staff Update:</span> Officer rotation schedule for next week has been published.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-civic-primary text-sm hover:underline">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
