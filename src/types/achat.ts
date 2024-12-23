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

interface IAchat {
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

  // table achat
  date: string;
  reference: string;
  fournisseur: string;
  magasin: string;
  // status: string;
  total: string;
  // payé: string;
  // dû: string;
  // status_de_paiement: string;
}

export interface IAchatTable {
  date: string;
  reference: string;
  fournisseur: string;
  magasin: string;
  // status: string;
  total: string;
  // payé: string;
  // dû: string;
  // status_de_paiement: string;
}

export default IAchat;


// id: number;
// date: string;
// reference: string;
// fournisseur: string;
// magasin: string;
// status: string;
// total: string;
// payé: string;
// dû: string;
// status_de_paiement: string;