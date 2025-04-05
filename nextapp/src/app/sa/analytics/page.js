
'use client';

import { useState } from 'react';
import { 
  BarChart, 
  PieChart, 
  Calendar, 
  Download, 
  Filter, 
  MapPin,
  ChevronDown,
  Building2
} from 'lucide-react';

export default function SuperAdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [district, setDistrict] = useState('all');
  const [station, setStation] = useState('all');
  
  // Mock data for districts and stations
  const districts = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'];
  const stations = [
    'Bopal Police Station',
    'Vastrapur Police Station',
    'Satellite Police Station',
    'Gandhinagar Sector 7 Police Station',
    'Kalavad Road Police Station',
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative inline-block">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent appearance-none focus:outline-none pr-8"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last 12 Months</option>
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
          </div>
        </div>
        
        <div className="relative inline-block">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="bg-transparent appearance-none focus:outline-none pr-8"
            >
              <option value="all">All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
          </div>
        </div>
        
        <div className="relative inline-block">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <Building2 className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="bg-transparent appearance-none focus:outline-none pr-8"
            >
              <option value="all">All Stations</option>
              {stations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 uppercase mb-2">Total Reports</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">1,247</span>
            <span className="text-green-600 text-sm ml-2 mb-1">↑ 8.5%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">vs. previous period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 uppercase mb-2">Resolution Rate</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">72.4%</span>
            <span className="text-green-600 text-sm ml-2 mb-1">↑ 3.2%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">vs. previous period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 uppercase mb-2">Avg. Response Time</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">5.7 hrs</span>
            <span className="text-red-600 text-sm ml-2 mb-1">↑ 0.8 hrs</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">vs. previous period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm text-gray-500 uppercase mb-2">Active Cases</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">437</span>
            <span className="text-amber-600 text-sm ml-2 mb-1">↑ 12%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">vs. previous period</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reports by Category</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </div>
          </div>
          
          <div className="aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <PieChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Category distribution chart would be displayed here</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Theft (31%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Assault (22%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Vandalism (18%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span>Fraud (12%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Harassment (9%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span>Other (8%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reports Trend</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </div>
          </div>
          
          <div className="aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <BarChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Time series chart would be displayed here</p>
              <p className="text-gray-400 text-xs mt-1">Showing trends over the selected time period</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Districts by Report Volume</h2>
            <div className="flex items-center text-sm text-civic-primary hover:underline cursor-pointer">
              View All Districts
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Reports
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolution Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Ahmedabad
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    427
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    76.2%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Surat
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    342
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    71.8%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Vadodara
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    215
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    68.5%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Rajkot
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    183
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    74.3%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Gandhinagar
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    80
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    81.2%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Resolution by Category</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Theft</span>
                <span className="text-sm">68.2%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-civic-primary h-full rounded-full" style={{ width: '68.2%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Assault</span>
                <span className="text-sm">75.8%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-civic-primary h-full rounded-full" style={{ width: '75.8%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Vandalism</span>
                <span className="text-sm">82.3%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-civic-primary h-full rounded-full" style={{ width: '82.3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Fraud</span>
                <span className="text-sm">61.5%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-civic-primary h-full rounded-full" style={{ width: '61.5%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Harassment</span>
                <span className="text-sm">70.1%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-civic-primary h-full rounded-full" style={{ width: '70.1%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Crime Heatmap</h2>
          <div className="flex items-center gap-2">
            <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>All Categories</option>
              <option>Theft</option>
              <option>Assault</option>
              <option>Vandalism</option>
              <option>Fraud</option>
              <option>Harassment</option>
            </select>
          </div>
        </div>
        
        <div className="aspect-[21/9] bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center p-8">
            <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Statewide heatmap of incidents would be displayed here</p>
            <p className="text-gray-400 text-xs mt-1">Showing concentration of crime incidents across the state</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-500">High Density</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-500">Medium Density</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">Low Density</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Time of Day Analysis</h2>
          
          <div className="aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <BarChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Time of day incident distribution chart</p>
              <p className="text-gray-400 text-xs mt-1">Showing when crimes most frequently occur</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Key Insights:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Peak crime reporting time: 18:00 - 22:00</li>
              <li>• Lowest reporting period: 03:00 - 06:00</li>
              <li>• Theft incidents peak during evening rush (17:00 - 19:00)</li>
              <li>• Vandalism most common during late night (23:00 - 02:00)</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Report Resolution Timeline</h2>
          
          <div className="aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <BarChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Resolution timeline distribution chart</p>
              <p className="text-gray-400 text-xs mt-1">Showing how long cases take to resolve</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Resolution Statistics:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-gray-500 text-xs mb-1">Avg. Resolution Time</div>
                <div className="font-semibold">5.7 days</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-gray-500 text-xs mb-1">Same-day Resolution</div>
                <div className="font-semibold">23.5%</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-gray-500 text-xs mb-1">Within 1 Week</div>
                <div className="font-semibold">68.2%</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-gray-500 text-xs mb-1">Over 30 Days</div>
                <div className="font-semibold">7.3%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
