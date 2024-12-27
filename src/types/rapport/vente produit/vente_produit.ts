export interface IProductVente {
    product_name: string;
    product_code: string;
    date: string;
    invoice_number: string;
    user_invoice_number: string;
    client_name: string;
    entrepot_name: string;
    quantity_sold: number;
    total: string;

    // table
    id: number; 
    produit: string;
    code: string;
    // date: string; // already defined
    référence: string;
    "réference de l'utilisateur": string;
    client: string;
    magasin: string;
    "quantité vendue": number;
    // total: string; // already defined
}

export interface IProductVenteTable {
    id: number;
    produit: string;
    code: string;
    date: string;
    référence: string;
    "réference de l'utilisateur": string;
    client: string;
    magasin: string;
    "quantité vendue": number;
    total: string;
}