import Produit from "../../../components/achat/add achat/1stCont/Produit";
import ProductsTable from "./ProductsTable";
// import IProduct from "../../../types/Product";
import { useState } from "react";
import { useEffect } from "react";
// import { enqueueSnackbar } from "notistack";



interface IProductCommandeItem {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  // remise: number;
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


   const [selectedProduct, setSelectedProduct] = useState<any>(null);


  useEffect(() => {
    // console.log(selectedProduct);
    if (selectedProduct) {
      const check = productsCommandeArray.some(
        (product) => product.id === selectedProduct.id
      );
      if (check) {
        // enqueueSnackbar("Produit déjà ajouté", { variant: "error" });
        null;
      } else {
        const newProductCommandeItem = {
          id: selectedProduct.id,
          name: selectedProduct.name,
          cout_unitaire: selectedProduct.price_buy,
          stock_actuel: selectedProduct.quantity,
          // remise: selectedProduct.remise,
          taxe: selectedProduct.tax_percentage,
          quantite: 0,
          grand_total: 0,
          alert_stock: selectedProduct.stock_alert,
          unité: selectedProduct.unit.name_unit,
          has_serial_number: selectedProduct.has_serial_number,
          serial_numbers: [],
        };
        // console.log(newProductCommandeItem);
        setProductsCommandeArray((prevProductsCommandeArray) => [
          ...prevProductsCommandeArray,
          newProductCommandeItem,
        ]);
      }
    }
  }, [selectedProduct]);


// console.log(productsCommandeArray[0]);
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:gap-8">
      <Produit
        id={"produit"}
        value={produit}
        setValue={setProduit}
        // setProductsArray={setProductsArray}
        // productsArray={productsArray}
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


// const products_test: IProduct[] = [
//     {
        //     "id": 9,
        //     "name": "Mercedes",
        //     "code_barre": "0258134628",
        //     "category_id": 2,
        //     "brand_id": 1,
        //     "unit_id": 3,
        //     "reyonage_id": 5,
        //     "tax_percentage": "0.00",
        //     "description": "dfsd gdgh fg hfgshg hdfjdhgdjghjhj",
        //     "price_buy": "100.00",
        //     "price_sell": "200.00",
        //     "stock_alert": 2005,
        //     "quantity": 0,
        //     "has_serial_number": 0,
        //     "created_by": 2,
        //     "updated_by": null,
        //     "deleted_by": null,
        //     "created_at": "2024-12-23T16:11:25.000000Z",
        //     "updated_at": "2024-12-23T16:11:25.000000Z",
        //     "category": {
        //         "id": 2,
        //         "code_category": "M-55",
        //         "name_category": "Mob",
        //         "description": "From mobile",
        //         "status": "active",
        //         "deleted_by": null,
        //         "created_by": 2,
        //         "updated_by": 2,
        //         "created_at": "2024-12-21T22:14:45.000000Z",
        //         "updated_at": "2024-12-23T17:23:13.000000Z"
        //     },
        //     "brand": {
        //         "id": 1,
        //         "code_brand": "test",
        //         "name_brand": "kjbj",
        //         "description": "bioib",
        //         "created_by": 1,
        //         "updated_by": null,
        //         "deleted_by": null,
        //         "created_at": "2024-12-21T21:32:58.000000Z",
        //         "updated_at": "2024-12-21T21:32:58.000000Z"
        //     },
        //     "unit": {
        //         "id": 3,
        //         "code_unit": "KG",
        //         "name_unit": "Kilogram",
        //         "description": "Unit of mass",
        //         "created_by": 1,
        //         "updated_by": null,
        //         "deleted_by": null,
        //         "created_at": "2024-12-22T18:53:40.000000Z",
        //         "updated_at": "2024-12-22T18:53:40.000000Z"
        //     },
        //     "rayonage": {
        //         "id": 5,
        //         "code_location": "H1",
        //         "name": "H1-N1",
        //         "description": "Djdhdhdvdbdbfjzkkdjfh",
        //         "created_by": 1,
        //         "updated_by": null,
        //         "deleted_by": null,
        //         "created_at": "2024-12-23T00:24:51.000000Z",
        //         "updated_at": "2024-12-23T00:24:51.000000Z"
        //     }
        // }
// ];