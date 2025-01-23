import PageTitle from "../../components/ui/PageTitle";
import ProductsTable from "../../containers/products/products/ProductsTable";
import ButtonsCont from "../../containers/products/products/ButtonsCont";
import { useState, useEffect, useContext } from "react";
import IProductSingle from "../../types/IProductSingle";
import {IProductTable} from "../../types/IProductSingle";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";


const Products = () => {

    const [code, setCode] = useState("");
    const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
    const [categoriesArray, setCategoriesArray] = useState<any>([]);
    const [marquesArray, setMarquesArray] = useState<any>([]);
  const [reyonagesArray, setReyonagesArray] = useState<any>([]);  
  const [data, setData] = useState<IProductSingle[]>([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BASE_URL;
  const columns = columns_test
    const navigate = useNavigate();
    const privileges = useContext(PrivilegesContext);
  

  useEffect(() => {
    if (!privileges.Produits["Liste des produits"]) navigate("/tableau-de-bord");
    axios
      .get(url + "/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const filteredData = ModifiedData(res.data.products);
        setData(filteredData);
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

  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste de produits" />
      <ButtonsCont
        data={data}
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
      <ProductsTable rows={data} columns={columns} />
    </div>
  );
}

export default Products

const columns_test: (keyof IProductTable)[] = [
  "code",
  "designation",
  "marque",
  "categorie",
  "cout",
  "prix",
  "unité",
  "quantité",
  "rayon",
];

const ModifiedData = (data: IProductSingle[]) => {
  return data.map((product: IProductSingle) => ({
    ... product,
    designation: product.name,
    code: product.code_barre,
    marque: product.brand.name_brand,
    categorie: product.category.name_category,
    cout: product.price_buy,
    prix: product.price_sell,
    unité: product.unit.name_unit,
    quantité: product.quantity,
    rayon: product.rayonage.name,
  }));
}
