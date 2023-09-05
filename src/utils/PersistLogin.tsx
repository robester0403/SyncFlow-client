// tools
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// custom hooks
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth"; // auth context
import Loading from "../components/Loading/Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    // if we have a auth token, then we are logged in then we canset the state to false else we are not logged in
    {
      !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
