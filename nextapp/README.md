
# KAVACH - Decentralized Crime Reporting System

KAVACH is a decentralized crime reporting platform that leverages blockchain technology to ensure secure, anonymous, and tamper-proof crime reporting. This application uses Next.js, Firebase, and Ethereum (via Ganache) to create a comprehensive crime reporting system.

## Features

- **Secure Phone Authentication**: OTP-based login using Firebase
- **Decentralized Identity (DID)**: Private user identification through blockchain
- **Blockchain Verification**: All reports are stored on the blockchain for integrity
- **Evidence Collection**: Support for various types of evidence
- **Privacy Protection**: Personal information is encrypted and hashed
- **Real-time Statistics**: Crime data visualization
- **Report Status Tracking**: Follow reports from submission to resolution

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Firebase Phone Auth
- **Blockchain**: Ethereum Smart Contract (via Ganache for development)
- **Storage**: IPFS for decentralized storage
- **Encryption**: AES for sensitive data

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Ganache (for local blockchain)
- Firebase account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/mb-kavach.git
   cd mb-kavach/nextapp
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the `nextapp` directory:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID=your-ipfs-project-id
   NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET=your-ipfs-project-secret
   NEXT_PUBLIC_PHONE_HASH_SALT=your-custom-salt
   NEXT_PUBLIC_ADMIN_ENCRYPTION_KEY=your-encryption-key
   ```

4. Compile and deploy the smart contract
   ```
   npm run compile-contract
   node scripts/deploy-contract.js
   ```

5. Run the development server
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contract Deployment

The smart contract is automatically deployed to a local Ganache instance when you run the deployment script. The contract address is saved in the `.env.local` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This project was created as a secure and decentralized crime reporting solution.
- Thanks to all the open-source libraries and frameworks that made this possible.
