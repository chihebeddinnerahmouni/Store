export interface ICategory {
    id: number;
    code_category: string;
    name_category: string;
    description: string;
    status: string;
    deleted_by: number | null;
    created_by: number;
    updated_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface IBrand {
  id: number;
  code_brand: string;
  name_brand: string;
  description: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface IUnit {
  id: number;
  code_unit: string;
  name_unit: string;
  description: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface IReyonage {
  id: number;
  code_location: string;
  name: string;
  description: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

interface IProductSingle {
  id: number;
  name: string;
  code_barre: string;
  category_id: number;
  brand_id: number;
  unit_id: number;
  reyonage_id: number;
  tax_percentage: string;
  description: string;
  price_buy: string;
  price_sell: string;
  stock_alert: number;
  quantity: number;
  has_serial_number: number;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  category: ICategory;
  brand: IBrand;
  unit: IUnit;
  rayonage: IReyonage;

  // table
  designation: string;
  code: string;
  marque: string;
  categorie: string;
  cout: string;
  prix: string;
  unité: string;
  rayon: string;
  quantité: number;

}


export default IProductSingle;

export interface IProductTable { 
  id: number;
  designation: string;
  code: string;
  marque: string;
  categorie: string;
  cout: string;
  prix: string;
  unité: string;
  rayon: string;
  quantité: number;
}