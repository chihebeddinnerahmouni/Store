interface IRetourvents {

    id: number;
    reference: string;
    date: string;
    client: string;
    magasin: string;
    réf_vente: string;
    status: string;
    total: number;
    payé: number;
    rest: number;
    status_de_paiment: string;
}

export default IRetourvents;