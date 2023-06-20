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
const getMaterials = () =>{
    axios.get(`http://localhost:8080/materials/${params.id}`)
    .then((res) => {
        setRecievedJobMaterial(res.data.filter((material: Material) => {
            return material.status === "received"
        }));

        setIsTransitMaterial(res.data.filter((material: Material) => {
            return material.status !== "received"
        }))

        setIsLoading(false)
    }).catch((err) =>{
        console.log(err)
    })
}

    useEffect(() => {
       getMaterials
    }, [])

    if (isLoading) {
        return <div>Loading....</div>
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

  
        if (source.droppableId === 'InTransitList') {
            axios.put(`http://localhost:8080/materials/${result.draggableId}`,{status : "received"})
            .then(() =>{
                getMaterials() 
            })
          
        } else {
            axios.put(`http://localhost:8080/materials/${result.draggableId}`,{status : "in-transit"})
            .then(() =>{
                getMaterials() 
              })
        }

    }



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className="tables">
                <Droppable droppableId="RecievedList">
                    {
                        (provided) => (
                            <div className="recieved-table" ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <JobMAterialTableHeader />
                                {
                                    recievedJobMaterial.map((material: Material, index) => {
                                        return <JobMaterialsRow key={material.material_id}
                                            material={material}
                                            index={index} />
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
                            <div className="inTransit-table" ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <JobMAterialTableHeader />
                                {
                                    inTransitMaterial.map((material: Material, index) => {
                                        return <JobMaterialsRow key={material.material_id}
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
