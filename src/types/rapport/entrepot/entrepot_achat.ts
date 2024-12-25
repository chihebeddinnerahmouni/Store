interface EntrepotAchat {
  id: number;
  provider_name: string;
  invoice_number: string;
  user_invoice_number: string;
  entrepot_name: string;
  total_cost: string;

  // table
  fournisseur: string;
  référence: string;
  "référence de l'utilisateur": string;
  magasin: string;
  coût_total: string;
}

export default EntrepotAchat;

export interface ITableEntrepotAchat {
  id: number;
  fournisseur: string;
  référence: string;
  "référence de l'utilisateur": string;
  magasin: string;
  coût_total: string;
}