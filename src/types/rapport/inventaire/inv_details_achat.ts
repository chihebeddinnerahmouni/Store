interface IInvDetails_achats {
  id: number;
  user_invoice_number: string;
  invoice_number: string;
  provider_name: string;
  entrepot_name: string;
  quantity_declared: number;
  total: string;

  //table
  "référence de l'utilisateur": string;
  référence: string;
  fournisseur: string;
  magasin: string;
  quantité: number;
  // total: string; // already defined
}

export default IInvDetails_achats;

export interface IInvDetails_achats_Table {
  "référence de l'utilisateur": string;
  référence: string;
  fournisseur: string;
  magasin: string;
  quantité: number;
  total: string;
}
