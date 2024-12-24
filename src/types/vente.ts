interface Client {
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

interface Entrepot {
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

interface Vente {
  id: number;
  client_id: number;
  entrepot_id: number;
  invoice_number: string;
  user_invoice_number: string;
  date: string;
  livraison_cost: string;
  tax: string;
  remise: string;
  remarks: string | null;
  status: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  client: Client;
  entrepot: Entrepot;

  // table
  nom_du_client: string;
  magasin: string;
  référence: string;
  // date: string;  ca exists in the interface
  // status: string; ca exists in the interface
}



export default Vente;


export interface IVenteTable {
  id: number;
  nom_du_client: string;
  magasin: string;
  référence: string;
  date: string;
  status: string;
}