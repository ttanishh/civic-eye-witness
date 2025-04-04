
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CrimeReporting
 * @dev Smart contract for a decentralized crime reporting system
 */
contract CrimeReporting {
    // Define report status types
    enum ReportStatus { Pending, Investigating, Resolved }
    
    // Structure for location data
    struct Location {
        int256 latitude;  // Multiplied by 1e6 to store as integer
        int256 longitude; // Multiplied by 1e6 to store as integer
        string locationHash; // IPFS hash for more detailed location info (optional)
    }
    
    // Structure for a crime report
    struct Report {
        uint256 id;
        string titleHash; // IPFS hash of the report title
        string descriptionHash; // IPFS hash of the report description
        Location location;
        uint256 timestamp;
        ReportStatus status;
        bytes32 reporterHash; // Hashed identifier of the reporter (phone number + salt)
        string detailsHash; // IPFS hash for any additional report details
    }
    
    // Mapping from report ID to Report
    mapping(uint256 => Report) public reports;
    
    // Total number of reports
    uint256 public reportCount;
    
    // Event emitted when a new report is created
    event ReportCreated(uint256 indexed reportId, bytes32 indexed reporterHash, uint256 timestamp);
    
    // Event emitted when a report's status is updated
    event ReportStatusUpdated(uint256 indexed reportId, ReportStatus status);
    
    // Authorized entities that can update report status (e.g., law enforcement)
    mapping(address => bool) public authorizedEntities;
    
    // Owner of the contract
    address public owner;
    
    constructor() {
        owner = msg.sender;
        authorizedEntities[msg.sender] = true;
    }
    
    // Modifier to restrict certain actions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    // Modifier to restrict certain actions to authorized entities
    modifier onlyAuthorized() {
        require(authorizedEntities[msg.sender], "Caller is not authorized");
        _;
    }
    
    /**
     * @dev Add a new authorized entity
     * @param entity Address of the entity to authorize
     */
    function addAuthorizedEntity(address entity) external onlyOwner {
        authorizedEntities[entity] = true;
    }
    
    /**
     * @dev Remove an authorized entity
     * @param entity Address of the entity to deauthorize
     */
    function removeAuthorizedEntity(address entity) external onlyOwner {
        authorizedEntities[entity] = false;
    }
    
    /**
     * @dev Submit a new crime report
     * @param titleHash IPFS hash of the report title
     * @param descriptionHash IPFS hash of the report description
     * @param latitude Location latitude (multiplied by 1e6)
     * @param longitude Location longitude (multiplied by 1e6)
     * @param locationHash IPFS hash for more detailed location info (optional)
     * @param reporterHash Hashed identifier of the reporter
     * @param detailsHash IPFS hash for any additional report details
     * @return reportId The ID of the newly created report
     */
    function submitReport(
        string memory titleHash,
        string memory descriptionHash,
        int256 latitude,
        int256 longitude,
        string memory locationHash,
        bytes32 reporterHash,
        string memory detailsHash
    ) external returns (uint256 reportId) {
        reportCount++;
        reportId = reportCount;
        
        reports[reportId] = Report({
            id: reportId,
            titleHash: titleHash,
            descriptionHash: descriptionHash,
            location: Location({
                latitude: latitude,
                longitude: longitude,
                locationHash: locationHash
            }),
            timestamp: block.timestamp,
            status: ReportStatus.Pending,
            reporterHash: reporterHash,
            detailsHash: detailsHash
        });
        
        emit ReportCreated(reportId, reporterHash, block.timestamp);
        return reportId;
    }
    
    /**
     * @dev Update the status of a report
     * @param reportId ID of the report to update
     * @param status New status to set
     */
    function updateReportStatus(uint256 reportId, ReportStatus status) external onlyAuthorized {
        require(reportId <= reportCount, "Report does not exist");
        
        Report storage report = reports[reportId];
        report.status = status;
        
        emit ReportStatusUpdated(reportId, status);
    }
    
    /**
     * @dev Get report IDs by status
     * @param status Status to filter by
     * @param offset Starting index
     * @param limit Maximum number of reports to return
     * @return reportIds Array of report IDs with the specified status
     */
    function getReportsByStatus(
        ReportStatus status, 
        uint256 offset, 
        uint256 limit
    ) external view returns (uint256[] memory reportIds) {
        uint256 count = 0;
        
        // First, count how many reports match the status
        for (uint256 i = 1; i <= reportCount; i++) {
            if (reports[i].status == status) {
                count++;
            }
        }
        
        // Adjust limit if needed
        if (offset >= count) {
            return new uint256[](0);
        }
        
        uint256 resultSize = (offset + limit > count) ? (count - offset) : limit;
        reportIds = new uint256[](resultSize);
        
        uint256 resultIndex = 0;
        uint256 matchingCount = 0;
        
        // Fill the result array
        for (uint256 i = 1; i <= reportCount && resultIndex < resultSize; i++) {
            if (reports[i].status == status) {
                if (matchingCount >= offset) {
                    reportIds[resultIndex] = i;
                    resultIndex++;
                }
                matchingCount++;
            }
        }
        
        return reportIds;
    }
    
    /**
     * @dev Get reports by reporter hash
     * @param reporterHash Hash of the reporter's identifier
     * @param offset Starting index
     * @param limit Maximum number of reports to return
     * @return reportIds Array of report IDs submitted by the specified reporter
     */
    function getReportsByReporter(
        bytes32 reporterHash,
        uint256 offset,
        uint256 limit
    ) external view returns (uint256[] memory reportIds) {
        uint256 count = 0;
        
        // First, count how many reports match the reporter
        for (uint256 i = 1; i <= reportCount; i++) {
            if (reports[i].reporterHash == reporterHash) {
                count++;
            }
        }
        
        // Adjust limit if needed
        if (offset >= count) {
            return new uint256[](0);
        }
        
        uint256 resultSize = (offset + limit > count) ? (count - offset) : limit;
        reportIds = new uint256[](resultSize);
        
        uint256 resultIndex = 0;
        uint256 matchingCount = 0;
        
        // Fill the result array
        for (uint256 i = 1; i <= reportCount && resultIndex < resultSize; i++) {
            if (reports[i].reporterHash == reporterHash) {
                if (matchingCount >= offset) {
                    reportIds[resultIndex] = i;
                    resultIndex++;
                }
                matchingCount++;
            }
        }
        
        return reportIds;
    }
    
    /**
     * @dev Get the details of a specific report
     * @param reportId ID of the report to retrieve
     * @return Report details
     */
    function getReport(uint256 reportId) external view returns (
        string memory titleHash,
        string memory descriptionHash,
        int256 latitude,
        int256 longitude,
        string memory locationHash,
        uint256 timestamp,
        ReportStatus status,
        bytes32 reporterHash,
        string memory detailsHash
    ) {
        require(reportId <= reportCount, "Report does not exist");
        
        Report storage report = reports[reportId];
        
        return (
            report.titleHash,
            report.descriptionHash,
            report.location.latitude,
            report.location.longitude,
            report.location.locationHash,
            report.timestamp,
            report.status,
            report.reporterHash,
            report.detailsHash
        );
    }
}
