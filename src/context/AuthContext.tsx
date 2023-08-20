

import { createContext, useState } from "react";

type AuthContextType = {
 auth : {
  role : string,
  authorized : boolean,
  employeeName : string,
  accessToken : string
} ,
setAuth :  React.Dispatch<React.SetStateAction<{
  role: string;
  authorized: boolean;
  employeeName: string;
  accessToken: string;
}>>
}

const defaultAuth ={
  role : "",
  authorized : false,
  employeeName : "",
  accessToken : ""
}
 const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const [auth, setAuth] = useState(defaultAuth);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;