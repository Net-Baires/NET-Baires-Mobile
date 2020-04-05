import { getRequest, postRequest, deleteRequest } from './requestServices';
import { MemberDetail } from 'app/models/MemberDetail';
import { BadgeMemberDetail } from 'app/models/BadgeDetail';
import { Following } from 'app/models/Following';

export const getBadgesFromMember = (memberId: number): Promise<BadgeMemberDetail[]> => {
  return getRequest(`/members/${memberId}/badges`);
};

export const getBadgeFromMember = (memberId: number, badgeId: number): Promise<BadgeMemberDetail> => {
  return getRequest(`/members/${memberId}/badges/${badgeId}`);
};

export const getMemberByQuery = (query: string): Promise<MemberDetail[]> => {
  return getRequest(`/members/${query}`);
};

export const getFollowings = (memberId: number): Promise<Following[]> => {
  return getRequest(`/members/${memberId}/followings`);
};

export const getMemberDetail = (id: number): Promise<MemberDetail> => {
  return getRequest(`/members/${id}`);
};

export const followMember = (memberId:number): Promise<any> => {
  return postRequest(`/members/${memberId}/follow`);
};

export const unFollowMember = (memberId:number): Promise<any> => {
  return deleteRequest(`/members/${memberId}/unFollow`);
};
// export interface UpdateInformation {
//   pushNotificationId?: string;
// }
