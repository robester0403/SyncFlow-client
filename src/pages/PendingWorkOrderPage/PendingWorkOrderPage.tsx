import { useEffect, useState } from "react";
import { getPendingWorkOrders } from "../../utils/api";
import { WorkOrder } from "../../model";
import PendingTableOrder from "../../components/PendingOrderTable/PendingTableOrder";
import Loading from "../../components/Loading/Loading";
import "./PendingWorkOrderPage.scss"
import TablesHeader from "../../components/TablesHeader/TablesHeader";
import Lottie from "lottie-react";
import outOfOreder  from "../../assets/animations/Out of Stock .json"
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

console.log(workOrders)
if(!workOrders){
  return <Loading/>
}

const filteredArray  = workOrders.filter((order) => {
   return order.workorder_Number.toLowerCase().includes(searchField.toLowerCase())})

  return (
    <section className="start-workorder-table">
      <TablesHeader title="New Workorders" searchField={searchField}  onChangeHandler={onChangeHandler}/>
       {workOrders.length === 0 ? <div className="start-workorder-table__out-of-workorders">
       <span className="start-workorder-table__message">No more new work orders available</span>
       <Lottie animationData={outOfOreder}
               loop={false} 
               autoplay={true} /></div>
            : <PendingTableOrder workOrders = {filteredArray}/> }
      
    </section>
  )
}

export default PendingWorkOrderPage;
