export interface IProductDetails {
  client_name: string;
  code_bar: string;
  created_by_user: string;
  date: string;
  entrepot_name: string;
  invoice_number: string;
  quantity_sold: number;
  total: string;

  //table
  // date: string; // already defined
  //  total: string; // already defined
  référence: string;
  "ajouter par": string;
  // produit: string;
  client: string;
  magasin: string;
  "quantité vendu": number;
}

export interface IProductDetailsTable {
  date: string;
  référence: string;
  "ajouter par": string;
  // produit: string;
  client: string;
  magasin: string;
  "quantité vendu": number;
  total: string;
}