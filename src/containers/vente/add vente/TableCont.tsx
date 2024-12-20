import Produit from "../../../components/achat/add achat/1stCont/Produit";
import ProductsTable from "./ProductsTable";
import IProduct from "../../../types/Product";
// import { useState } from "react";
import { useEffect } from "react";


interface IProductCommandeItem {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  remise: number;
  taxe: number;
  quantite: number;
  grand_total: number;
  alert_stock: number;
  unité: string;
  has_serial_number: boolean;
  serial_numbers: string[];
}


interface Props {
  produit: string;
  setProduit: (value: string) => void;
  productsCommandeArray: IProductCommandeItem[];
  setProductsCommandeArray: React.Dispatch<
    React.SetStateAction<IProductCommandeItem[]>
  >;
}

const TableCont = ({
    produit,
    setProduit,
    productsCommandeArray,
    setProductsCommandeArray,
}: Props) => {

    //   const [productsArray, setProductsArray] = useState<IProduct[]>(products_test);
    const productsArray = products_test;


    useEffect(() => {
        setProductsCommandeArray(
            productsArray.map((product) => {
                return {
                  id: product.id,
                  name: product.name,
                  cout_unitaire: product.cout_unitaire,
                  stock_actuel: product.stock_actuel,
                  remise: product.remise,
                  taxe: product.taxe,
                  quantite: 0,
                  grand_total: 0,
                  alert_stock: product.alert_stock,
                  unité: product.unité,
                  has_serial_number: product.has_serial_number,
                  serial_numbers: [],
                };
            })
        );
     }, [productsArray]);

  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:gap-8">
      <Produit
        id={"produit"}
        value={produit}
        setValue={setProduit}
      />

          <ProductsTable
              data={productsCommandeArray}
              setData={setProductsCommandeArray}
          />
    </section>
  );
};

export default TableCont;


const products_test: IProduct[] = [
  {
    id: 1,
    name: "Product 1",
    cout_unitaire: 100,
    stock_actuel: 0,
    remise: 5,
    taxe: 10,
    alert_stock: 10,
    unité: "Carton",
    has_serial_number: false,
  },
  {
    id: 2,
    name: "Product 2",
    cout_unitaire: 200,
    stock_actuel: 30,
    remise: 10,
    taxe: 15,
    alert_stock: 50,
    unité: "Carton",
    has_serial_number: true,
  },
  {
    id: 3,
    name: "Product 3",
    cout_unitaire: 150,
    stock_actuel: 20,
    remise: 7,
    taxe: 12,
    alert_stock: 20,
    unité: "Bouteille",
    has_serial_number: false,
  },
  {
    id: 4,
    name: "Product 4",
    cout_unitaire: 250,
    stock_actuel: 10,
    remise: 12,
    taxe: 20,
    alert_stock: 5,
    unité: "Bouteille",
    has_serial_number: false,
  },
  {
    id: 5,
    name: "Product 5",
    cout_unitaire: 300,
    stock_actuel: 5,
    remise: 15,
    taxe: 25,
    alert_stock: 2,
    unité: "Boîte",
    has_serial_number: false,
  },
];