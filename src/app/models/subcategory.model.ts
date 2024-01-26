export interface ISubcategory { 
  subcategory_id: number; 
  created: string; 
  modified: string; 
  status: string; 
  code: string; 
  description: string; 
  categoryDescription?: string;
  order: number; 
  category: number; 
}