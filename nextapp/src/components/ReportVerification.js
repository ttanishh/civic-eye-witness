
import { useState } from 'react'
import { Shield, CheckCircle, XCircle, Loader, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { verifyReportAuthenticity } from '@/lib/web3'

export default function ReportVerification({ reportId }) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)

  const handleVerify = async () => {
    setIsVerifying(true)
    try {
      const result = await verifyReportAuthenticity(reportId)
      setVerificationResult(result)
      
      if (result.isAuthentic) {
        toast.success('Report verified as authentic', {
          description: 'This report has been verified on the blockchain.'
        })
      } else {
        toast.error('Report could not be verified', {
          description: 'This report could not be verified on the blockchain.'
        })
      }
    } catch (error) {
      console.error('Error verifying report:', error)
      toast.error('Verification failed', {
        description: 'There was an error while trying to verify this report.'
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-civic-primary" />
          <h3 className="text-lg font-semibold">Blockchain Verification</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Verify the authenticity of this report on the blockchain
        </p>
      </div>
      
      <div className="p-4">
        {verificationResult ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100">
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
                <p className="text-sm text-gray-500">
                  {verificationResult.isAuthentic 
                    ? "This report has been verified on the blockchain" 
                    : "This report could not be verified on the blockchain"}
                </p>
              </div>
            </div>
            
            {verificationResult.isAuthentic && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
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
                    <button className="text-civic-primary hover:text-civic-dark">
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500 mb-3">
              Click the button below to verify this report on the blockchain
            </p>
            <Shield className="h-16 w-16 text-gray-200 mx-auto" />
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50">
        <button 
          onClick={handleVerify} 
          disabled={isVerifying} 
          className="w-full bg-civic-primary hover:bg-civic-dark text-white py-2 rounded-md font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : verificationResult ? (
            "Verify Again"
          ) : (
            "Verify on Blockchain"
          )}
        </button>
      </div>
    </div>
  )
}
