import { getRequest, putRequest } from './requestServices';
import { EventDetail } from 'app/models/EventDetail';
import { EventLiveDetail } from 'app/models/EventLiveDetail';
import { CheckAttendanceGeneralResponse } from 'app/models/CheckAttendanceGeneralResponse';
import { SpeakerDetail, SpeakerInEvent } from 'app/models/Speaker';

// export const getNextEvent = (): Promise<EventDetail> => {
//   return fetch("http://localhost:3000/events/1").then(x => x.json());
// };

// export const syncEvents = (): Promise<MeEvent[]> => {
//   return putRequest("/events/sync");
// };
// export const syncEvent = (idEvent: number): Promise<MeEvent[]> => {
//   return putRequest(`/events/${idEvent}/sync`);
// };
// export const getEventsToSync = (): Promise<EventToSync[]> =>
//   getRequest("/events?done=false");
// export const getEvents = (): Promise<EventDetail[]> => getRequest("/events");
// export const getEventLive = (id: number): Promise<EventDetail> =>
//   getRequest(`/events/${id}/live`);
export const getLiveEventDetail = (id: number): Promise<EventLiveDetail> =>
  getRequest(`/events/${id}/live/detail`);


  export const getSpeakersOfEvent = (id: number): Promise<SpeakerInEvent> =>
  getRequest(`/events/${id}/speakers`);

  export const getEventsLive = (): Promise<EventDetail[]> => {
    return getRequest("/events?live=true");
  };

  export const getEventsUpcoming = (): Promise<EventDetail[]> => {
    return getRequest("/events?upcoming=true&done=false");
  };
  

// export const updateEvent = (
//   id: number,
//   event: UpdateEvent
// ): Promise<UpdateEvent> => {
//   return putRequest(`/events/${id}`, event);
// };

// export const getEvent = (id: number): Promise<EventDetail> =>
//   getRequest(`/events/${id}`);

// export const getEventToReportAttendance = (
//   id: number
// ): Promise<EventToReportAttendance> => getRequest(`/events/${id}/attendance`);
// export const getCheckAttendanceGeneral = (
//   id: number
// ): Promise<EventToReportAttendance> =>
//   getRequest(`/events/${id}/attendances/general`);

// export const reportAttendance = (
//   token: string
// ): Promise<ReportAttendanceResponse> => {
//   return putRequest(`/events/attendances/${token}`);
// };
// export const reportAttendanceGeneral = (
//   token: string
// ): Promise<CheckAttendanceGeneralResponse> => {
//   return putRequest(`/events/attendances/general/${token}`);
// };
export const reportAttendanceGeneralByCode = (
  id: number,
  code: string
): Promise<CheckAttendanceGeneralResponse> => {
  return putRequest(`/events/${id}/attendances/general/${code}`);
};
// export const createGroupCode = (
//   eventId: number,
//   detail: string
// ): Promise<CreateGroupCodeResponse> =>
//   postRequest(`/events/${eventId}/groupCodes`, { detail: detail });

// export const addCodeToGroupCode = (
//   eventId: number,
//   code: string
// ): Promise<AddMemberToGroupCodeResponse> => {
//   return postRequest(`/events/${eventId}/groupcodes/${code}`);
// };
// export const addMemberToGroupCode = (
//   groupCodeId: number,
//   eventId: number,
//   memberId: number
// ): Promise<boolean> => {
//   return postRequest(`/events/${eventId}/groupcodes/${groupCodeId}/members/${memberId}`);
// };

// export const deleteMemberFromGroupCode = (
//   groupCodeId: number,
//   eventId: number,
//   memberId: number
// ): Promise<boolean> => {
//   return deleteRequest(`/events/${eventId}/groupcodes/${groupCodeId}/members/${memberId}`);
// };
// export interface ReportAttendanceResponse {
//   eventId: number;
//   memberId: number;
// }
