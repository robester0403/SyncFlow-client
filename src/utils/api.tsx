import axios from "axios";
import { IssuedMaterial} from "../model";

const materialURL = "http://localhost:8080/materials";
const workOrderURL = "http://localhost:8080/workorders";
const locationURL = 'http://localhost:8080/location';
const employeeURL = 'http://localhost:8080/employee';

// Api request get on Workorders
export const getWorkOoder = async () => {
  try {
    const response = await axios.get(workOrderURL)
    return response.data
  } catch (error) {
    console.log(error, "workOrders")
  }
}


export const getWorkOrderDetails = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${workOrderURL}/${id}/workoder`)
    return response.data
  } catch (err) {
    console.log(err, "workOrderDetails")
  }
}

// Api request for materials
export const getMaterials = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${materialURL}/${id}`)
    return response.data
  } catch (error) {
    console.log(error, "")
  }
}

export const updateMaterialStatus = async (draggableId: string, updatedStatus: { status: string }) => {
  try {
    await axios.put(`${materialURL}/${draggableId}`, updatedStatus)
  } catch (error) {
    console.log(error, "Material Status Update")
  }

}

export const issueMaterial = async (materialId: number, issuedMaterial: IssuedMaterial) => {
  try {
    axios.post(`${materialURL}/${materialId}`, issuedMaterial)
  } catch (error) {
    console.log(error, "Issue Material")
  }
}

export const getIssuedMaterial = async () => {
  const response = await axios.get(materialURL + "/material/issued")
  return response;
}

export const updateMaterialLocation = async(id:string,updatedLocation :{location : number} ) =>{
  try {
    await axios.patch(`${materialURL}/${id}`,updatedLocation)
    
  } catch (error) {
     console.log(error, "update material location")
  }
}


export const getLocations = async() =>{
  try {
    const response = await axios.get(locationURL)
       return response.data
     }
   catch (error) {
    console.log(error,"Locations")
  }
}

export const getPendingWorkOrders = async () => {
  try {
    const response = await axios.get(`${workOrderURL}/pending`)
    return response.data
  } catch (error) {
    console.log(error, " pendingWorkorders")
  }
}

export const getEmployees =async () => {
  try {
    const response = await axios.get(employeeURL)
    return response.data
  } catch (error) {
    console.log(error, "employees")
  }

}

export const initateWorkOrder = async(data : {work_order_id : number , employee_id : number}) =>{
  try {
    axios.post(workOrderURL,data)
  
  } catch (error) {
   console.log(error) 
  }
}