export interface IBestSell {
  product_id: number;
  product_code: string;
  product_name: string;
  total_quantity_sold: string;
    total_sales_cost: string;
    
    // table
    id: number;
    produit: string;
    code: string;
    "quantité vendue": string;
    total: string;
}

export interface IBestSellTable {
    id: number;
    code: string;
    produit: string;
    "quantité vendue": string;
    total: string;
    }