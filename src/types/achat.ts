interface IAchat {
  id: number;
  date: string;
  reference: string;
  fournisseur: string;
  magasin: string;
  status: string;
  total: string;
  payé: string;
  dû: string;
  status_de_paiement: string;
}

export default IAchat;