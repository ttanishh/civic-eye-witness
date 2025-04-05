
import { Clock, Check, AlertTriangle, MapPin, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'

// Format date string to relative time (e.g. "2 hours ago")
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) {
    return 'Just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }
  
  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

export default function ReportCard({ report, showDetails = false }) {
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <div className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Pending Review</span>
          </div>
        )
      case 'investigating':
        return (
          <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Investigating</span>
          </div>
        )
      case 'resolved':
        return (
          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>Resolved</span>
          </div>
        )
      default:
        return null
    }
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{report.title}</h3>
          {renderStatusBadge(report.status)}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {report.description}
        </p>
        
        <div className="flex flex-col space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatRelativeTime(report.timestamp)}</span>
          </div>
          
          {report.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">
                {report.location.address || 
                  `${report.location.latitude.toFixed(4)}, ${report.location.longitude.toFixed(4)}`}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {!showDetails && (
        <div className="border-t border-gray-100">
          <Link 
            href={`/u/report/${report.id}`}
            className="block py-2 px-4 text-civic-primary text-sm font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Link>
        </div>
      )}
    </div>
  )
}
