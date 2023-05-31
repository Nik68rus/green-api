import { createContext, useCallback, useState } from "react";
import { IAuthData } from "../types";

interface IAuthContext {
  authData: IAuthData | null;
  authorized: boolean;
  setAuthorizationStatus: (status: boolean) => void;
  logIn: (data: IAuthData) => void;
  logOut: () => void;
}

const initialState: IAuthContext = {
  authData: null,
  authorized: false,
  setAuthorizationStatus: () => {
    /*changeAuthorizationStatusHandler*/
  },
  logIn: () => {
    /*loginHandler*/
  },
  logOut: () => {
    /*logoutHandler*/
  },
};

const AuthContext = createContext<IAuthContext>(initialState);

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<IAuthData | null>(null);
  const [authorized, setAuthorized] = useState(false);

  const logIn = useCallback((data: IAuthData) => {
    setAuthData(data);
  }, []);

  const logOut = useCallback(() => {
    setAuthData(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData,
        authorized,
        setAuthorizationStatus: setAuthorized,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
