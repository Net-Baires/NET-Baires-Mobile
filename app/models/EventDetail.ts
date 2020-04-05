export interface EventDetail {
    id: number;
    title: string;
    description: string;
    platform: string;
    url: string;
    eventId: string;
    done: boolean;
    live: boolean;
    online: boolean;
    date: string;
    isUserRegistered: boolean;
    generalAttended: boolean;
    attended: number;
    didNotAttend: number;
    registered: number;
    sponsors: any[];
    imageUrl: string;
    onlineLink: string;
}

