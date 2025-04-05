
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  FileText, 
  User,
  Shield,
  Tag,
  AlertTriangle
} from "lucide-react";
import { getReportById } from "@/lib/reportUtils";
import { Report } from "@/types/report";
import { ReportVerification } from "@/components/ReportVerification";
import { ReportEvidence } from "@/components/ReportEvidence";

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      
      try {
        const reportData = await getReportById(id);
        setReport(reportData);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "investigating":
        return "bg-blue-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUrgencyLabel = (level?: number) => {
    if (!level) return "Medium";
    
    switch (level) {
      case 1: return "Very Low";
      case 2: return "Low";
      case 3: return "Medium";
      case 4: return "High";
      case 5: return "Critical";
      default: return "Medium";
    }
  };

  const getUrgencyColor = (level?: number) => {
    if (!level) return "bg-yellow-500";
    
    switch (level) {
      case 1: return "bg-green-300";
      case 2: return "bg-green-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-orange-500";
      case 5: return "bg-red-500";
      default: return "bg-yellow-500";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 animate-pulse">
        <div className="h-8 w-1/4 bg-muted rounded mb-6"></div>
        <div className="bg-card rounded-xl p-6 mb-6">
          <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-muted rounded mb-8"></div>
          <div className="h-24 bg-muted rounded mb-4"></div>
          <div className="flex gap-2 mb-2">
            <div className="h-6 w-20 bg-muted rounded"></div>
            <div className="h-6 w-20 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Report Not Found</h2>
          <p className="text-red-600 mb-4">The report you're looking for could not be found or has been removed.</p>
          <Button asChild>
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={`${getStatusColor(report.status)} text-white`}>
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </Badge>
          
          <Badge variant="outline" className={`${getUrgencyColor(report.urgencyLevel)} text-white`}>
            Urgency: {getUrgencyLabel(report.urgencyLevel)}
          </Badge>
          
          <Badge variant="outline" className="bg-civic-primary text-white">
            {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-civic-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-civic-primary" />
                <CardTitle className="text-lg">Report Details</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{report.description}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Reported on</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(report.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Reporter ID</p>
                    <p className="text-sm text-muted-foreground">
                      {report.reporter}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {report.location.address || 'No address provided'} 
                      <span className="text-xs ml-1">
                        ({report.location.latitude.toFixed(6)}, {report.location.longitude.toFixed(6)})
                      </span>
                    </p>
                  </div>
                </div>
                
                {report.witnesses && report.witnesses.length > 0 && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium mb-2">Witnesses</p>
                    <div className="space-y-2">
                      {report.witnesses.map((witness, index) => (
                        <div key={index} className="bg-muted/30 p-2 rounded-md text-sm">
                          {witness.description}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <ReportEvidence evidence={report.evidence} />
        </div>
        
        <div className="space-y-6">
          <ReportVerification reportId={report.id} />
          
          <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-civic-primary" />
                <CardTitle className="text-lg">Tags</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">#{report.category}</Badge>
                <Badge variant="secondary">#{report.status}</Badge>
                <Badge variant="secondary">#evidence-{report.evidence?.length || 0}</Badge>
                <Badge variant="secondary">#witnesses-{report.witnesses?.length || 0}</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-civic-primary" />
                <CardTitle className="text-lg">Privacy Notice</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This report is securely stored on the blockchain. Personal identifiers are hashed to protect privacy. 
                The report's contents and evidence are cryptographically verified to ensure authenticity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
