export interface IProvider {
  id: number;
  provider_name: string;
  provider_phone: string;
  total_achats: number;
    total_cost: string;

    // table
    fournisseur: string;
    téléphone: string;
    "total achats": number;
    "coût total": string;
    
}

export interface IProviderTable {
    id: number;
  fournisseur: string;
    téléphone: string;
    "total achats": number;
    "coût total": string;
}