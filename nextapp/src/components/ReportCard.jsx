
import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ReportCard({ report, userType = 'u' }) {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getCategoryLabel = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const getUrgencyLabel = (level) => {
    if (level <= 2) return 'Low';
    if (level >= 4) return 'High';
    return 'Medium';
  };
  
  const getUrgencyColor = (level) => {
    if (level <= 2) return 'bg-green-100 text-green-800';
    if (level >= 4) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };
  
  return (
    <Link href={`/${userType}/reports/${report.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full hover:shadow-md transition-shadow">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-2">{report.title}</h3>
            <StatusBadge status={report.status} />
          </div>
          
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{formatDate(report.timestamp)}</span>
            </div>
            
            {report.location && report.location.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{report.location.address}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-grow">
            {report.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {report.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {getCategoryLabel(report.category)}
              </span>
            )}
            
            {report.urgencyLevel && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(report.urgencyLevel)}`}>
                {getUrgencyLabel(report.urgencyLevel)} Priority
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
