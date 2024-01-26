export interface IPresentation {
  presentation_id: number;
  created: string; 
  modified: string; 
  status: string;
  unit: number;
  unitName?: string;
  quantity: number;
  description: string;
  is_min: boolean;
}