interface EntrepotVente {
  id: number;
  invoice_number: string;
  client_name: string;
  entrepot_name: string;
  total_cost: number | null;
  status: string;


  // table
  référence: string;
  client: string;
  magasin: string;
  total: number;
  // status: string; // kayn lfoug

}

export default EntrepotVente;

export interface ITableEntrepotVente {
  référence: string;
  client: string;
  magasin: string;
  total: number;
  status: string;
}
