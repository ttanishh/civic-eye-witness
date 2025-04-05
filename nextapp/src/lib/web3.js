
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import KavachReportingABI from '@/contracts/build/KavachReporting.abi.json';

// Contract address will be updated after deployment
let contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
const CONTRACT_ABI = KavachReportingABI;

// Initialize provider
let provider;
let contract;
let signer;

// Initialize Web3 and contract
export const initializeWeb3 = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // Connect to the Ethereum network (Ganache when in development)
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      
      // Initialize the contract
      contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
      return true;
    } catch (error) {
      console.error('Error initializing web3:', error);
      return false;
    }
  } else {
    console.log('Ethereum object not found, install MetaMask');
    return false;
  }
};

// Set contract address (called after contract is deployed)
export const setContractAddress = (address) => {
  contractAddress = address;
  if (provider && signer) {
    contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
  }
};

// Create a DID for a user
export const createDID = () => {
  const randomId = CryptoJS.lib.WordArray.random(16).toString();
  return `did:user:${randomId}`;
};

// Hash a phone number with a salt
export const hashPhoneNumber = (phoneNumber) => {
  const salt = process.env.NEXT_PUBLIC_PHONE_HASH_SALT || 'default-salt-change-me';
  return CryptoJS.SHA256(phoneNumber + salt).toString();
};

// Encrypt user metadata
export const encryptUserData = (data, publicKey) => {
  // In a real implementation, this would use asymmetric encryption
  // For simplicity, we're using AES here
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_ENCRYPTION_KEY || 'admin-key-change-me';
  return CryptoJS.AES.encrypt(JSON.stringify(data), adminKey).toString();
};

// Decrypt user metadata
export const decryptUserData = (encryptedData) => {
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_ENCRYPTION_KEY || 'admin-key-change-me';
  const bytes = CryptoJS.AES.decrypt(encryptedData, adminKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Register a user on the blockchain
export const registerUser = async (phoneNumber, ipfsCID) => {
  try {
    await initializeWeb3();
    if (!contract) throw new Error('Contract not initialized');
    
    const phoneHash = hashPhoneNumber(phoneNumber);
    const did = createDID();
    
    const tx = await contract.registerUser(phoneHash, did, ipfsCID);
    await tx.wait();
    
    return { success: true, did };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: error.message };
  }
};

// Submit a report to the blockchain
export const submitReport = async (reportData, phoneNumber) => {
  try {
    await initializeWeb3();
    if (!contract) throw new Error('Contract not initialized');
    
    const {
      titleHash,
      descriptionHash,
      category,
      latitude,
      longitude,
      locationHash,
      witnessesHash,
      evidenceHash,
      detailsHash,
      urgencyLevel,
      districtId
    } = reportData;
    
    // Convert latitude and longitude to integers (multiplied by 1e6)
    const latitudeInt = Math.round(latitude * 1000000);
    const longitudeInt = Math.round(longitude * 1000000);
    
    // Hash the phone number for privacy
    const reporterHash = hashPhoneNumber(phoneNumber);
    
    const tx = await contract.submitReport(
      titleHash,
      descriptionHash,
      category,
      latitudeInt,
      longitudeInt,
      locationHash,
      reporterHash,
      witnessesHash || '',
      evidenceHash || '',
      detailsHash || '',
      urgencyLevel || 3,
      districtId || 'general'
    );
    
    const receipt = await tx.wait();
    
    // Extract the report ID from the transaction receipt
    const reportCreatedEvent = receipt.logs
      .filter(log => log.topics[0] === ethers.id('ReportCreated(uint256,bytes32,uint256,uint8)'))
      .map(log => contract.interface.parseLog(log));
    
    const reportId = reportCreatedEvent.length > 0 ? reportCreatedEvent[0].args[0] : null;
    
    return { 
      success: true, 
      reportId, 
      txHash: receipt.hash 
    };
  } catch (error) {
    console.error('Error submitting report:', error);
    return { success: false, error: error.message };
  }
};

// Get report details from the blockchain
export const getReport = async (reportId) => {
  try {
    await initializeWeb3();
    if (!contract) throw new Error('Contract not initialized');
    
    const reportData = await contract.getReport(reportId);
    
    return {
      success: true,
      report: {
        id: reportId,
        titleHash: reportData[0],
        descriptionHash: reportData[1],
        category: reportData[2],
        location: {
          latitude: reportData[3] / 1000000,
          longitude: reportData[4] / 1000000,
          locationHash: reportData[5]
        },
        timestamp: new Date(reportData[6] * 1000).toISOString(),
        status: ['pending', 'investigating', 'resolved'][reportData[7]],
        reporterHash: reportData[8],
        witnessesHash: reportData[9],
        evidenceHash: reportData[10],
        detailsHash: reportData[11],
        urgencyLevel: reportData[12],
        officerAssignedHash: reportData[13]
      }
    };
  } catch (error) {
    console.error('Error getting report:', error);
    return { success: false, error: error.message };
  }
};

// Verify a report's authenticity
export const verifyReportAuthenticity = async (reportId) => {
  try {
    const reportResult = await getReport(reportId);
    
    if (!reportResult.success) {
      return { isAuthentic: false };
    }
    
    // In a real implementation, you might want to check more than just existence
    return {
      isAuthentic: true,
      blockNumber: 1234567, // This would come from the actual transaction
      timestamp: reportResult.report.timestamp,
      transactionHash: '0x1234567890abcdef' // This would be the actual txHash
    };
  } catch (error) {
    console.error('Error verifying report:', error);
    return { isAuthentic: false, error: error.message };
  }
};

// Get report statistics
export const getReportStatistics = async () => {
  try {
    await initializeWeb3();
    if (!contract) throw new Error('Contract not initialized');
    
    const stats = await contract.getReportStatistics();
    
    return {
      success: true,
      totalReports: stats[0],
      pendingReports: stats[1],
      investigatingReports: stats[2],
      resolvedReports: stats[3]
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return { 
      success: false, 
      error: error.message,
      totalReports: 0,
      pendingReports: 0,
      investigatingReports: 0,
      resolvedReports: 0
    };
  }
};
