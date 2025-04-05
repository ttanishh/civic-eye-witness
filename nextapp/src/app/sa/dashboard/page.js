
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  Building2, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  MapPin, 
  PieChart,
  BarChart2
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';

export default function SuperAdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to fetch statistics
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
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
        <h1 className="text-2xl font-bold">KAVACH Administration Dashboard</h1>
        <div className="text-sm text-gray-500">
          Super Admin | Gujarat Police
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Stations" 
          value="42" 
          icon={Building2}
          change="2"
          changeType="increase"
          color="blue"
        />
        <StatsCard 
          title="Total Reports" 
          value="1,247" 
          icon={FileText}
          change="156"
          changeType="increase"
          color="purple"
        />
        <StatsCard 
          title="Total Users" 
          value="15,893" 
          icon={Users}
          change="423"
          changeType="increase"
          color="amber"
        />
        <StatsCard 
          title="Resolution Rate" 
          value="72.4%" 
          icon={CheckCircle}
          change="3.2%"
          changeType="increase"
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">State-wide Activity</h2>
            <Link href="/sa/analytics" className="text-civic-primary text-sm hover:underline">
              View Details
            </Link>
          </div>
          
          <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">State-wide heatmap of incidents</p>
              <p className="text-gray-400 text-xs mt-1">(Map integration would be implemented here)</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <h3 className="text-sm font-medium text-gray-700">Highest Activity</h3>
              <p className="text-xs text-gray-500">Ahmedabad City</p>
              <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <h3 className="text-sm font-medium text-gray-700">Second Highest</h3>
              <p className="text-xs text-gray-500">Surat City</p>
              <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Report Statistics</h2>
            <Link href="/sa/reports" className="text-civic-primary text-sm hover:underline">
              View All Reports
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">New Reports (Today)</h3>
              <p className="text-2xl font-bold">78</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Response Time</h3>
              <p className="text-2xl font-bold">4.2 hrs</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Resolved Today</h3>
              <p className="text-2xl font-bold">63</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pending > 24hrs</h3>
              <p className="text-2xl font-bold text-amber-600">126</p>
            </div>
          </div>
          
          <div className="aspect-[3/2] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Daily report trends for the last 30 days</p>
              <p className="text-gray-400 text-xs mt-1">(Chart would be implemented here)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Stations by Performance</h2>
            <Link href="/sa/stations" className="text-civic-primary text-sm hover:underline flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Station
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cases Resolved
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Response
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Bopal Police Station</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ahmedabad
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    127 (85%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2.4 hours
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">4.6/5</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Vastrapur Police Station</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ahmedabad
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    112 (82%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3.1 hours
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">4.4/5</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Satellite Police Station</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ahmedabad
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    98 (80%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3.5 hours
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '86%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">4.3/5</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Cases by Category</h2>
            <Link href="/sa/analytics" className="text-civic-primary text-sm hover:underline">
              Full Analysis
            </Link>
          </div>
          
          <div className="aspect-square bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <PieChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Distribution of cases by category</p>
              <p className="text-gray-400 text-xs mt-1">(Chart would be implemented here)</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <span className="h-3 w-3 bg-blue-500 rounded-full inline-block mr-2"></span>
                Theft
              </span>
              <span className="text-sm font-medium">36%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <span className="h-3 w-3 bg-red-500 rounded-full inline-block mr-2"></span>
                Assault
              </span>
              <span className="text-sm font-medium">22%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full inline-block mr-2"></span>
                Vandalism
              </span>
              <span className="text-sm font-medium">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <span className="h-3 w-3 bg-yellow-500 rounded-full inline-block mr-2"></span>
                Fraud
              </span>
              <span className="text-sm font-medium">12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <span className="h-3 w-3 bg-purple-500 rounded-full inline-block mr-2"></span>
                Other
              </span>
              <span className="text-sm font-medium">12%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">System Health</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            All Systems Operational
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Server Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Main API Server</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">IPFS Node</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Blockchain Node</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Database</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Used Storage</span>
                <span className="text-xs text-gray-900">237 GB / 500 GB</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '47.4%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Healthy
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Uptime (Last 30 days)</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">API Uptime</span>
                <span className="text-xs text-gray-900">99.98%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '99.98%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Last Incident</span>
                <span className="text-xs text-gray-900">7 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
