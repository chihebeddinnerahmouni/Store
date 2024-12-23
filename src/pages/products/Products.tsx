import PageTitle from "../../components/ui/PageTitle";
import ProductsTable from "../../containers/products/products/ProductsTable";
import ButtonsCont from "../../containers/products/products/ButtonsCont";
import { useState, useEffect } from "react";
import IProductSingle from "../../types/IProductSingle";
// import IProduct from "../../types/Product";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";


const Products = () => {

    const [code, setCode] = useState("");
    const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
    const [categoriesArray, setCategoriesArray] = useState<any>([]);
    const [marquesArray, setMarquesArray] = useState<any>([]);
  const [reyonagesArray, setReyonagesArray] = useState<any>([]);
  
  const [data, setData] = useState<IProductSingle[]>([]);
  // const [columns, setColumns] = useState<(keyof IProductSingle)[]>([]);
  const [loading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState<any[]>([]);
  const url = import.meta.env.VITE_BASE_URL;
  const columns = columns_test
  

  useEffect(() => {

    axios
      .get(url + "/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.products);
        setData(res.data.products);
        // setColumns(Object.keys(res.data[0]) as (keyof IProduct)[]);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }, []);


  useEffect(() => {
  // console.log(data);
  const filteredData = data.map((product) => ({
    id: product.id,
    designation: product.name,
    code: product.code_barre,
    marque: product.brand.name_brand,
    categorie: product.category.name_category,
    cout: product.price_buy,
    prix: product.price_sell,
    unité: product.unit.name_unit,
    // quantité: product.stock_actuel,
    rayon: product.rayonage.name,
  }));

  setFinalData(filteredData);
}, [data]);



  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste de produits" />
      <ButtonsCont
        data={finalData}
        columns={columns}
        setData={setData}
        code={code}
        setCode={setCode}
        categorie={categorie}
        setCategorie={setCategorie}
        marque={marque}
        setMarque={setMarque}
        categoriesArray={categoriesArray}
        setCategoriesArray={setCategoriesArray}
        marquesArray={marquesArray}
        setMarquesArray={setMarquesArray}
        reyonagesArray={reyonagesArray}
        setReyonagesArray={setReyonagesArray}
      />
      <ProductsTable rows={finalData} columns={columns} />
    </div>
  );
}

export default Products

const columns_test= [
  "designation",
  "code",
  "marque",
  "categorie",
  "cout",
  "prix",
  "unité",
  // "quantité",
  "rayon",
];



// const columns_test: (keyof IProductSingle)[] = [
//   "designation",
//   "code",
//   "marque",
//   "categorie",
//   "cout",
//   "prix",
//   "unité",
//   "quantité",
// ];

// const data_test: IProduct[] = [
//   {
//     id: 1,
//     image:
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
//     type: "single",
//     designation: "Apple",
//     code: "9876543210",
//     marque: "FreshFarms",
//     categorie: "Fruits",
//     cout: "200.00",
//     prix: "50.00",
//     unité: "Kg",
//     quantité: "25",
//     alert_stock: 10,
//     remise: 0,
//     taxe: 0,
//     has_serial_number: false,
//     name: "Apple",
//     cout_unitaire: 200,
//     stock_actuel: 25,
//   }
// ];
