
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Video, File, Mic, FileHeart } from "lucide-react";
import { Evidence } from "@/types/report";

interface ReportEvidenceProps {
  evidence?: Evidence[];
}

export const ReportEvidence = ({ evidence }: ReportEvidenceProps) => {
  if (!evidence || evidence.length === 0) {
    return null;
  }

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "audio":
        return <Mic className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <FileHeart className="h-5 w-5 text-civic-primary" />
          <CardTitle className="text-lg">Evidence</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {evidence.map((item, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-3 bg-muted/30 rounded-md border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="h-10 w-10 rounded-md bg-white/70 flex items-center justify-center shadow-sm">
                {getEvidenceIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-civic-primary/10 text-civic-primary px-2 py-0.5 rounded-full">
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
