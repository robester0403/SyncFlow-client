import axios from "axios";
import { IssuedMaterial} from "../model";

const materialURL = "http://localhost:8080/materials";
const workOrderURL = "http://localhost:8080/workorders";
const locationURL = "http://localhost:8080/location";



export const getWorkOrders = async(id : string | undefined) =>{
  try{
     const response = await axios.get(`${workOrderURL}/${id}/workoder`)
     return response.data     
  }catch (err){
    console.log(err, "workOrders")
  }
}

export const getMaterials =async (id : string  | undefined) =>{
    try {
        const  response = await axios.get(`${materialURL}/${id}`)
       return response.data
    } catch (error) {
        console.log(error ,"")
    }
}

export const updateMaterialStatus = async(draggableId :  string, updatedStatus : {status : string}) =>{
   try {
     await  axios.put(`${materialURL}/${draggableId}`,updatedStatus)
   } catch (error) {
    console.log(error, "Material Status Update")
   } 

}

export const issueMaterial =async (materialId : number,issuedMaterial:IssuedMaterial) => {
    try {
      axios.post(`${materialURL}/${materialId}`,issuedMaterial)   
    } catch (error) {
        console.log(error, "Issue Material")
    }
}

export const getIssuedMaterial =async () => {
    const response = await axios.get(materialURL + "/material/issued")
    return response; 
}