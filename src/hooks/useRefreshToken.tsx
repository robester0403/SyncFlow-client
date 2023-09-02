import useAuth from "../hooks/useAuth";
import { getNewAccessToken } from "../utils/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const getAccessToken = async () => {
    try {
      const response = await getNewAccessToken();
      console.log(response);
      setAuth((prev) => ({ ...prev, accessToken: response.token }));
      return response.token;
    } catch (error) {
      console.log(error);
    }
  };

  return getAccessToken;
};

export default useRefreshToken;
