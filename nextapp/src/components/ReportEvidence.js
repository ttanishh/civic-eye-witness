
import { FileText, Image, Video, File, Mic, FileHeart } from 'lucide-react'

export default function ReportEvidence({ evidence }) {
  if (!evidence || evidence.length === 0) {
    return null
  }

  const getEvidenceIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />
      case 'document':
        return <FileText className="h-5 w-5 text-amber-500" />
      case 'audio':
        return <Mic className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileHeart className="h-5 w-5 text-civic-primary" />
          <h3 className="text-lg font-semibold">Evidence</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {evidence.map((item, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                {getEvidenceIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-civic-primary/10 text-civic-primary px-2 py-0.5 rounded-full">
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
