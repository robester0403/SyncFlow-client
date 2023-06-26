import { useEffect, useState } from "react";
import { getPendingWorkOrders } from "../../utils/api";
import { WorkOrder } from "../../model";
import PendingTableOrder from "../../components/PendingOrderTable/PendingTableOrder";
import Loading from "../../components/Loading/Loading";
import "./PendingWorkOrderPage.scss"
import TablesHeader from "../../components/TablesHeader/TablesHeader";

const PendingWorkOrderPage = () => {
const [workOrders,setWorkOrders] = useState<WorkOrder[]>();
const [searchField , setSearchField] = useState<string>("")
  

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


const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
 const value = e.target.value;
 setSearchField(value);
}


if(!workOrders){
  return <Loading/>
}

const filteredArray  = workOrders.filter((order) => {
   return order.workorder_Number.toLowerCase().includes(searchField.toLowerCase())})

  return (
    <section className="start-workorder-table">
      <TablesHeader title="New Workorders" searchField={searchField}  onChangeHandler={onChangeHandler}/>
      <PendingTableOrder workOrders = {filteredArray}/> 
    </section>
  )
}

export default PendingWorkOrderPage;
