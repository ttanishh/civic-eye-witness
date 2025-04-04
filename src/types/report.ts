
export type ReportStatus = "pending" | "investigating" | "resolved";

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  location: Location;
  timestamp: string;
  status: ReportStatus;
  reporter: string; // This would be a hashed or anonymized identifier
  ipfsHash?: string; // For additional details stored on IPFS
}

export interface ReportSubmission {
  title: string;
  description: string;
  location: Location;
  timestamp: string;
}
