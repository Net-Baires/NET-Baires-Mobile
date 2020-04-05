
import { getRequest } from "./requestServices";
import { SpeakerDetail } from "app/models/Speaker";

export const getSpeakers = (count: number = 10): Promise<SpeakerDetail[]> => {
  return getRequest("/speakers");
};
export const getSpeaker = (id: number): Promise<SpeakerDetail> => {
  return getRequest(`/speakers/${id}`);
};
