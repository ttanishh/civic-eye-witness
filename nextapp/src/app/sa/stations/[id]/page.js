
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  BarChart2,
  Edit,
  Trash2,
  Clock,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export default function StationDetailPage({ params }) {
  const [station, setStation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = params;
  
  useEffect(() => {
    // Mock API call to fetch station details
    const fetchStationDetails = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockStation = {
          id,
          name: 'Bopal Police Station',
          district: 'Ahmedabad',
          address: 'Near Bopal Circle, Bopal, Ahmedabad',
          coordinates: {
            latitude: 23.0345,
            longitude: 72.4938
          },
          contactNumber: '+91 79 2717 1234',
          email: 'bopal.ps@gujaratpolice.gov.in',
          headOfficer: 'PI R.K. Patel',
          officerCount: 42,
          activeReports: 27,
          totalReports: 156,
          resolutionRate: 85,
          averageResponseTime: '3.2 hours',
          coverageArea: 'Bopal, South Bopal, Ambli, Ghuma, Shilaj',
          statistics: {
            reportsByCategory: [
              { category: 'Theft', count: 58 },
              { category: 'Vandalism', count: 27 },
              { category: 'Assault', count: 23 },
              { category: 'Fraud', count: 19 },
              { category: 'Harassment', count: 15 },
              { category: 'Other', count: 14 },
            ],
            monthlyReports: [
              { month: 'Jan', count: 12 },
              { month: 'Feb', count: 15 },
              { month: 'Mar', count: 13 },
              { month: 'Apr', count: 17 },
              { month: 'May', count: 19 },
              { month: 'Jun', count: 14 },
              { month: 'Jul', count: 16 },
              { month: 'Aug', count: 18 },
              { month: 'Sep', count: 15 },
              { month: 'Oct', count: 12 },
              { month: 'Nov', count: 0 },
              { month: 'Dec', count: 0 },
            ]
          },
          officers: [
            { name: 'PI R.K. Patel', designation: 'Police Inspector', phone: '+91 98765 43210', activeCases: 7 },
            { name: 'PSI L.M. Shah', designation: 'Sub-Inspector', phone: '+91 98765 43211', activeCases: 5 },
            { name: 'HC A.B. Sharma', designation: 'Head Constable', phone: '+91 98765 43212', activeCases: 3 },
            { name: 'HC P.K. Verma', designation: 'Head Constable', phone: '+91 98765 43213', activeCases: 4 },
            { name: 'PC S.D. Patel', designation: 'Constable', phone: '+91 98765 43214', activeCases: 2 },
          ],
          recentReports: [
            { id: '101', title: 'Theft at Market Area', timestamp: '2025-04-02T10:30:00', status: 'in_review' },
            { id: '102', title: 'Vandalism in Park', timestamp: '2025-04-01T15:45:00', status: 'assigned' },
            { id: '103', title: 'Suspicious Person', timestamp: '2025-03-29T20:15:00', status: 'new' },
          ]
        };
        
        setStation(mockStation);
      } catch (error) {
        console.error('Error fetching station details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStationDetails();
  }, [id]);
  
  const handleDeleteStation = () => {
    if (confirm('Are you sure you want to delete this police station? This action cannot be undone.')) {
      // In a real app, this would call an API to delete the station
      alert('Station would be deleted here');
      router.push('/sa/stations');
    }
  };
  
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
      </div>
    );
  }
  
  if (!station) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Station not found</h2>
        <p className="text-gray-600 mb-4">The police station you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link
          href="/sa/stations"
          className="inline-flex items-center text-civic-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Stations
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link
            href="/sa/stations"
            className="mr-4 inline-flex items-center text-gray-600 hover:text-civic-primary"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">{station.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/sa/stations/${id}/edit`}
            className="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDeleteStation}
            className="inline-flex items-center gap-1 px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-civic-light rounded-lg flex items-center justify-center mr-4">
                <Building2 className="h-6 w-6 text-civic-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{station.name}</h2>
                <p className="text-gray-500">{station.district} District</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Address</h3>
                  <p className="text-gray-600 text-sm">{station.address}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {station.coordinates.latitude.toFixed(6)}, {station.coordinates.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Head Officer</h3>
                  <p className="text-gray-600 text-sm">{station.headOfficer}</p>
                  <p className="text-gray-500 text-xs mt-1">{station.officerCount} officers in staff</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Contact Number</h3>
                  <p className="text-gray-600 text-sm">{station.contactNumber}</p>
                  <p className="text-gray-500 text-xs mt-1">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">{station.email}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium mb-2">Coverage Area</h3>
              <p className="text-gray-600 text-sm">{station.coverageArea}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Performance Metrics</h2>
              <Link 
                href={`/sa/analytics?stationId=${id}`}
                className="text-civic-primary text-sm hover:underline"
              >
                View Detailed Analytics
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs text-gray-500 mb-1">Active Cases</h3>
                <p className="text-2xl font-bold text-gray-800">{station.activeReports}</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs text-gray-500 mb-1">Total Reports</h3>
                <p className="text-2xl font-bold text-gray-800">{station.totalReports}</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs text-gray-500 mb-1">Resolution Rate</h3>
                <p className="text-2xl font-bold text-green-600">{station.resolutionRate}%</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs text-gray-500 mb-1">Avg. Response</h3>
                <p className="text-2xl font-bold text-gray-800">{station.averageResponseTime}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Reports by Category</h3>
                <div className="space-y-2">
                  {station.statistics.reportsByCategory.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm">{item.category}</div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-civic-primary rounded-full" 
                            style={{ 
                              width: `${(item.count / station.totalReports) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm text-gray-600">
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Monthly Report Trend</h3>
                <div className="aspect-[4/3] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center p-4">
                    <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Monthly report trend chart</p>
                    <p className="text-gray-400 text-xs mt-1">(Chart would be implemented here)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Reports</h2>
              <Link 
                href={`/sa/reports?stationId=${id}`}
                className="text-civic-primary text-sm hover:underline"
              >
                View All Reports
              </Link>
            </div>
            
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
                      Reported
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {station.recentReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KVH-{report.id.padStart(6, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          report.status === 'new' ? 'bg-amber-100 text-amber-800' :
                          report.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                          report.status === 'assigned' ? 'bg-purple-100 text-purple-800' :
                          report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {report.status === 'new' ? 'New' :
                           report.status === 'in_review' ? 'In Review' :
                           report.status === 'assigned' ? 'Assigned' :
                           report.status === 'resolved' ? 'Resolved' :
                           'Closed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/sa/reports/${report.id}`}
                          className="text-civic-primary hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Station Status</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Connection</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Update</span>
                <span className="text-sm">10 minutes ago</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Added to System</span>
                <span className="text-sm">Jan 15, 2025</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    System update scheduled for Apr 10, 2025. Some services may be temporarily unavailable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Officers</h2>
              <Link 
                href={`/sa/stations/${id}/officers`}
                className="text-civic-primary text-sm hover:underline flex items-center"
              >
                Manage
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {station.officers.slice(0, 5).map((officer, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-md"
                >
                  <div>
                    <h3 className="text-sm font-medium">{officer.name}</h3>
                    <p className="text-xs text-gray-500">{officer.designation}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {officer.activeCases} active cases
                  </div>
                </div>
              ))}
            </div>
            
            {station.officers.length > 5 && (
              <div className="mt-3 text-center">
                <Link
                  href={`/sa/stations/${id}/officers`}
                  className="text-civic-primary text-sm hover:underline"
                >
                  View all {station.officers.length} officers
                </Link>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            
            <div className="space-y-2">
              <Link
                href={`/sa/stations/${id}/edit`}
                className="block w-full text-left py-2 px-3 flex items-center justify-between rounded-md hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <Edit className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Edit Station</span>
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link
                href={`/sa/reports?stationId=${id}`}
                className="block w-full text-left py-2 px-3 flex items-center justify-between rounded-md hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span>View Reports</span>
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link
                href={`/sa/analytics?stationId=${id}`}
                className="block w-full text-left py-2 px-3 flex items-center justify-between rounded-md hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-gray-500" />
                  <span>View Analytics</span>
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <button
                className="block w-full text-left py-2 px-3 flex items-center justify-between rounded-md hover:bg-gray-50"
                onClick={() => {
                  // In a real app, this would generate a report
                  alert('This would generate a performance report PDF');
                }}
              >
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Generate Performance Report</span>
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
