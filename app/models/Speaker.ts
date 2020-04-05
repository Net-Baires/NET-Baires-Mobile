import { EventDetail } from "./EventDetail";
import { MemberDetail } from "./MemberDetail";

export interface SpeakerDetail {
    member: MemberDetail;
    countEventsAsSpeaker: number;
    events: EventDetail[];
}

export interface SpeakerInEvent {
    member: MemberDetail;
}