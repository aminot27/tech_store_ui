export interface IProduct{
  product_id: number;
  sku: string;
  name: string;
  description: string;
  small_description: string;
  brand: number;
  brandName?: string;
  isNew: boolean;
  actualPrice: number;
  productCode: string;
  manufacturerCode: string;
  warrantyLevel: string;
  stock: number;

  product_code?: string;
}