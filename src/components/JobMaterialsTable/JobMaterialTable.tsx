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

interface Props {
    setCheckedMaterials: React.Dispatch<React.SetStateAction<Material[]>>
    checkedMaterials: Material[]
}

const JobMaterialTable: React.FC<Props> = ({ setCheckedMaterials, checkedMaterials }) => {
    const params = useParams();
    const [recievedJobMaterial, setRecievedJobMaterial] = useState<Material[]>([]);
    const [inTransitMaterial, setIsTransitMaterial] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { id } = params
    useEffect(() => {
        const fetchMaterials = async () => {
            const response = await getMaterials(id);

            setRecievedJobMaterial(response.filter((material: Material) => {
                return material.status === "received"
            }));

            setIsTransitMaterial(response.filter((material: Material) => {
                return material.status !== "received"
            }))

            setIsLoading(false)
        }
        fetchMaterials()
    }, [checkedMaterials])

    if (isLoading) {
        return <div>Loading....</div>
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId) {
            return;
        }

        // If source and destination are different lists, do the regular status update and move
        let sourceMaterials = source.droppableId === 'InTransitList' ? inTransitMaterial : recievedJobMaterial;
        let targetMaterials = destination.droppableId === 'InTransitList' ? inTransitMaterial : recievedJobMaterial;

        let movedMaterial = sourceMaterials[source.index];
        let previousStatus = movedMaterial.status;
        let updatedStatus = source.droppableId === 'InTransitList' ? "received" : "in-transit";

        movedMaterial.status = updatedStatus;
        movedMaterial.receive_date = updatedStatus === "received" ? new Date().toISOString() : "";

        try {
            await updateMaterialStatus(result.draggableId, { status: updatedStatus });
        } catch (error) {
            console.error("Error updating material status: ", error);

            movedMaterial.status = previousStatus;
            movedMaterial.receive_date = previousStatus === "received" ? new Date().toISOString() : "";
            return;
        }

        sourceMaterials = [...sourceMaterials.slice(0, source.index), ...sourceMaterials.slice(source.index + 1)];

        targetMaterials = [...targetMaterials.slice(0, destination.index), movedMaterial, ...targetMaterials.slice(destination.index)];

        if (source.droppableId === 'InTransitList') {
            setIsTransitMaterial(sourceMaterials);
            setRecievedJobMaterial(targetMaterials);
        } else {
            setIsTransitMaterial(targetMaterials);
            setRecievedJobMaterial(sourceMaterials);
        }
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className="material-tables">
                <Droppable droppableId="RecievedList">
                    {
                        (provided, snapshot) => (
                            <div className={`material-tables__recieved ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                ref={provided.innerRef}
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
                        (provided, snapshot) => (
                            <div className={`material-tables__recieved ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                ref={provided.innerRef}
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
