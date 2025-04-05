
import { Report, ReportSubmission, ReportStatus } from "@/types/report";

// Mock database of reports for demo purposes
// In a real app, this would come from the blockchain and/or IPFS
let mockReports: Report[] = [
  {
    id: "1",
    title: "Suspicious activity near downtown park",
    description: "I witnessed several individuals behaving suspiciously around the playground equipment at Central Park around 10pm. They appeared to be exchanging packages.",
    category: "other",
    location: {
      latitude: 40.785091,
      longitude: -73.968285,
      address: "Central Park, New York"
    },
    timestamp: "2023-04-01T22:15:00Z",
    status: "investigating",
    reporter: "anon-user-1",
    urgencyLevel: 4,
    evidence: [
      {
        type: "image",
        description: "Photo of individuals near playground",
        ipfsHash: "ipfs-hash-1649",
        timestamp: "2023-04-01T22:16:00Z"
      }
    ],
    witnesses: [
      {
        id: "witness-1",
        description: "Park security guard who was nearby"
      }
    ]
  },
  {
    id: "2",
    title: "Hit and run incident on Main St",
    description: "A blue sedan hit a parked car and drove away without stopping. License plate partially visible, started with AB3.",
    category: "other",
    location: {
      latitude: 40.712776,
      longitude: -74.005974,
      address: "123 Main St, New York"
    },
    timestamp: "2023-04-02T14:30:00Z",
    status: "pending",
    reporter: "anon-user-2",
    urgencyLevel: 3,
    evidence: [
      {
        type: "image",
        description: "Photo of damage to the parked car",
        ipfsHash: "ipfs-hash-2957",
        timestamp: "2023-04-02T14:35:00Z"
      }
    ]
  },
  {
    id: "3",
    title: "Graffiti on public building",
    description: "New graffiti appeared overnight on the east wall of the public library. Tags appear to be gang-related.",
    category: "vandalism",
    location: {
      latitude: 40.730610,
      longitude: -73.935242,
      address: "Public Library, Brooklyn"
    },
    timestamp: "2023-04-03T08:45:00Z",
    status: "resolved",
    reporter: "anon-user-1",
    urgencyLevel: 2,
    evidence: [
      {
        type: "image",
        description: "Photo of graffiti on wall",
        ipfsHash: "ipfs-hash-3451",
        timestamp: "2023-04-03T08:50:00Z"
      }
    ]
  },
  {
    id: "4",
    title: "Theft from convenience store",
    description: "Two individuals entered the store, distracted the clerk, and stole several items before fleeing on foot.",
    category: "theft",
    location: {
      latitude: 40.741895,
      longitude: -73.989308,
      address: "QuickMart, 45 Park Ave, Manhattan"
    },
    timestamp: "2023-04-04T19:20:00Z",
    status: "investigating",
    reporter: "anon-user-3",
    urgencyLevel: 3,
    evidence: [
      {
        type: "video",
        description: "Store security camera footage",
        ipfsHash: "ipfs-hash-4267",
        timestamp: "2023-04-04T19:30:00Z"
      }
    ],
    witnesses: [
      {
        id: "witness-2",
        description: "Store clerk on duty"
      },
      {
        id: "witness-3",
        description: "Customer who was in the store"
      }
    ]
  },
  {
    id: "5",
    title: "Fraud attempt via phone scam",
    description: "Someone claiming to be from the IRS called demanding payment via gift cards. They had some of my personal information.",
    category: "fraud",
    location: {
      latitude: 40.758896,
      longitude: -73.985130,
      address: "Residential area, Upper East Side"
    },
    timestamp: "2023-04-05T10:15:00Z",
    status: "pending",
    reporter: "anon-user-4",
    urgencyLevel: 2,
    evidence: [
      {
        type: "audio",
        description: "Recording of the phone call",
        ipfsHash: "ipfs-hash-5823",
        timestamp: "2023-04-05T10:20:00Z"
      }
    ]
  }
];

// Mock function to submit a report
// In a real app, this would interact with the blockchain
export const mockSubmitReport = async (reportData: ReportSubmission): Promise<Report> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would call a smart contract function
  const newReport: Report = {
    id: `${Date.now()}`,
    ...reportData,
    status: "pending",
    reporter: `anon-user-${Math.floor(Math.random() * 1000)}`,
  };
  
  mockReports.push(newReport);
  return newReport;
};

// Get all reports (with optional filtering)
export const getReports = async (
  status?: ReportStatus,
  searchQuery?: string
): Promise<Report[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredReports = [...mockReports];
  
  if (status) {
    filteredReports = filteredReports.filter(report => report.status === status);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredReports = filteredReports.filter(report => 
      report.title.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query) ||
      (report.location.address && report.location.address.toLowerCase().includes(query))
    );
  }
  
  // Sort by most recent
  return filteredReports.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Get reports by a specific anonymous user
export const getReportsByUser = async (userId: string): Promise<Report[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockReports
    .filter(report => report.reporter === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Get a specific report by ID
export const getReportById = async (id: string): Promise<Report | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockReports.find(report => report.id === id) || null;
};
