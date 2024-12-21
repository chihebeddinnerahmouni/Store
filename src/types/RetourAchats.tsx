interface IRetourAchats {
  id: number;
    reference: string;
    date: string;
    fournisseur: string;
    magasin: string;
    réf_dachat: string;
    status: string;
    total: number;
    payé: number;
    restant: number;
    status_de_paiement: string;
}

export default IRetourAchats;
