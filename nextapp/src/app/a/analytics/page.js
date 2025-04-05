
'use client';

import { useState } from 'react';
import { 
  BarChart, 
  PieChart, 
  Calendar, 
  Download, 
  Filter,
  ChevronDown,
  MapPin,
  FileText
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jurisdiction Analytics</h1>
        <div className="text-sm text-gray-500">
          Bopal Police Station, Ahmedabad
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent w-full appearance-none focus:outline-none"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last 12 Months</option>
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Total Reports</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">126</span>
            <span className="text-green-600 text-sm ml-2 mb-1">↑ 12%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">vs. previous period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Resolution Rate</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">67.5%</span>
            <span className="text-green-600 text-sm ml-2 mb-1">↑ 5.2%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">vs. previous period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Avg. Response Time</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">2.4 days</span>
            <span className="text-red-600 text-sm ml-2 mb-1">↑ 0.3 days</span>
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
                  <span>Theft (42%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Assault (18%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Vandalism (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span>Fraud (12%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Harassment (8%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span>Other (5%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reports Over Time</h2>
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
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Incident Hotspots</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </div>
          </div>
          
          <div className="aspect-[21/9] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Heatmap of incident locations would be displayed here</p>
              <p className="text-gray-400 text-xs mt-1">Showing concentration of incidents across your jurisdiction</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-medium text-sm mb-1">Market Area</h3>
              <p className="text-xs text-gray-500 mb-2">Highest concentration</p>
              <div className="flex justify-between text-xs">
                <span>32 reports</span>
                <span className="text-red-500">↑ 8%</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-medium text-sm mb-1">Bus Terminal</h3>
              <p className="text-xs text-gray-500 mb-2">Second highest</p>
              <div className="flex justify-between text-xs">
                <span>24 reports</span>
                <span className="text-red-500">↑ 12%</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-medium text-sm mb-1">Shopping Mall</h3>
              <p className="text-xs text-gray-500 mb-2">Third highest</p>
              <div className="flex justify-between text-xs">
                <span>18 reports</span>
                <span className="text-green-500">↓ 5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="flex items-center gap-2 px-4 py-2 bg-civic-primary text-white rounded-md hover:bg-civic-dark">
          <FileText className="h-4 w-4" />
          <span>Generate Detailed Report</span>
        </button>
      </div>
    </div>
  );
}
