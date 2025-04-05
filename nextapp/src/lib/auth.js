
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { uploadToIPFS } from './ipfs';
import { hashPhoneNumber, encryptUserData, registerUser } from './web3';

// Initialize reCAPTCHA verifier
export const initRecaptcha = (containerId) => {
  if (typeof window !== 'undefined') {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  }
};

// Send OTP to phone number
export const sendOTP = async (phoneNumber) => {
  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    // Reset reCAPTCHA
    window.recaptchaVerifier.render().then(widgetId => {
      window.recaptchaVerifier.reset(widgetId);
    });
    return { success: false, error: error.message };
  }
};

// Verify OTP
export const verifyOTP = async (otp) => {
  try {
    const confirmationResult = window.confirmationResult;
    const result = await confirmationResult.confirm(otp);
    
    // User is now signed in
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // First time user, register on blockchain
      await registerNewUser(user.phoneNumber);
    }
    
    return { success: true, user };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: error.message };
  }
};

// Register a new user on the blockchain
const registerNewUser = async (phoneNumber) => {
  try {
    // Create user metadata
    const userData = {
      did: `did:user:${Date.now().toString(36)}${Math.random().toString(36).substr(2)}`,
      phone: phoneNumber,
      createdAt: new Date().toISOString()
    };
    
    // Encrypt user metadata
    const encryptedData = encryptUserData(userData);
    
    // Upload encrypted data to IPFS
    const ipfsResult = await uploadToIPFS({ encryptedData });
    
    if (!ipfsResult.success) {
      throw new Error('Failed to upload to IPFS');
    }
    
    // Register user on blockchain
    const blockchainResult = await registerUser(phoneNumber, ipfsResult.cid);
    
    if (!blockchainResult.success) {
      throw new Error('Failed to register on blockchain');
    }
    
    // Store user data in Firestore
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      phoneNumber,
      did: userData.did,
      ipfsCid: ipfsResult.cid,
      createdAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error registering new user:', error);
    return { success: false, error: error.message };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};
