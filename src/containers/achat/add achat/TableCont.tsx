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
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
    type: "single",
    designation: "Apple",
    code: "9876543210",
    marque: "FreshFarms",
    categorie: "Fruits",
    cout: "200.00",
    prix: "50.00",
    unité: "Kg",
    quantité: "25",
    alert_stock: 10,
    remise: 0,
    taxe: 0,
    has_serial_number: false,
    name: "Apple",
    cout_unitaire: 200,
    stock_actuel: 25,
  },
];