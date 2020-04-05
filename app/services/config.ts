const Config: IConfig = {
  api: {
    url: "https://net-baires-api-dev.azurewebsites.net/"
  }
};

export interface IConfig {
  api: {
    url: string;
  };
}

export default Config;
let _token = "";
export const getGlobalToken = () => _token;
export const setGlobalToken = (token: string) => (_token = token);
