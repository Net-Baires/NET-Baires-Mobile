import React, { Context, useState, useEffect } from "react";
import { getData, StoreKeys, removeData } from "app/services/storeService";
import { storeData } from "../services/storeService";
import { getMe } from "app/services/profileServices";
import { MemberDetail } from "models/MeDetail";
import { setGlobalToken } from "app/services/config";
// const {Provider,Consumer} = React.createContext<AuthContext>({
//   token: ""
// });
export let AuthContext: Context<AuthContext>;
const { Provider, Consumer } = (AuthContext = React.createContext<AuthContext>({
  token: "",
  login: (token: string) => {},
  logOff: () => {},
  authenticated: false,
  meDetail: {} as MemberDetail,
  updateMeDetail: (meDetail: MemberDetail) => {}
}));
const AuthProvider: React.SFC = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [meDetail, setMeDetail] = useState<MemberDetail>({} as MemberDetail);
  useEffect(() => {
    getData(StoreKeys.LoginToken).then(token => handleLogin(token!));
  }, []);
  const handleLogin = (token: string) => {
    if (token == null) throw new Error("El token no puede ser vacio");
    storeData(StoreKeys.LoginToken, token);
    setAuthenticated(true);
    setToken(token);
    setGlobalToken(token);
    var a = getMe().then(me => {
      setMeDetail(me);
    });
  };
  const handleLogOff = () => {
    removeData(StoreKeys.LoginToken);
    setAuthenticated(false);
    setToken("");
    setGlobalToken("");
  };
  const handleUpdateMeDetail = (meDetail: MemberDetail) => {
    setMeDetail(meDetail);
  };
  return (
    <Provider
      value={{
        token: token,
        login: handleLogin,
        logOff: handleLogOff,
        authenticated: authenticated,
        meDetail: meDetail,
        updateMeDetail: handleUpdateMeDetail
      }}
    >
      {children}
    </Provider>
  );
};
export interface AuthContext {
  token?: string;
  login: (token: string) => void;
  logOff: () => void;
  authenticated: boolean;
  meDetail: MemberDetail;
  updateMeDetail: (meDetail: MemberDetail) => void;
}

export { AuthProvider, Consumer as AuthConsumer };
