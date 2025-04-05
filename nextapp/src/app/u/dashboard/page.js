
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, FileText, AlertTriangle, Check, Clock, BarChart3, ChevronRight } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { getReportStatistics } from '@/lib/web3'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    investigatingReports: 0,
    resolvedReports: 0
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const result = await getReportStatistics()
        if (result.success) {
          setStats({
            totalReports: result.totalReports,
            pendingReports: result.pendingReports,
            investigatingReports: result.investigatingReports,
            resolvedReports: result.resolvedReports
          })
        }
      } catch (error) {
        console.error('Error fetching statistics:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
    
    return () => unsubscribe()
  }, [])
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your KAVACH secure reporting dashboard</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-800">
                {loading ? '...' : stats.totalReports}
              </h3>
            </div>
            <div className="bg-civic-light p-2 rounded-md">
              <FileText className="h-6 w-6 text-civic-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <h3 className="text-3xl font-bold mt-1 text-amber-500">
                {loading ? '...' : stats.pendingReports}
              </h3>
            </div>
            <div className="bg-amber-50 p-2 rounded-md">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Investigating</p>
              <h3 className="text-3xl font-bold mt-1 text-blue-500">
                {loading ? '...' : stats.investigatingReports}
              </h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-md">
              <AlertTriangle className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <h3 className="text-3xl font-bold mt-1 text-green-500">
                {loading ? '...' : stats.resolvedReports}
              </h3>
            </div>
            <div className="bg-green-50 p-2 rounded-md">
              <Check className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/u/report" className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-civic-primary hover:bg-civic-light/20 transition-colors">
              <div className="bg-civic-light p-3 rounded-md mr-4">
                <FileText className="h-5 w-5 text-civic-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-civic-primary transition-colors">New Report</h3>
                <p className="text-sm text-gray-500">Submit a new crime report</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-civic-primary transition-colors" />
            </Link>
            
            <Link href="/u/my-reports" className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-civic-primary hover:bg-civic-light/20 transition-colors">
              <div className="bg-civic-light p-3 rounded-md mr-4">
                <FileText className="h-5 w-5 text-civic-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-civic-primary transition-colors">My Reports</h3>
                <p className="text-sm text-gray-500">View your submitted reports</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-civic-primary transition-colors" />
            </Link>
            
            <Link href="/u/statistics" className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-civic-primary hover:bg-civic-light/20 transition-colors">
              <div className="bg-civic-light p-3 rounded-md mr-4">
                <BarChart3 className="h-5 w-5 text-civic-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-civic-primary transition-colors">Statistics</h3>
                <p className="text-sm text-gray-500">View crime statistics</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-civic-primary transition-colors" />
            </Link>
            
            <Link href="/help" className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-civic-primary hover:bg-civic-light/20 transition-colors">
              <div className="bg-civic-light p-3 rounded-md mr-4">
                <AlertTriangle className="h-5 w-5 text-civic-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-civic-primary transition-colors">Help Center</h3>
                <p className="text-sm text-gray-500">Get assistance and FAQs</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-civic-primary transition-colors" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Blockchain Verification</h2>
          <div className="flex items-center justify-center py-6">
            <Shield className="h-20 w-20 text-civic-primary opacity-20" />
          </div>
          <p className="text-sm text-gray-600 text-center mb-4">
            Your reports are securely stored on the blockchain, ensuring tamper-proof records and privacy protection.
          </p>
          <Link 
            href="/about#blockchain"
            className="block text-civic-primary text-center text-sm font-medium hover:underline"
          >
            Learn how it works
          </Link>
        </div>
      </div>
    </div>
  )
}
