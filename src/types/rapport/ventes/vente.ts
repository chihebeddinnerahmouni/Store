export interface IVente {
    id: number;
    date: string;
    invoice_number: string;
    user_invoice_number: string;
    client_name: string;
    entrepot_name: string;
    total: number | null;
    created_by_user: string;

    // table
    // date: string; // existing
    référence: string; 
    "réference de l'utilisateur": string; 
    client: string;
    magasin: string;
    // total: number; // existing
    "ajouter par": string;

}

export interface IVenteTable {
    date: string; 
    référence: string;
    "réference de l'utilisateur": string;
    client: string;
    magasin: string;
    total: number;
    "ajouter par": string;
    
}