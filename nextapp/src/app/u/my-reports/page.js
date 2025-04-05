
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Loader } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { getReportsByReporterFromBlockchain } from '@/lib/web3'
import ReportCard from '@/components/ReportCard'

export default function MyReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    const fetchReports = async () => {
      if (!auth.currentUser) return
      
      try {
        // In a real implementation, this would fetch from the blockchain
        // For now, we'll use mock data
        const result = await getReportsByReporterFromBlockchain(auth.currentUser.phoneNumber)
        
        // Mock data for demonstration
        const mockReports = [
          {
            id: '1',
            title: 'Stolen Bicycle',
            description: 'My bicycle was stolen from outside the mall. It\'s a red mountain bike with a black basket.',
            category: 'theft',
            location: { latitude: 12.9716, longitude: 77.5946, address: 'Central Mall, Bangalore' },
            timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
            status: 'investigating',
            urgencyLevel: 3
          },
          {
            id: '2',
            title: 'Vandalism at Park',
            description: 'Someone has spray painted graffiti on the walls of the children\'s play area in City Park.',
            category: 'vandalism',
            location: { latitude: 12.9783, longitude: 77.6408, address: 'City Park, Bangalore' },
            timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
            status: 'resolved',
            urgencyLevel: 2
          },
          {
            id: '3',
            title: 'Phone Scam',
            description: 'I received a call from someone claiming to be from my bank asking for my account details.',
            category: 'fraud',
            location: { latitude: 12.9150, longitude: 77.6200, address: 'Residence, Bangalore' },
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            status: 'pending',
            urgencyLevel: 4
          }
        ]
        
        setReports(mockReports)
      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchReports()
  }, [])
  
  const filteredReports = reports.filter(report => {
    // Filter by status
    if (statusFilter !== 'all' && report.status !== statusFilter) {
      return false
    }
    
    // Filter by search query
    if (
      searchQuery && 
      !report.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !report.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(report.location.address && report.location.address.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }
    
    return true
  })
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">My Reports</h1>
        <p className="text-gray-600">View and manage your submitted reports</p>
      </header>
      
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
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
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
          <button
            onClick={() => router.push('/u/report')}
            className="px-4 py-2 bg-civic-primary text-white rounded-md hover:bg-civic-dark transition-colors"
          >
            Submit a Report
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
