import { getRequest, putRequest } from "./requestServices";
import { EventsAttendees } from "app/models/EventsAttendees";

export const getAttendees = (idEvent: number): Promise<EventsAttendees[]> => {
  return getRequest(`/events/${idEvent}/attendees`);
};
export const updateAttendee = (
  idEvent: number,
  idMember: number,
  attendee: EventsAttendees
): Promise<EventsAttendees[]> => {
  return putRequest(`/events/${idEvent}/members/${idMember}/attende`, attendee);
};
