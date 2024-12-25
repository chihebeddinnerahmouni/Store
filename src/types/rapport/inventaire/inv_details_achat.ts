interface IProduct {
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
}

interface IProvider {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  amount_paid: string;
  code_provider: string;
  outstanding_balance: string;
  status: string;
  total_supplies: string;
}

interface IWarehouse {
  id: number;
  name: string;
  code_entreport: string;
  description: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

interface IInvDetails_achats {
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
  products: IProduct[];
  provider: IProvider;
  entrepot: IWarehouse;

  // table achat
  date: string;
  référence: string;
  nom_du_produit: string;
  fournisseur: string;
  magasin: string;
  quantité: number;
  total: string;
}

export default IInvDetails_achats;

export interface IInvDetails_achats_Table {
  date: string;
  référence: string;
  nom_du_produit: string;
  fournisseur: string;
  magasin: string;
  quantité: number;
  total: string;
}
