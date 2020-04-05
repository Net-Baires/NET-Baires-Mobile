export interface EventLiveDetail {
    id: number;
    title: string;
    description: string;
    platform: string;
    online: boolean;
    onlineLink: string;
    startLiveTime: string;
    hasGroupCodeOpen?: boolean;
    imageUrl: string;
    generalAttended: boolean;
    generalAttendance: ReportGeneralAttendance;
    membersDetails: Members;
    attended?: boolean;
    tokenToReportMyAttendance: string;
    groupCodes: GroupCodeResponse[];
  }
  export interface ReportGeneralAttendance {
    tokenToReportGeneralAttendance: string;
    generalAttendedCode: string;
  }
  export interface Members {
    totalMembersRegistered: number;
    totalMembersAttended: number;
    membersAttended: EventLiveDetailMemberDetail[];
    estimatedAttendancePercentage: number;
  }
  export interface EventLiveDetailMemberDetail {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    picture: string;
    attendedTime: string;
  }
  
  export interface GroupCodeResponse {
    id: number;
    code: string;
    detail: string;
    open: boolean;
    membersCount: number;
  }