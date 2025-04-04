
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getReportFromBlockchain } from "@/lib/contractInterface";
import { Report } from "@/types/report";
import { format } from "date-fns";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadReport = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const reportData = await getReportFromBlockchain(id);
        setReport(reportData);
      } catch (error) {
        console.error("Error loading report:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReport();
  }, [id]);
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="status-badge-pending">Pending Review</span>;
      case "investigating":
        return <span className="status-badge-investigating">Investigating</span>;
      case "resolved":
        return <span className="status-badge-resolved">Resolved</span>;
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-pulse-fade">Loading report details...</div>
      </div>
    );
  }
  
  if (!report) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The report you're looking for could not be found.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-civic-primary p-4 shadow-md">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:text-white hover:bg-civic-dark/20"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">{report.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(report.timestamp), "PPP 'at' p")}
                </span>
              </div>
            </div>
            {renderStatusBadge(report.status)}
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{report.description}</p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-civic-primary" />
                <span>
                  {report.location.address || `${report.location.latitude.toFixed(4)}, ${report.location.longitude.toFixed(4)}`}
                </span>
              </div>
              
              <div className="mt-4 h-64 bg-muted rounded-md overflow-hidden">
                {/* In a real app, this would be a map component */}
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Map view would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-civic-success mt-2"></div>
                  <div>
                    <p className="font-medium">Report Submitted</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(report.timestamp), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
                
                {report.status !== "pending" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-civic-primary mt-2"></div>
                    <div>
                      <p className="font-medium">Status Changed to Investigating</p>
                      <p className="text-sm text-muted-foreground">
                        {/* In a real app, this would be the actual timestamp */}
                        {format(new Date(new Date(report.timestamp).getTime() + 86400000), "PPP 'at' p")}
                      </p>
                    </div>
                  </div>
                )}
                
                {report.status === "resolved" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-civic-success mt-2"></div>
                    <div>
                      <p className="font-medium">Case Resolved</p>
                      <p className="text-sm text-muted-foreground">
                        {/* In a real app, this would be the actual timestamp */}
                        {format(new Date(new Date(report.timestamp).getTime() + 172800000), "PPP 'at' p")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
