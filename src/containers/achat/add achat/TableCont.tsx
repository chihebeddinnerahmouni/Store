import Produit from "../../../components/achat/add achat/1stCont/Produit";
import ProductsTable from "./ProductsTable";
// import IProduct from "../../../types/Product";
import { useState } from "react";
import { useEffect } from "react";
// import { enqueueSnackbar } from "notistack";
import { IProductCommandeItem } from "../../../types/products/product_to_commande";

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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (selectedProduct) {
      const check = productsCommandeArray.some(
        (product) => product.id === selectedProduct.id
      );
      if (check) {
        null;
      } else {
        const newProductCommandeItem = {
          id: selectedProduct.id,
          name: selectedProduct.name,
          cout_unitaire: selectedProduct.price_buy,
          stock_actuel: selectedProduct.quantity,
          taxe: selectedProduct.tax_percentage,
          quantite: 0,
          grand_total: 0,
          alert_stock: selectedProduct.stock_alert,
          unité: selectedProduct.unit.name_unit,
          has_serial_number: selectedProduct.has_serial_number,
          serial_numbers: [],
        };
        setProductsCommandeArray((prevProductsCommandeArray) => [
          ...prevProductsCommandeArray,
          newProductCommandeItem,
        ]);
      }
    }
  }, [selectedProduct]);


  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:gap-8">
      <Produit
        id={"produit"}
        value={produit}
        setValue={setProduit}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
      />

      <ProductsTable
        data={productsCommandeArray}
        setData={setProductsCommandeArray}
      />
    </section>
  );
};

export default TableCont;
