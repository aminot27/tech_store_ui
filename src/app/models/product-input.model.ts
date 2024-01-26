export interface IProductInput {
  product_input_id: number;
  created: string; 
  modified: string; 
  status: string; 
  product_id: number; 
  quantity: number;
  movement_date: string;
  reason?: string; 
}