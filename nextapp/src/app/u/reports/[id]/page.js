
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Tag, 
  CheckSquare, 
  MessageSquare, 
  Bookmark,
  Share2,
  Download,
  Clock
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import StatusTimeline from '@/components/StatusTimeline';

export default function ReportDetailPage({ params }) {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = params;
  
  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockReport = {
          id,
          title: 'Theft at Market Area',
          description: 'My wallet was stolen at the vegetable market. I had approximately ₹2,000 in cash, my ID card, and bank cards. The incident happened around 10:30 AM when the market was crowded. I was near the fruit stalls when I noticed my pocket had been picked.',
          status: 'in_review',
          timestamp: '2025-04-02T10:30:00',
          category: 'theft',
          location: {
            latitude: 23.022505,
            longitude: 72.571365,
            address: 'Vegetable Market, Ahmedabad',
          },
          evidences: [
            {
              type: 'image',
              description: 'Photo of the market area where incident occurred',
              timestamp: '2025-04-02T10:45:00',
            },
            {
              type: 'document',
              description: 'List of stolen items',
              timestamp: '2025-04-02T11:00:00',
            },
          ],
          timeline: [
            {
              id: '1',
              status: 'new',
              description: 'Report submitted',
              timestamp: '2025-04-02T10:30:00',
              note: 'Initial report filed via KAVACH app',
            },
            {
              id: '2',
              status: 'in_review',
              description: 'Report assigned for review',
              timestamp: '2025-04-02T11:15:00',
              officer: 'Officer Kumar',
              note: 'Case taken up for preliminary investigation',
            },
          ],
        };
        
        setReport(mockReport);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReport();
  }, [id]);
  
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
  
  if (!report) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Report not found</h2>
        <p className="text-gray-600 mb-4">The report you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link
          href="/u/reports"
          className="inline-flex items-center text-civic-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to My Reports
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/u/reports"
          className="mr-4 inline-flex items-center text-gray-600 hover:text-civic-primary"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold flex-1">{report.title}</h1>
        <StatusBadge status={report.status} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Report Details</h2>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(report.timestamp)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{report.location.address}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Tag className="h-4 w-4 mr-1" />
                <span className="capitalize">{report.category}</span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700">{report.description}</p>
            </div>
          </div>
          
          {report.evidences && report.evidences.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Evidence Submitted</h2>
              
              <div className="space-y-3">
                {report.evidences.map((evidence, index) => (
                  <div key={index} className="flex bg-gray-50 p-3 rounded-md border border-gray-100">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded bg-civic-light flex items-center justify-center">
                        {evidence.type === 'image' && (
                          <svg className="h-5 w-5 text-civic-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        {evidence.type === 'document' && (
                          <svg className="h-5 w-5 text-civic-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{evidence.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(evidence.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Current Status</h2>
            
            <div className="flex items-center justify-between mb-4">
              <StatusBadge status={report.status} />
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Updated {formatDate(report.timeline[report.timeline.length - 1].timestamp)}
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              <h3 className="font-medium mb-1">What happens next?</h3>
              {report.status === 'new' && (
                <p className="text-gray-600">Your report is being reviewed. You will be notified when the status changes.</p>
              )}
              {report.status === 'in_review' && (
                <p className="text-gray-600">An officer is reviewing your report. You may be contacted for additional information.</p>
              )}
              {report.status === 'assigned' && (
                <p className="text-gray-600">Your report has been assigned to an investigator. The investigation is ongoing.</p>
              )}
              {report.status === 'resolved' && (
                <p className="text-gray-600">Your report has been resolved. You can add a feedback if you wish.</p>
              )}
              {report.status === 'closed' && (
                <p className="text-gray-600">This case has been closed. Thank you for your report.</p>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Contact Officer</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <Bookmark className="h-4 w-4" />
                <span>Save Report</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share Report</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Status Timeline</h2>
            </div>
            
            <StatusTimeline events={report.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}
