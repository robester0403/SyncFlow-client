import { getMaterials, updateMaterialStatus } from "../../utils/api";
import JobMAterialTableHeader from "../JobMaterialTableHeader/JobMAterialTableHeader";
import JobMaterialsRow from "../JobMaterialsRow/JobMaterialsRow'";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Material } from "../../model";

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
// styles
import "./JobMaterialTable.scss"
import IntransitTable from "../IntransitTable/IntransitTable";
import IntransitHeader from "../IntransitHeader/IntransitHeader";

interface Props{
    setCheckedMaterials : React.Dispatch<React.SetStateAction<Material[]>>
}


const JobMaterialTable : React.FC<Props> = ({setCheckedMaterials}) => {
    const params = useParams();
    const [recievedJobMaterial, setRecievedJobMaterial] = useState<Material[]>([]);
    const [inTransitMaterial, setIsTransitMaterial] = useState<Material[]>([]);   
    const [isLoading, setIsLoading] = useState<boolean>(true)
     const {id } = params
    useEffect(() => {
       getMaterials(id,setRecievedJobMaterial,setIsTransitMaterial,setIsLoading)
    }, [])

    if (isLoading) {
        return <div>Loading....</div>
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId || destination.index === source.index) return;
         
  
        // if (source.droppableId === 'InTransitList') {
        //     axios.put(`http://localhost:8080/materials/${result.draggableId}`,{status : "received"})
        //     .then(() =>{
        //         getMaterials() 
        //     })
          
        // } else {
        //     axios.put(`http://localhost:8080/materials/${result.draggableId}`,{status : "in-transit"})
        //     .then(() =>{
        //         getMaterials() 
        //       })
        // }

        let add,
        inTransit =  inTransitMaterial,
        recieved  =recievedJobMaterial;
        if(source.droppableId === 'InTransitList' ){
          add = inTransit[source.index];
          updateMaterialStatus(result.draggableId,{status : "received"})
          inTransit.splice(source.index,1);
        }else{
            updateMaterialStatus(result.draggableId,{status : "in-transit"})
          add = recieved[source.index];
          recieved.splice(source.index, 1);
        }

        if(destination.droppableId === 'InTransitList' ){
      
          inTransit.splice(destination.index,0, add);
        }else{
          recieved.splice(destination.index,0, add);
        }
        setIsTransitMaterial(inTransit);
        setRecievedJobMaterial(recieved)

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className="material-tables">
                <Droppable droppableId="RecievedList">
                    {
                        (provided) => (
                            <div className="material-tables__recieved" ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <JobMAterialTableHeader />
                                {
                                    recievedJobMaterial.map((material: Material, index) => {
                                        return <JobMaterialsRow key={material.material_id}
                                                                 material={material}
                                                                 index={index} 
                                                                 setCheckedMaterials={setCheckedMaterials}
                                                                 />
                                                                
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }

                </Droppable>
                <Droppable droppableId="InTransitList" >
                    {
                        (provided) => (
                            <div className="material-tables__inTransit" ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <IntransitHeader />
                                {
                                    inTransitMaterial.map((material: Material, index) => {
                                        return <IntransitTable key={material.material_id}
                                            material={material}
                                            index={index} />
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }

                </Droppable>
            </section>
        </DragDropContext>
    )
}

export default JobMaterialTable
