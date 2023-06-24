import axios from "axios";
import { IssuedMaterial, Material, WorkOrder } from "../model";

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

export const getMaterials =async (id : string  | undefined,
                                   setRecievedJobMaterial :React.Dispatch<React.SetStateAction<Material[]>>,
                                   setIsTransitMaterial :  React.Dispatch<React.SetStateAction<Material[]>>,
                                   setIsLoading :  React.Dispatch<React.SetStateAction<boolean>>) =>{
    try {
        const  response = await axios.get(`${materialURL}/${id}`)
      
        setRecievedJobMaterial(response.data.filter((material: Material) => {
            return material.status === "received"
        }));

        setIsTransitMaterial(response.data.filter((material: Material) => {
            return material.status !== "received"
        }))

        setIsLoading(false)
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