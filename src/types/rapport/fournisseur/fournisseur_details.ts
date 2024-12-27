export interface IProviderDetails {
    user_invoice_number: string;
    invoice_number: string;
    entrepot_name: string;
    total: string;
    date: string;

    // table
    id: number;
    "référence": string;
    "référence de l'utilisateur": string;
    magasin: string;
    // total: string; //
    // date: string; //
}

export interface IProviderDetailsTable {
    id: number;
    "référence": string;
    "référence de l'utilisateur": string;
    magasin: string;
    total: string;
    date: string;
}