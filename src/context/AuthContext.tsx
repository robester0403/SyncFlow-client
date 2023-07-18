

import { createContext, useState } from "react";

type AuthorizationContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

export const AuthorizationContext = createContext<AuthorizationContextType>([
  false,
  () => {}
]);

interface AuthorizationProviderProps {
  children: React.ReactNode;
}

export const AuthorizationProvider = ({
  children
}: AuthorizationProviderProps) => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  return (
    <AuthorizationContext.Provider value={[authorized, setAuthorized]}>
      {children}
    </AuthorizationContext.Provider>
  );
};
