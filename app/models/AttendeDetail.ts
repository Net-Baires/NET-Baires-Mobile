export interface AttendeDetailMemberDetail {
    id: number;
    firstName: string;
    firstLogin: Date;
    picture: string;
    blocked: boolean;
    organized: boolean;
    colaborator: boolean;
    averageAttendance: number;
    eventsRegistered: number;
    eventsAttended: number;
    eventsNoAttended: number;
    email: string;
    lastName: string;
}

export interface AttendeDetail {
    didNotAttend: boolean;
    attended: boolean;
    notifiedAbsence: boolean;
    doNotKnow: boolean;
    organizer: boolean;
    speaker: boolean;
    averageAttendance: number;
    memberDetail: AttendeDetailMemberDetail;
}