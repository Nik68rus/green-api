import { createContext, useCallback, useState } from "react";
import { IAuthData } from "../types";

interface IAuthContext {
  authData: IAuthData | null;
  logIn: (data: IAuthData) => void;
  logOut: () => void;
}

const initialState: IAuthContext = {
  authData: null,
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
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
