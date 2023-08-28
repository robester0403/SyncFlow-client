import { useEffect } from "react";
import { axiosPrivate } from "../utils/api";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInrerceptor = axiosPrivate.interceptors.response.use(
      (resposne) => resposne,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.staus === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const token = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // eject the interceptor when no longer needed and dosen't keep on piling up
    return () => {
      axiosPrivate.interceptors.response.eject(responseInrerceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
