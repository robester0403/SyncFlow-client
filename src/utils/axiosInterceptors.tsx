import axios from "axios";
const URL = import.meta.env.VITE_BASE_URL as string;

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const getNewAccessToken = async () => {
  try {
    const response = await axios.get(`${URL}/refresh_token`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useAxiosPrivate = (accessToken: string) => {
  const requestInterceptor = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
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
        const token = await getNewAccessToken();
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
};
