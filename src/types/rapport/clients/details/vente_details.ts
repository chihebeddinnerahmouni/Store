export interface IClientVent {
    user_invoice_number: string;
    invoice_number: string;
    client_name: string;
    entrepot_name: string;
    total: number | null;
    date: string;

    //  table
    id: number;
    référence: string;
    "référence client": string;
    client: string;
    magasin: string;
    // total: number; //
    // date: string; //

}

export interface IClientVenteTable {
    id: number;
    référence: string;
    "référence client": string;
    client: string;
    magasin: string;
    total: number;
    date: string;
}