
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Send, 
  Save,
  Check,
  AlertTriangle,
  Loader
} from 'lucide-react';
import { toast } from 'sonner';
import StatusBadge from '@/components/StatusBadge';
import ReportEvidence from '@/components/ReportEvidence';

export default function AdminReportDetailPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [assignedOfficer, setAssignedOfficer] = useState('');
  const [officers, setOfficers] = useState([]);
  const params = useParams();
  const router = useRouter();
  
  useEffect(() => {
    const fetchReportDetails = async () => {
      setLoading(true);
      
      try {
        // Mock API call - in a real app, this would fetch from a database or blockchain
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock report data
        const mockReport = {
          id: params.id,
          title: 'Theft at Market Area',
          description: 'Wallet stolen at the vegetable market. I was shopping at the market around 10:30 AM when I noticed my wallet was missing from my bag. The wallet contained my ID cards, credit cards, and about ₹2,000 in cash. I had my bag with me the entire time, but it was crowded in the vegetable section. I believe someone might have pickpocketed me while I was selecting vegetables. There were many people around, so I did not notice anything suspicious at the time.',
          category: 'theft',
          status: 'in_review',
          urgencyLevel: 3,
          reportedBy: {
            phoneNumber: '+919876543210',
            name: 'Rajesh Sharma'
          },
          timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          location: {
            latitude: 23.022505,
            longitude: 72.571365,
            address: 'Vegetable Market, Bopal, Ahmedabad'
          },
          evidence: [
            {
              type: 'image',
              description: 'Photo of the area where the theft occurred',
              timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
            },
            {
              type: 'document',
              description: 'List of items that were in the wallet',
              timestamp: new Date(Date.now() - 3600000 * 24 * 2 + 3600000).toISOString()
            }
          ]
        };
        
        // Mock notes
        const mockNotes = [
          {
            id: '1',
            content: 'Initial review completed. This appears to be a pickpocketing case that occurred in a crowded market area.',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            addedBy: 'ASI Rakesh Patel'
          },
          {
            id: '2',
            content: 'Contacted victim for additional details about the wallet and its contents. Will check with market security for any CCTV footage.',
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
            addedBy: 'ASI Rakesh Patel'
          }
        ];
        
        // Mock officers
        const mockOfficers = [
          { id: '1', name: 'SI Suresh Kumar' },
          { id: '2', name: 'ASI Rakesh Patel' },
          { id: '3', name: 'HC Amit Singh' },
          { id: '4', name: 'Constable Meera Patel' }
        ];
        
        setReport(mockReport);
        setNotes(mockNotes);
        setStatus(mockReport.status);
        setAssignedOfficer(mockOfficers[1].id); // ASI Rakesh Patel
        setOfficers(mockOfficers);
      } catch (error) {
        console.error('Error fetching report details:', error);
        toast.error('Failed to load report details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportDetails();
  }, [params.id]);
  
  const handleAddNote = async () => {
    if (!newNote.trim()) {
      toast.error('Please enter a note');
      return;
    }
    
    setAddingNote(true);
    
    try {
      // Mock API call - in a real app, this would add a note to the database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newNoteObj = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date().toISOString(),
        addedBy: 'ASI Rakesh Patel' // Normally would be the logged-in user
      };
      
      setNotes([...notes, newNoteObj]);
      setNewNote('');
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note');
    } finally {
      setAddingNote(false);
    }
  };
  
  const handleStatusChange = async () => {
    if (status === report.status) {
      toast.info('Status is unchanged');
      return;
    }
    
    setUpdatingStatus(true);
    
    try {
      // Mock API call - in a real app, this would update the status in the database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setReport({ ...report, status });
      toast.success(`Report status updated to ${getStatusLabel(status)}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
      setStatus(report.status); // Revert to original status
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  const getStatusLabel = (statusCode) => {
    const statusMap = {
      'new': 'New',
      'in_review': 'In Review',
      'assigned': 'Assigned',
      'resolved': 'Resolved',
      'closed': 'Closed'
    };
    return statusMap[statusCode] || statusCode;
  };
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-civic-primary" />
      </div>
    );
  }
  
  if (!report) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800">Report not found</h2>
        <p className="text-gray-600 mt-2">The requested report could not be found.</p>
        <button
          onClick={() => router.push('/a/reports')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Reports
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push('/a/reports')}
          className="flex items-center gap-1 text-gray-600 hover:text-civic-primary mr-4"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Reports</span>
        </button>
        <h1 className="text-2xl font-bold">Report #{report.id}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-800">{report.title}</h2>
                <StatusBadge status={report.status} />
              </div>
              
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{formatDate(report.timestamp)}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{report.location.address}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Reported by: {report.reportedBy.name}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Description</h3>
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
              
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-md font-semibold mb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <p className="font-medium">{report.reportedBy.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone:</span>
                    <p className="font-medium">{report.reportedBy.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {report.evidence && report.evidence.length > 0 && (
            <ReportEvidence evidence={report.evidence} />
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Case Notes</h3>
            </div>
            
            <div className="p-4">
              {notes.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {notes.map(note => (
                    <div key={note.id} className="border-l-4 border-civic-primary bg-gray-50 p-4 rounded-r-md">
                      <p className="text-gray-700">{note.content}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{note.addedBy}</span>
                        <span>{formatDate(note.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p>No notes have been added yet</p>
                </div>
              )}
              
              <div className="mt-4">
                <label htmlFor="newNote" className="block text-sm font-medium text-gray-700 mb-1">
                  Add a Note
                </label>
                <textarea
                  id="newNote"
                  rows={4}
                  placeholder="Enter case note or update..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                ></textarea>
                
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleAddNote}
                    disabled={addingNote || !newNote.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark disabled:opacity-50 disabled:hover:bg-civic-primary"
                  >
                    {addingNote ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="-ml-1 mr-2 h-4 w-4" />
                        Add Note
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Case Management</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Case Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="assigned">Assigned</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="assignedOfficer" className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Officer
                </label>
                <select
                  id="assignedOfficer"
                  value={assignedOfficer}
                  onChange={(e) => setAssignedOfficer(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                >
                  <option value="">Not Assigned</option>
                  {officers.map(officer => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleStatusChange}
                disabled={updatingStatus || status === report.status}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-civic-primary hover:bg-civic-dark disabled:opacity-50 disabled:hover:bg-civic-primary"
              >
                {updatingStatus ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="-ml-1 mr-2 h-4 w-4" />
                    Update Case
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Case Timeline</h3>
            </div>
            
            <div className="p-4">
              <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-gray-900">Report Submitted</span>
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(report.timestamp)}
                </div>
              </div>
              
              <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-gray-900">Case Review Started</span>
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(new Date(new Date(report.timestamp).getTime() + 7200000).toISOString())}
                </div>
              </div>
              
              <div className="relative pl-8">
                <div className={`absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                  report.status === 'resolved' || report.status === 'closed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div className="mb-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {report.status === 'resolved' || report.status === 'closed' ? 'Case Resolved' : 'Current Status'}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {report.status === 'resolved' || report.status === 'closed' 
                    ? formatDate(new Date(new Date(report.timestamp).getTime() + 259200000).toISOString())
                    : 'In progress'
                  }
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                <button className="w-full text-left py-2 px-3 flex items-center rounded-md hover:bg-gray-50 transition-colors">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Contact Reporter</span>
                </button>
                
                <button className="w-full text-left py-2 px-3 flex items-center rounded-md hover:bg-gray-50 transition-colors">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span>View Location on Map</span>
                </button>
                
                <button className="w-full text-left py-2 px-3 flex items-center rounded-md hover:bg-gray-50 transition-colors">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-600">Mark as Resolved</span>
                </button>
                
                <button className="w-full text-left py-2 px-3 flex items-center rounded-md hover:bg-gray-50 transition-colors">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-600">Flag as Priority</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
