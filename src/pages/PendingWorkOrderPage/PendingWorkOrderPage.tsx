import { useEffect, useState } from "react";
import { getPendingWorkOrders } from "../../utils/api";
import { WorkOrder } from "../../model";
import PendingTableOrder from "../../components/PendingOrderTable/PendingTableOrder";
import Loading from "../../components/Loading/Loading";

const PendingWorkOrderPage = () => {
const [workOrders,setWorkOrders] = useState<WorkOrder[]>()
  

useEffect(() =>{
  try {
    const fetchWorkorders = async() =>{
    const response = await getPendingWorkOrders()
    setWorkOrders(response)
    console.log(response)
    }
    fetchWorkorders()
  } catch (error) {
    console.log(error)
  }
},[])


if(!workOrders){
  return <Loading/>
}

  return (
    <section>
      <PendingTableOrder workOrders = {workOrders}/> 
    </section>
  )
}

export default PendingWorkOrderPage;
