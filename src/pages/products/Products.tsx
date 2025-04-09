import PageTitle from "../../components/ui/PageTitle";
import ProductsTable from "../../containers/products/products/ProductsTable";
import ButtonsCont from "../../containers/products/products/ButtonsCont";
import { useEffect, useContext } from "react";
import IProductSingle from "../../types/IProductSingle";
import { IProductTable } from "../../types/IProductSingle";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL;
const fetchData = async (body: any) => {
  const response = await axios.post<{ products: IProductSingle[] }>(
    url + "/api/products/filter",
    {
      ...(body.code && { code_barre: body.code }),
      ...(body.name && { name: body.name }),
      ...(body.categorie && { category_id: body.categorie }),
      ...(body.brand && { brand_id: body.brand }),
      ...(body.reyon && { rayonage_id: body.reyon }),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const modicfiedData = ModifiedData(response.data.products);
  return modicfiedData;
};

const Products = () => {
  const columns = columns_test;
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code_barre") || "";
  const name = searchParams.get("name") || "";
  const categorie = searchParams.get("category_id") || "";
  const brand = searchParams.get("brand_id") || "";
  const reyon = searchParams.get("reyonage_id") || "";
  

  useEffect(() => {
    if (!privileges.Produits["Liste des produits"])
      navigate("/tableau-de-bord");
  }, []);

  const { data } = useSuspenseQuery({
    queryKey: ["products", location.search],
    queryFn: ()=> fetchData({code, name, categorie, brand, reyon}),
  });

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste de produits" />
      <ButtonsCont data={data} columns={columns} />
      <ProductsTable rows={data} columns={columns} />
    </div>
  );
};

export default Products;

//________________________________________________________________

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
    ...product,
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
};
