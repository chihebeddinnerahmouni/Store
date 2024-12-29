export interface IInvDetails_vente {
  client_name: string;
  date: string;
  entrepot_name: string;
  invoice_number: string;
  quantity_sold: number;
  total: string;
  user_invoice_number: string;

  //table
    id: number;
    //   date: string;
    magasin: string;
    référence: string;
    quantité: number;
    // total: string;
    "référence de l'utilisateur": string;
}


export interface IInvDetails_vente_Table {
    id: number;
    date: string;
    magasin: string;
    référence: string;
    quantité: number;
    total: string;
    "référence de l'utilisateur": string;
}
