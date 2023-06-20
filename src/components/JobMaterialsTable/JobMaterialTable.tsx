import axios from "axios";
import JobMAterialTableHeader from "../JobMaterialTableHeader/JobMAterialTableHeader";
import JobMaterialsRow from "../JobMaterialsRow/JobMaterialsRow'";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Material } from "../../interface";

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
// styles
import "./JobMaterialTable.scss"



const JobMaterialTable = () => {
    const params = useParams();
    const [recievedJobMaterial, setRecievedJobMaterial] = useState<Material[]>([]);
    const [inTransitMaterial, setIsTransitMaterial] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        axios.get(`http://localhost:8080/materials/${params.id}`)
            .then((res) => {
                setRecievedJobMaterial(res.data.filter((material: Material) => {
                    return material.status === "received"
                }));

                setIsTransitMaterial(res.data.filter((material: Material) => {
                    return material.status !== "received"
                }))

                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div>Loading....</div>
    }

    const onDragEnd = (result: DropResult) =>{
      const {source, destination} = result;

      if(!destination)return;
      if(destination.droppableId === source.droppableId && 
        destination.index === source.index ) return;
    
      let add,
          inTransit =  inTransitMaterial,
          recieved  =recievedJobMaterial;
          if(source.droppableId === 'InTransitList' ){
            add = inTransit[source.index];
            inTransit.splice(source.index,1);
          }else{
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
        <DragDropContext onDragEnd={ onDragEnd}>
            <section className="tables">
                <Droppable droppableId="RecievedList">
                    {
                        (provided) => (
                            <div className="recieved-table" ref={provided.innerRef}
                                                            {...provided.droppableProps}>
                                <JobMAterialTableHeader />
                                {
                                    recievedJobMaterial.map((material: Material,index) => {
                                        return <JobMaterialsRow key={material.material_id}
                                                                material={material}
                                                                index ={index}  />
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
                            <div className="inTransit-table"  ref={provided.innerRef}
                                                              {...provided.droppableProps}>
                                <JobMAterialTableHeader />
                                {
                                    inTransitMaterial.map((material: Material,index) => {
                                        return <JobMaterialsRow key={material.material_id} 
                                                                material={material}
                                                                index ={index} />
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
