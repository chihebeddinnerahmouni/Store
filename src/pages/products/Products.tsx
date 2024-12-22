import PageTitle from "../../components/ui/PageTitle";
import ProductsTable from "../../containers/products/products/ProductsTable";
import ButtonsCont from "../../containers/products/products/ButtonsCont";
import { useState, useEffect } from "react";
import IProduct from "../../types/Product";

// interface Product {
//   id: number;
//   image: string;
//   type: string;
//   designation: string;
//   code: string;
//   marque: string;
//   categorie: string;
//   cout: string;
//   prix: string;
//   unité: string;
//   quantité: string;
// }

const Products = () => {

    const [code, setCode] = useState("");
    const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [data, setData] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<(keyof IProduct)[]>([]);


  useEffect(() => {
      setData(data_test);
      setColumns(columns_test);
  }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste de produits" />
      <ButtonsCont
        data={data}
        columns={columns}
        code={code}
        setCode={setCode}
        categorie={categorie}
        setCategorie={setCategorie}
        marque={marque}
        setMarque={setMarque}
      />
      <ProductsTable
        rows={data}
        columns={columns}
        // code={code}
        // setCode={setCode}
        // categorie={categorie}
        // setCategorie={setCategorie}
        // marque={marque}
        // setMarque={setMarque}
      />
    </div>
  );
}

export default Products


const columns_test: (keyof IProduct)[] = [
  "designation",
  "code",
  "marque",
  "categorie",
  "cout",
  "prix",
  "unité",
  "quantité",
];

const data_test: IProduct[] = [
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
  }
];
