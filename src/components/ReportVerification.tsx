
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";
import { verifyReportAuthenticityFromBlockchain } from "@/lib/contractInterface";
import { toast } from "sonner";

interface ReportVerificationProps {
  reportId: string;
}

export const ReportVerification = ({ reportId }: ReportVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isAuthentic: boolean;
    blockNumber?: number;
    timestamp?: string;
    transactionHash?: string;
  } | null>(null);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyReportAuthenticityFromBlockchain(reportId);
      setVerificationResult(result);
      
      if (result.isAuthentic) {
        toast.success("Report verified as authentic", {
          description: "This report has been verified on the blockchain."
        });
      } else {
        toast.error("Report could not be verified", {
          description: "This report could not be verified on the blockchain."
        });
      }
    } catch (error) {
      console.error("Error verifying report:", error);
      toast.error("Verification failed", {
        description: "There was an error while trying to verify this report."
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-civic-primary" />
          <CardTitle className="text-lg">Blockchain Verification</CardTitle>
        </div>
        <CardDescription>
          Verify the authenticity of this report on the blockchain
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {verificationResult ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-muted">
                {verificationResult.isAuthentic ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {verificationResult.isAuthentic ? "Authentic Report" : "Unverified Report"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {verificationResult.isAuthentic 
                    ? "This report has been verified on the blockchain" 
                    : "This report could not be verified on the blockchain"}
                </p>
              </div>
            </div>
            
            {verificationResult.isAuthentic && (
              <div className="bg-muted/50 p-4 rounded-md space-y-2 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="font-medium">Block Number:</span>
                  <span>{verificationResult.blockNumber}</span>
                </div>
                
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="font-medium">Timestamp:</span>
                  <span>{new Date(verificationResult.timestamp || "").toLocaleString()}</span>
                </div>
                
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="font-medium">Transaction:</span>
                  <div className="flex items-center gap-1 truncate">
                    <span className="truncate">{verificationResult.transactionHash}</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-2">
              Click the button below to verify this report on the blockchain
            </p>
            <Shield className="h-16 w-16 text-muted-foreground opacity-20 mx-auto" />
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleVerify} 
          disabled={isVerifying} 
          className="w-full bg-civic-primary hover:bg-civic-dark text-white"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : verificationResult ? (
            "Verify Again"
          ) : (
            "Verify on Blockchain"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
