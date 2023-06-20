export interface WorkOrder {
  work_order_id: number;
  project_name: string;
  client_name: string;
  employee_name: string;
  workoder_Number: string;
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