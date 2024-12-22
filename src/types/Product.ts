interface IProduct {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  remise: number;
  taxe: number;
  alert_stock: number;
  unité: string;
  has_serial_number: boolean;


  image: string;
  type: string;
  designation: string;
  code: string;
  marque: string;
  categorie: string;
  prix: string;
  cout: string;
  quantité: string;
}


export default IProduct;