
import { Shield, CheckCircle, Clock } from 'lucide-react';

export default function ReportVerification({ reportId }) {
  // In a real implementation, this would fetch blockchain verification details
  // For demo purposes, we'll use static data
  const verificationData = {
    blockchainId: '0x7a9d5e7a4d9f8b2e3c1d6e5f4a3b2c1d6e5f4a3b',
    timestamp: new Date().toISOString(),
    verified: true
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-civic-primary mr-2" />
          <h3 className="text-lg font-semibold">Blockchain Verification</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-center py-3">
          {verificationData.verified ? (
            <CheckCircle className="h-12 w-12 text-green-500" />
          ) : (
            <Clock className="h-12 w-12 text-amber-500" />
          )}
        </div>
        
        <div className="mt-2 text-center">
          <h4 className="font-medium text-gray-800">
            {verificationData.verified ? 'Report Verified' : 'Verification Pending'}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            {verificationData.verified ? 
              'This report is securely stored on the blockchain' : 
              'This report is being processed for blockchain verification'}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Blockchain ID:</span>
            <span className="font-medium text-gray-800 truncate ml-2 max-w-[180px]">
              {verificationData.blockchainId}
            </span>
          </div>
          
          <div className="flex justify-between text-xs mt-2">
            <span className="text-gray-500">Timestamp:</span>
            <span className="font-medium text-gray-800">
              {new Date(verificationData.timestamp).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between text-xs mt-2">
            <span className="text-gray-500">Report ID:</span>
            <span className="font-medium text-gray-800">{reportId}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="w-full text-center text-civic-primary text-sm hover:underline">
            View Blockchain Details
          </button>
        </div>
      </div>
    </div>
  );
}
