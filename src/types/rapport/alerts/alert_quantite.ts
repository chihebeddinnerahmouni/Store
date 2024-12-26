// interface Category {
//     id: number;
//     code_category: string;
//     name_category: string;
//     description: string;
//     status: string;
//     deleted_by: number | null;
//     created_by: number;
//     updated_by: number | null;
//     created_at: string;
//     updated_at: string;
// }

// interface Brand {
//     id: number;
//     code_brand: string;
//     name_brand: string;
//     description: string;
//     created_by: number;
//     updated_by: number | null;
//     deleted_by: number | null;
//     created_at: string;
//     updated_at: string;
// }

// interface Unit {
//     id: number;
//     code_unit: string;
//     name_unit: string;
//     description: string;
//     created_by: number;
//     updated_by: number | null;
//     deleted_by: number | null;
//     created_at: string;
//     updated_at: string;
// }

// interface Rayonage {
//     id: number;
//     code_location: string;
//     name: string;
//     description: string;
//     created_by: number;
//     updated_by: number | null;
//     deleted_by: number | null;
//     created_at: string;
//     updated_at: string;
// }

// interface alert_quantite {
//   id: number;
//   name: string;
//   code_barre: string;
//   category_id: number;
//   brand_id: number;
//   unit_id: number;
//   rayonage_id: number;
//   tax_percentage: string;
//   description: string;
//   price_buy: string;
//   price_sell: string;
//   stock_alert: number;
//   quantity: number;
//   has_serial_number: number;
//   created_by: number;
//   updated_by: number | null;
//   deleted_by: number | null;
//   created_at: string;
//   updated_at: string;
//   category: Category;
//   brand: Brand;
//   unit: Unit;
//     rayonage: Rayonage;
    
//     // table
//     code_produit: string;
//     produit: string;
//     magasin: string;
//     quantité: number;
//     quantité_alert: number;
// }

// export default alert_quantite;


// export interface IAlerteTAble {
//     code_produit: string;
//     produit: string;
//     magasin: string;
//     quantité: number;
//     quantité_alert: number;
// }

interface AlertQuantite {
    id: number;
  "Code Produit": string;
  Produits: string;
  Categorie: string;
  Marque: string;
  Quantité: number;
  "Quantité Alerte": number;
}

export default AlertQuantite;


// export interface IAlerteTAble {
//     code_produit: string;
//     produit: string;
//     magasin: string;
//     quantité: number;
//     quantité_alert: number;
// }