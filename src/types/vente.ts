interface IVente {
  id: number;
  date: string;
  reference: string;
  ajouter_par: string;
  client: string;
  magasin: string;
  status: string;
  total: string;
  payé: string;
  dû: string;
  status_de_paiement: string;
  status_envoi: string;
}

export default IVente;
