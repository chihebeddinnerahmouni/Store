export interface IProduit {
  id: number;
  name: string;
  code_barre: string;
  total_sales: number;
    total_amount: number;
    
    //table
    code: string;
    produit: string;
    ventes: number;
    montant: number;
} 

export interface IProduitTable {
    produit: string;
    code: string;
    ventes: number;
    montant: number;
}