// interface IClient {
//   id: number;
//   nom: string;
//   téléphone: string;
//   email: string;
//   vente_total_dû: number;
//   retour_de_vente_total_dû: number;
// }

// export default  IClient ;

interface IClient {
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

  // for the table
  nom: string;
  téléphone: string;
}


export interface IClientTable {
  id: number;
  nom: string;
  téléphone: string;
  email: string;
} 

export default IClient;