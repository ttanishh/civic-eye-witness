
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  Building2, 
  BarChart2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  AlertTriangle,
  Eye,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import StatsCard from '@/components/StatsCard';

export default function SuperAdminDashboardPage() {
  const [stats, setStats] = useState({
    totalReports: 0,
    totalStations: 0,
    activeReports: 0,
    resolvedReports: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [topStations, setTopStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockStats = {
          totalReports: 1458,
          totalStations: 24,
          activeReports: 367,
          resolvedReports: 1091
        };
        
        const mockRecentReports = [
          {
            id: '1',
            title: 'Theft at Market Area',
            location: 'Bopal, Ahmedabad',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            status: 'new',
            stationName: 'Bopal Police Station'
          },
          {
            id: '2',
            title: 'Vandalism in Park',
            location: 'Satellite, Ahmedabad',
            timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
            status: 'in_review',
            stationName: 'Satellite Police Station'
          },
          {
            id: '3',
            title: 'Vehicle Accident',
            location: 'Vastrapur, Ahmedabad',
            timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
            status: 'assigned',
            stationName: 'Vastrapur Police Station'
          },
          {
            id: '4',
            title: 'Missing Person Report',
            location: 'Kalavad Road, Rajkot',
            timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
            status: 'in_review',
            stationName: 'Kalavad Road Police Station'
          },
          {
            id: '5',
            title: 'Shop Breaking Case',
            location: 'Varachha, Surat',
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
            status: 'assigned',
            stationName: 'Varachha Police Station'
          }
        ];
        
        const mockTopStations = [
          {
            id: '1',
            name: 'Bopal Police Station',
            district: 'Ahmedabad',
            activeReports: 42,
            resolutionRate: 87
          },
          {
            id: '2',
            name: 'Vastrapur Police Station',
            district: 'Ahmedabad',
            activeReports: 38,
            resolutionRate: 82
          },
          {
            id: '5',
            name: 'Varachha Police Station',
            district: 'Surat',
            activeReports: 45,
            resolutionRate: 76
          },
          {
            id: '7',
            name: 'Kalavad Road Police Station',
            district: 'Rajkot',
            activeReports: 36,
            resolutionRate: 79
          }
        ];
        
        setStats(mockStats);
        setRecentReports(mockRecentReports);
        setTopStations(mockTopStations);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Reports" 
          value={stats.totalReports.toLocaleString()} 
          icon={FileText}
          change="12%"
          changeType="increase"
          color="blue"
        />
        <StatsCard 
          title="Police Stations" 
          value={stats.totalStations} 
          icon={Building2}
          change="2"
          changeType="increase"
          color="purple"
        />
        <StatsCard 
          title="Active Reports" 
          value={stats.activeReports.toLocaleString()} 
          icon={Clock}
          change="7%"
          changeType="increase"
          color="amber"
        />
        <StatsCard 
          title="Resolved Reports" 
          value={stats.resolvedReports.toLocaleString()} 
          icon={CheckCircle}
          change="15%"
          changeType="increase"
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Recent Reports</h2>
            <Link
              href="/sa/reports"
              className="text-sm text-civic-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentReports.map(report => (
              <div key={report.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <Link 
                    href={`/sa/reports/${report.id}`}
                    className="text-lg font-medium text-gray-800 hover:text-civic-primary transition-colors"
                  >
                    {report.title}
                  </Link>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'new' ? 'bg-amber-100 text-amber-800' :
                    report.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                    report.status === 'assigned' ? 'bg-purple-100 text-purple-800' :
                    report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status.replace('_', ' ').charAt(0).toUpperCase() + report.status.replace('_', ' ').slice(1)}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{report.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(report.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span>{report.stationName}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link
                    href={`/sa/reports/${report.id}`}
                    className="text-civic-primary hover:text-civic-dark text-sm flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Top Police Stations</h2>
            <Link
              href="/sa/stations"
              className="text-sm text-civic-primary hover:underline flex items-center"
            >
              View All Stations
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {topStations.map(station => (
              <div key={station.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <Link 
                    href={`/sa/stations/${station.id}`}
                    className="text-lg font-medium text-gray-800 hover:text-civic-primary transition-colors"
                  >
                    {station.name}
                  </Link>
                  <div className="text-gray-500 text-sm">
                    {station.district} District
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs mb-1">Active Reports</div>
                    <div className="font-semibold">{station.activeReports}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs mb-1">Resolution Rate</div>
                    <div className="font-semibold">{station.resolutionRate}%</div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link
                    href={`/sa/stations/${station.id}`}
                    className="text-civic-primary hover:text-civic-dark text-sm flex items-center"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Station Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden col-span-2">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">System Overview</h2>
            <Link
              href="/sa/analytics"
              className="text-sm text-civic-primary hover:underline flex items-center"
            >
              Analytics
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="p-4">
            <div className="aspect-[21/9] bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">State-wide reporting trends and statistics graph</p>
                <p className="text-gray-400 text-xs mt-1">(Chart would be displayed here)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Report Categories</h3>
                  <Link
                    href="/sa/analytics"
                    className="text-civic-primary hover:text-civic-dark text-xs"
                  >
                    Details
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Theft</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Vandalism</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Fraud</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">District Distribution</h3>
                  <Link
                    href="/sa/analytics"
                    className="text-civic-primary hover:text-civic-dark text-xs"
                  >
                    Details
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Ahmedabad</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Surat</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Rajkot</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">System Alerts</h2>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
              3 New
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">High Report Volume</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Satellite Police Station has received 25+ reports in the last 24 hours.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Resolution Time Alert</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Average resolution time for Varachha Police Station has increased by 35%.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    5 hours ago
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">New Police Station Added</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Chandkheda Police Station has been added to the system.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">User Activity Spike</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    50% increase in user registration in the past week.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 text-center">
            <Link
              href="/sa/alerts"
              className="text-civic-primary hover:underline text-sm"
            >
              View All Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
