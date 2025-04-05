
import Link from 'next/link';
import { Calendar, MapPin, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

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

export default function ReportCard({ report, userType = 'u' }) {
  const { id, title, description, status, timestamp, location, category } = report;

  const getBackgroundColor = () => {
    if (status === 'new') return 'border-l-amber-500';
    if (status === 'in_review') return 'border-l-blue-500';
    if (status === 'assigned') return 'border-l-purple-500';
    if (status === 'resolved') return 'border-l-green-500';
    return 'border-l-gray-500';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${getBackgroundColor()} hover:shadow-md transition-shadow overflow-hidden`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <StatusBadge status={status} />
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(timestamp)}</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate max-w-28">
                {location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-100">
        <Link 
          href={`/${userType}/reports/${id}`}
          className="block py-2 px-4 text-civic-primary text-sm font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1"
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
}
