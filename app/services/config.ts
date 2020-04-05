import Config from "react-native-config";

export const Configuration: IConfig = {
  api: {
    url: Config.API_URL,
  },
  site: {
    url: Config.SITE_URL,
  },
  oauth: {
    meetup: {
      clientId: Config.MEETUP_OUATH_CLIENT_ID,
      url: Config.MEETUP_OAUTH_URL
    },
  },
};

export interface IConfig {
  api: {
    url: string;
  };
  site: {
    url: string;
  };
  oauth: {
    meetup: {
      clientId: string;
      url:string;
    };
  };
}

export default Configuration;
let _token = "";
export const getGlobalToken = () => _token;
export const setGlobalToken = (token: string) => (_token = token);
