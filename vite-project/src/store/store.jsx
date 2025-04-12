import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <authContext.Provider value={{user, setUser, isLogin, setIsLogin}}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
}