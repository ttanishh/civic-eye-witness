
'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader, BarChart3, PieChart as PieChartIcon, MapPin } from 'lucide-react'
import { getCrimeStatisticsFromBlockchain } from '@/lib/web3'

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalReports: 0,
    byCategoryCount: {},
    byStatusCount: {},
    byUrgencyCount: {}
  })
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // In a real implementation, this would fetch from the blockchain
        // For now, we'll use mock data
        
        // Mock data for demonstration
        const mockStats = {
          totalReports: 157,
          byCategoryCount: {
            theft: 42,
            assault: 23,
            vandalism: 31,
            fraud: 19,
            harassment: 27,
            other: 15
          },
          byStatusCount: {
            pending: 35,
            investigating: 87,
            resolved: 35
          },
          byUrgencyCount: {
            1: 12,
            2: 25,
            3: 63,
            4: 38,
            5: 19
          }
        }
        
        setStats(mockStats)
      } catch (error) {
        console.error('Error fetching statistics:', error)
        toast.error('Failed to load statistics')
      } finally {
        setLoading(false)
      }
    }
    
    fetchStatistics()
  }, [])
  
  // Transform data for charts
  const categoryData = Object.entries(stats.byCategoryCount).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: count
  }))
  
  const statusData = Object.entries(stats.byStatusCount).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count
  }))
  
  const urgencyData = Object.entries(stats.byUrgencyCount).map(([level, count]) => ({
    name: `Level ${level}`,
    value: count
  }))
  
  // Colors for the pie charts
  const CATEGORY_COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280']
  const STATUS_COLORS = ['#f59e0b', '#3b82f6', '#10b981']
  const URGENCY_COLORS = ['#10b981', '#84cc16', '#f59e0b', '#f97316', '#ef4444']
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-civic-primary" />
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Crime Statistics</h1>
        <p className="text-gray-600">Visualized crime data from the blockchain</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <h3 className="text-4xl font-bold mt-1 text-gray-800">{stats.totalReports}</h3>
            </div>
            <div className="bg-civic-light p-2 rounded-md">
              <BarChart3 className="h-6 w-6 text-civic-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Most Reported</p>
              <h3 className="text-4xl font-bold mt-1 text-gray-800">Theft</h3>
            </div>
            <div className="bg-red-50 p-2 rounded-md">
              <PieChartIcon className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Cases</p>
              <h3 className="text-4xl font-bold mt-1 text-blue-500">
                {stats.byStatusCount.investigating || 0}
              </h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-md">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Tabs defaultValue="category">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Crime Analysis</h2>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="status">By Status</TabsTrigger>
              <TabsTrigger value="urgency">By Urgency</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="category" className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Reports" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Reports" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="urgency" className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={urgencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Reports" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={urgencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {urgencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={URGENCY_COLORS[index % URGENCY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
