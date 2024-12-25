interface IInventaire {
  id: number;
  code: string;
  product_name: string;
  category_name: string;
  stock_actual: number;

  // table
  // code: string; // kayn lfoug
  désignation: string;
  catégorie: string;
  stock_actuel: number;
}

export default IInventaire;

export interface IIventaireTable {
    code: string;
    désignation: string;
    catégorie: string;
    stock_actuel: number;
}
