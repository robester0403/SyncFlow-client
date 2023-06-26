export interface WorkOrder {
  work_order_id: number;
  project_name: string;
  client_name: string;
  employee_name: string;
  workorder_Number: string;
  details?: string;
}

export interface Material {
  location: string;
  location_id: number;
  material_id: number;
  material_number: string;
  quantity: number;
  receive_date: string;
  size: string
  status: string;
  work_order_id: number;
}


export interface Locations {
  location_id: number;
  location: string;
}


export interface IssuedMaterial {
  material_number: string;
  quantity: number;
  size: string;
  issued_employee : string;
  work_order_id: number;
} 

export interface IssuedMaterialLog extends IssuedMaterial {
  issuanceLog_id: number;
  issued_time : string;
  issued_employee : string;
  issued_date : string;

}

export interface Employee{
  employee_id: number,
  employee_name: string,
  employee_number: string
}