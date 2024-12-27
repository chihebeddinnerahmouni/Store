export interface IAchatReport {
  date: string;
  user_invoice_number: string;
  invoice_number: string;
  provider_name: string;
  entrepot_name: string;
    total: string;
    
    // table
    id: number;
    // date: string; // already defined
    "réference de l'utilisateur": string;
    référence: string;
    fournisseur: string;
    magasin: string;
    // total: string; // already defined
}


export interface IAchatReportTable { 
    date: string;
    "réference de l'utilisateur": string;
    référence: string;
    fournisseur: string;
    magasin: string;
    total: string;
}