export interface IClient {
    id: number;
    code_client: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    total_purchases: string;
    outstanding_balance: string;
    created_by: number;
    updated_by: number;
    deleted_by: number | null;
    created_at: string;
    updated_at: string;
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

interface IPivot {
    vente_id: number;
    product_id: number;
    quantity_sold: number;
    unit_price: string;
    remise: string;
    tax: string;
    subtotal: string;
    created_by: number;
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
    pivot: IPivot;

    // table
    grand_total: string;
    produit: string;
    quantité: number;
    tax: string;
    prix_unitaire: string;
    code: string;
}

export interface IAchatSingle {
    id: number;
    client_id: number;
    entrepot_id: number;
    invoice_number: string;
    user_invoice_number: string;
    date: string;
    livraison_cost: string;
    tax: string;
    remise: string;
    total_cost: string | null;
    remarks: string | null;
    status: string;
    created_by: number;
    updated_by: number | null;
    deleted_by: number | null;
    created_at: string;
    updated_at: string;
    client: IClient;
    entrepot: IEntrepot;
    products: IProduct[];
}

export interface IVenteSingleTable {
  id: number;
  produit: string;
  quantité: number;
  grand_total: string;
  tax: string;
  prix_unitaire: string;
  code: string;
}