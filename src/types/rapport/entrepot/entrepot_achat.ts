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
interface client {
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
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

interface EntrepotAchat {
  date: string;
  id: number;
  code: string;
  client: client;
  entrepot: IWarehouse;
  total: number;

  // table
  // date: string; //kayna f table
  référence: string;
  nom_du_client: string; //kayna f table
  magasin: string;
  // total: number; //kayna f table
}

export default EntrepotAchat;

export interface ITableEntrepotAchat { 
    date: string;
    référence: string;
    nom_du_client: string;
    magasin: string;
    total: number;
}