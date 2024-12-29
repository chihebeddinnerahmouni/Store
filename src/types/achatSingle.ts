export interface IProvider {
    id: number;
    code_provider: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    total_supplies: string;
    amount_paid: string;
    outstanding_balance: string;
    created_by: number;
    updated_by: number | null;
    deleted_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface IProduct {
    id: number;
    name: string;
    code_barre: string;
    category_id: number;
    brand_id: number;
    unit_id: number;
    rayonage_id: number;
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
}

export interface IProductDetails {
  id: number;
  achat_id: number;
  product_id: number;
  unit_price: string;
  quantity_declared: number;
  quantity_remaining: number;
  remise: string;
  tax: string;
  subtotal: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  product: IProduct;

    // table
    grand_total: string;
  produit: string;
  quantité: number;
}

export interface IEntrepot {
    id: number;
    code_entreport: string;
    name: string;
    description: string;
    created_by: number;
    updated_by: number | null;
    deleted_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface IAchatSingle {
    id: number;
    provider_id: number;
    invoice_number: string;
    user_invoice_number: string;
    entrepot_id: number;
    total_cost: string;
    livraison_cost: string;
    remarks: string | null;
    created_by: number;
    updated_by: number | null;
    deleted_by: number | null;
    created_at: string;
    updated_at: string;
    provider: IProvider;
    products: IProductDetails[];
    serial_numbers: string[];
    entrepot: IEntrepot;
}

export interface IAchatSingleTable {
    id: number;
    produit: string;
    quantité: number;
    grand_total: string;


}