import { useEffect, useState } from "react";
import IssuanceLogTable from "../../components/IssuanceLogTable/IssuanceLogTable";
import "./IssuanceLog.scss";
import { getIssuedMaterial } from "../../utils/api";
import { IssuedMaterialLog } from "../../model";
import Loading from "../../components/Loading/Loading";
import TablesHeader from "../../components/TablesHeader/TablesHeader";


// you should set your vscode to format on save so you don't have to worry about formatting
const IssuanceLog = () => {
  const [searchField , setSearchField] = useState<string>("")
  const [issuedMaterial, setIssuedMaterial] = useState<IssuedMaterialLog[]>()
  useEffect(() => {
    // this try catch block is a repeat of your try catch block in your api function. You don't need it here.
    // instead of console.log your error, use a toast message or something to convey the error to the user.
    // you should have a loading state here to show the user that the data is being fetched.
    // you can do const {data} = await getIssuedMaterial() and then setIssuedMaterial(data) to be a little more readable.
    const fetchIssuedMaterials = async () => {
      try {
        const response = await getIssuedMaterial()
        setIssuedMaterial(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchIssuedMaterials();
  }, [])

  const onChangeHandler = (event :React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value
      setSearchField(value)
  }    

  // !issuedMaterial is not really indicating it is actually loading so it's a bit misleading.
  if(!issuedMaterial){
    return <Loading/>
  }

  // can just use material instead of eachMaterial
  // issuedMaterials would be a better name 
  // material_number is now a number? The variable name is kinda misleading. Maybe it is a number that you strinigified?
  const filteredArray =  issuedMaterial.filter((eachMaterial) =>{
    return eachMaterial.material_number.toLowerCase().includes(searchField.toLowerCase())
   })

  return (
    <section className="issuance-log">
      <TablesHeader title="Issuance Log" searchField={searchField} onChangeHandler={onChangeHandler} />
    
      <div className="issuance-log-table">
        <div className="issuance-log-table__header">
          <p className="issuance-log-table__title">MATERIAL NUMBER</p>
          <p className="issuance-log-table__title">Quantity</p>
          <p className="issuance-log-table__title">Size</p>
          <p className="issuance-log-table__title">Time Issued</p>
          <p className="issuance-log-table__title">Date Issued</p>
          <p className="issuance-log-table__title">Employees Issued</p>
        </div>
        <IssuanceLogTable issuedMaterial= {filteredArray} />
      </div>
    </section>
  )
}

export default IssuanceLog
