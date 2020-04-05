import { postRequest } from "./requestServices";
import { LoginToken } from "app/models/LoginToken";


export const loginWithMeetupToken = (token: string): Promise<LoginToken> => {
  return loginSocialMedia("/Auth/Meetup", token);
};

export const loginWithEventBriteToken = (token: string): Promise<LoginToken> => {
  return loginSocialMedia("/Auth/Eventbrite", token);
};

const loginSocialMedia = (url: string, token: string): Promise<LoginToken> =>
  postRequest(url, { Token: token });