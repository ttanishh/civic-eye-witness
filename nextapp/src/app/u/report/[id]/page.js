
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Calendar, AlertTriangle, Check, Clock, ChevronLeft, Loader } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getReport } from '@/lib/web3'
import ReportVerification from '@/components/ReportVerification'
import ReportEvidence from '@/components/ReportEvidence'

export default function ReportDetailPage() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        // In a real implementation, this would fetch from the blockchain
        // For now, we'll use mock data
        const reportId = params.id
        
        // Mock data for demonstration
        const mockReports = {
          '1': {
            id: '1',
            title: 'Stolen Bicycle',
            description: 'My bicycle was stolen from outside the mall. It\'s a red mountain bike with a black basket. I had locked it with a chain lock, but when I returned after shopping, both the bicycle and the lock were gone. The bicycle is a Trek 4500 mountain bike, red in color with a black basket attached to the front. It has a distinctive scratch on the left side of the frame. I purchased it about 2 years ago and use it daily for commuting.',
            category: 'theft',
            location: { latitude: 12.9716, longitude: 77.5946, address: 'Central Mall, Bangalore' },
            timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
            status: 'investigating',
            urgencyLevel: 3,
            evidence: [
              {
                type: 'image',
                description: 'Photo of my bicycle taken last month',
                timestamp: new Date(Date.now() - 3600000 * 24 * 30).toISOString()
              },
              {
                type: 'document',
                description: 'Purchase receipt',
                timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
              }
            ],
            witnesses: [
              { id: 'w1', description: 'Security guard who was on duty' }
            ]
          },
          '2': {
            id: '2',
            title: 'Vandalism at Park',
            description: 'Someone has spray painted graffiti on the walls of the children\'s play area in City Park. The graffiti appeared overnight and contains offensive language not suitable for children. The park is frequented by many families with young children during the day. The affected area is approximately 10 square meters on the eastern wall of the play area. The paint used appears to be red and black spray paint.',
            category: 'vandalism',
            location: { latitude: 12.9783, longitude: 77.6408, address: 'City Park, Bangalore' },
            timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
            status: 'resolved',
            urgencyLevel: 2,
            evidence: [
              {
                type: 'image',
                description: 'Photo of the vandalized wall',
                timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
              },
              {
                type: 'video',
                description: 'Video showing the extent of damage',
                timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
              }
            ],
            witnesses: []
          },
          '3': {
            id: '3',
            title: 'Phone Scam',
            description: 'I received a call from someone claiming to be from my bank asking for my account details. The caller identified himself as John from XYZ Bank\'s security department. He claimed there was suspicious activity on my account and needed to verify my details to secure the account. He already had some personal information about me including my name and partial address, which made the call seem legitimate at first. He asked for my full account number, PIN, and the CVV on my card.',
            category: 'fraud',
            location: { latitude: 12.9150, longitude: 77.6200, address: 'Residence, Bangalore' },
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            status: 'pending',
            urgencyLevel: 4,
            evidence: [
              {
                type: 'audio',
                description: 'Recording of the phone call',
                timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
              }
            ],
            witnesses: [
              { id: 'w2', description: 'Family member who overheard the call' }
            ]
          }
        }
        
        const reportData = mockReports[reportId]
        
        if (reportData) {
          setReport(reportData)
        } else {
          toast.error('Report not found')
          router.push('/u/my-reports')
        }
      } catch (error) {
        console.error('Error fetching report:', error)
        toast.error('Failed to load report')
      } finally {
        setLoading(false)
      }
    }
    
    fetchReport()
  }, [params.id, router])
  
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span>Pending Review</span>
          </div>
        )
      case 'investigating':
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>Under Investigation</span>
          </div>
        )
      case 'resolved':
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Check className="h-4 w-4" />
            <span>Resolved</span>
          </div>
        )
      default:
        return null
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-civic-primary" />
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link 
          href="/u/my-reports" 
          className="flex items-center gap-1 text-gray-600 hover:text-civic-primary mr-4"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Reports</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h1 className="text-2xl font-bold text-gray-800">{report.title}</h1>
                {renderStatusBadge(report.status)}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(report.timestamp).toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>
                    {report.location.address || 
                      `${report.location.latitude.toFixed(4)}, ${report.location.longitude.toFixed(4)}`}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{report.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  Category: {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm text-white ${
                  report.urgencyLevel <= 2 ? 'bg-green-500' : 
                  report.urgencyLevel >= 4 ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  Urgency: {report.urgencyLevel}/5
                </div>
              </div>
              
              {report.witnesses && report.witnesses.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Witnesses</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {report.witnesses.map((witness, index) => (
                      <li key={witness.id || index}>{witness.description}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {report.evidence && report.evidence.length > 0 && (
            <ReportEvidence evidence={report.evidence} />
          )}
        </div>
        
        <div className="space-y-6">
          <ReportVerification reportId={report.id} />
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Report Timeline</h3>
            </div>
            
            <div className="p-4">
              <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-gray-900">Report Submitted</span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(report.timestamp).toLocaleString()}
                </div>
              </div>
              
              {(report.status === 'investigating' || report.status === 'resolved') && (
                <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                  <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="mb-1">
                    <span className="text-sm font-semibold text-gray-900">Investigation Started</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(new Date(report.timestamp).getTime() + 86400000).toLocaleString()}
                  </div>
                </div>
              )}
              
              {report.status === 'resolved' && (
                <div className="relative pl-8">
                  <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="mb-1">
                    <span className="text-sm font-semibold text-gray-900">Case Resolved</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(new Date(report.timestamp).getTime() + 432000000).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
