
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Tag, 
  User, 
  CheckSquare, 
  MessageSquare, 
  Download,
  FileText,
  Clock,
  Phone,
  Loader,
  Eye
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import StatusTimeline from '@/components/StatusTimeline';

export default function AdminReportDetailPage({ params }) {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusNote, setStatusNote] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState('');
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
          description: 'My wallet was stolen at the vegetable market. I had approximately ₹2,000 in cash, my ID card, and bank cards. The incident happened around 10:30 AM when the market was crowded. I was near the fruit stalls when I noticed my pocket had been picked. I didn\'t see the person who took it, but I remember being bumped by someone in the crowd just before I noticed it was missing.',
          status: 'in_review',
          timestamp: '2025-04-02T10:30:00',
          category: 'theft',
          location: {
            latitude: 23.022505,
            longitude: 72.571365,
            address: 'Vegetable Market, Ahmedabad',
          },
          reportedBy: {
            phone: '+919876543210',
            name: 'Citizen',
          },
          assignedTo: 'SI Suresh Kumar',
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
              officer: 'SI Suresh Kumar',
              note: 'Case taken up for preliminary investigation',
            },
          ],
          district: 'Bopal',
          urgencyLevel: 3,
        };
        
        setReport(mockReport);
        setNewStatus(mockReport.status);
        setSelectedOfficer(mockReport.assignedTo || '');
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
  
  const handleStatusUpdate = () => {
    if (newStatus === report.status && selectedOfficer === report.assignedTo) {
      alert('No changes to update.');
      return;
    }
    
    setIsUpdating(true);
    
    // Mock API call
    setTimeout(() => {
      // In a real app, this would be an API call to update the report
      
      const updatedTimeline = [...report.timeline];
      if (newStatus !== report.status) {
        updatedTimeline.push({
          id: `${updatedTimeline.length + 1}`,
          status: newStatus,
          description: `Status changed from ${report.status} to ${newStatus}`,
          timestamp: new Date().toISOString(),
          officer: selectedOfficer || 'Station Admin',
          note: statusNote,
        });
      }
      
      setReport({
        ...report,
        status: newStatus,
        assignedTo: selectedOfficer,
        timeline: updatedTimeline,
      });
      
      setStatusNote('');
      setIsUpdating(false);
      
      alert('Report status updated successfully!');
    }, 1500);
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
          href="/a/reports"
          className="inline-flex items-center text-civic-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Reports
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/a/reports"
          className="mr-4 inline-flex items-center text-gray-600 hover:text-civic-primary"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold flex-1">Report: KVH-{report.id.padStart(6, '0')}</h1>
        <StatusBadge status={report.status} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">{report.title}</h2>
            
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
              
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-1" />
                <span>Reported by: {report.reportedBy.phone}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  Urgency: 
                  <span className={`ml-1 font-medium ${
                    report.urgencyLevel <= 2 ? 'text-green-600' : 
                    report.urgencyLevel >= 4 ? 'text-red-600' : 
                    'text-amber-600'
                  }`}>
                    Level {report.urgencyLevel}
                  </span>
                </span>
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
                    <div>
                      <button className="p-2 text-civic-primary hover:bg-civic-light rounded-full">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Location Information</h2>
            
            <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Map showing incident location</p>
                <p className="text-gray-400 text-xs mt-1">
                  Coordinates: {report.location.latitude.toFixed(6)}, {report.location.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Status Timeline</h2>
            
            <StatusTimeline events={report.timeline} />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                >
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="assigned">Assigned</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="officer" className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Officer
                </label>
                <select
                  id="officer"
                  value={selectedOfficer}
                  onChange={(e) => setSelectedOfficer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                >
                  <option value="">-- Not Assigned --</option>
                  <option value="SI Suresh Kumar">SI Suresh Kumar</option>
                  <option value="ASI Rakesh Patel">ASI Rakesh Patel</option>
                  <option value="HC Amit Singh">HC Amit Singh</option>
                  <option value="Constable Meera Patel">Constable Meera Patel</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Status Note
                </label>
                <textarea
                  id="note"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add a note about this status update..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civic-primary"
                ></textarea>
              </div>
              
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="w-full bg-civic-primary text-white rounded-md py-2 font-medium hover:bg-civic-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-4 w-4" />
                    <span>Update Status</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Reporter Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Phone Number</span>
                <span className="text-sm font-medium">{report.reportedBy.phone}</span>
              </div>
              
              <div className="flex justify-center pt-2">
                <a
                  href={`tel:${report.reportedBy.phone}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Reporter</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Report Actions</h2>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Add Comment</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <FileText className="h-4 w-4" />
                <span>Generate FIR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
