  
import { getRequest, putWithFileRequest } from "./requestServices";
import { MemberDetail } from "models/MemberDetail";

export const getMe = (): Promise<MemberDetail> => {
  return getRequest(`/me`);
};

export const updateMe = (me: MemberDetail, picture: any): Promise<MemberDetail> => {
  return putWithFileRequest(`/me`, picture, me);
};