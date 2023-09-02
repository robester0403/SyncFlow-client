import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IssuedMaterial } from "../model";

const URL = import.meta.env.VITE_BASE_URL as string;
const materialURL = `${URL}/materials`;
export const workOrderURL = `${URL}/workorders`;
export const locationURL = `${URL}/location`;
const employeeURL = `${URL}/employee`;

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const getAllWorkOrders = async (authToken: string) => {
  try {
    const response = await axios.get(workOrderURL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error, "workOrders");
  }
};

export const getWorkOrderDetails = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${workOrderURL}/${id}/workoder`);
    return response.data;
  } catch (err) {
    console.log(err, "workOrderDetails");
  }
};

export const getMaterials = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${materialURL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error, "");
  }
};

export const updateMaterialStatus = async (
  draggableId: string,
  updatedStatus: { status: string }
) => {
  try {
    await axios.put(`${materialURL}/${draggableId}`, updatedStatus);
  } catch (error) {
    console.log(error, "Material Status Update");
  }
};

export const issueMaterial = async (
  materialId: number,
  issuedMaterial: IssuedMaterial
) => {
  try {
    axios.post(`${materialURL}/${materialId}`, issuedMaterial);
  } catch (error) {
    console.log(error, "Issue Material");
  }
};

export const getIssuedMaterial = async () => {
  const response = await axios.get(materialURL + "/material/issued");
  return response;
};

export const updateMaterialLocation = async (
  id: string,
  updatedLocation: { location: number }
) => {
  try {
    await axios.patch(`${materialURL}/${id}`, updatedLocation);
  } catch (error) {
    console.log(error, "update material location");
  }
};

export const getLocations = async () => {
  try {
    const response = await axios.get(locationURL);
    return response.data;
  } catch (error) {
    console.log(error, "Locations");
  }
};

export const getPendingWorkOrders = async () => {
  try {
    const response = await axios.get(`${workOrderURL}/pending`);
    return response.data;
  } catch (error) {
    console.log(error, " pendingWorkorders");
  }
};

export const getEmployees = async (authToken: string) => {
  const axiosPrivateInstance = useAxiosPrivate();
  try {
    const response = await axiosPrivateInstance.get(employeeURL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error, "employees");
  }
};

export const initateWorkOrder = async (data: {
  work_order_id: number;
  employee_id: number;
}) => {
  try {
    axios.post(workOrderURL, data);
  } catch (error) {
    console.log(error);
  }
};

export const getNewAccessToken = async () => {
  try {
    const response = await axios.get(`${URL}/refresh`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const authentication = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${URL}/login`, {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.msg;
      return message;
    }
  }
};

export const getUserDetails = async (authToken: string) => {
  try {
    const getData = await axios.get(`${employeeURL}/userInfo`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return getData;
  } catch (error) {
    console.log(error);
  }
};
