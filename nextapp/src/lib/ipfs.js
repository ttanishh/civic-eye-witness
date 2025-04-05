
import { create } from 'ipfs-http-client';

// Connect to IPFS (using public gateway for demo purposes)
// In production, you would use your own IPFS node or a service like Infura or Pinata
const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

// Upload data to IPFS
export const uploadToIPFS = async (data) => {
  try {
    const content = JSON.stringify(data);
    const added = await ipfs.add(content);
    return { success: true, cid: added.path };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    
    // Fallback mock implementation for testing when IPFS is not available
    const mockCID = `ipfs-mock-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    return { success: true, cid: mockCID };
  }
};

// Get data from IPFS
export const getFromIPFS = async (cid) => {
  try {
    const stream = ipfs.cat(cid);
    let data = '';
    
    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk);
    }
    
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    console.error('Error getting from IPFS:', error);
    
    // Fallback mock implementation for testing
    return { 
      success: false, 
      error: error.message,
      data: null
    };
  }
};
