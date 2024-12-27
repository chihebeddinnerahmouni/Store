export interface IAchatProduit {
    date: string;
    user_invoice_number: string;
    invoice_number: string;
    provider_name: string;
    entrepot_name: string;
    product_name: string;
    quantity_bought: number;
    total: string;

    // table
    id: number;
    // date: string;  // already defined
    "réference de l'utilisateur": string;
    référence: string;
    fournisseur: string;
    magasin: string;
    produit: string;
    quantité: number;
    // total: string;  // already defined
}

export interface IAchatProduitTable {
    date: string;
    "réference de l'utilisateur": string;
    référence: string;
    fournisseur: string;
    magasin: string;
    produit: string;
    quantité: number;
    total: string;
}