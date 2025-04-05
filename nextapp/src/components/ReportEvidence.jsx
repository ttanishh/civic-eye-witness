
import { useState } from 'react';
import { Camera, Video, FileText, AlertCircle, ChevronDown, ChevronUp, Eye } from 'lucide-react';

export default function ReportEvidence({ evidence }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (!evidence || evidence.length === 0) {
    return null;
  }
  
  const getIconForType = (type) => {
    switch (type) {
      case 'image':
        return <Camera className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'audio':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case 'document':
      default:
        return <FileText className="h-5 w-5 text-green-500" />;
    }
  };
  
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
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div 
        className="p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">Evidence Files ({evidence.length})</h3>
        <button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-3">
            {evidence.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getIconForType(item.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Added: {formatDate(item.timestamp)}
                    </p>
                  </div>
                  <button className="flex items-center text-civic-primary text-xs hover:text-civic-dark">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
