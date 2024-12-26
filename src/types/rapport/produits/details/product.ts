export interface IProductDetails {
    id: number;
    date: string;
    code_barre: string;
    created_by: string;
    name: string;
    client_name: string;
    entrepot_name: string;
    quantity: number;
    total: string;

    //table
    // date: string; // already defined
    //  total: string; // already defined
    référence: string;
    "ajouter par": string;
    produit: string;
    client: string;
    magasin: string;
    quantité: number;
}

export interface IProductDetailsTable {
  date: string;
  référence: string;
  "ajouter par": string;
  produit: string;
  client: string;
  magasin: string;
  quantité: number;
  total: string;
}