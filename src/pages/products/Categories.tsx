import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/products/categories/ButtonsCont";
import { useState, useEffect } from "react";
import TableCategories from "../../containers/products/categories/TableCategories";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import ICategory from "../../types/category"


// interface Category {
//   id: number;
//   code_category: string;
//   nom_de_categorie: string;
//   name_category: string;
// }

const Categories = () => {
    const [data, setData] = useState<ICategory[]>([]);
    const [columns, setColumns] = useState<(keyof ICategory)[]>([]);
    const url = import.meta.env.VITE_BASE_URL as string;
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => { 
        axios
          .get(`${url}/api/categories`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            // console.log(res.data);
            // enqueueSnackbar("Categories chargées", { variant: "success" });
            setData(res.data.categories);
            setColumns(columns_test);
            setLoading(false);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              enqueueSnackbar("Erreur de connexion", { variant: "error" });
            } else {
              enqueueSnackbar(err.response.data.message, { variant: "error" });
            }
            setLoading(false);
          });
        // setData(data_test);
        // setColumns(columns_test);
    }, []);


    if (loading) return <Loading />



    return (
        <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
            <PageTitle text="Categories" />
            <ButtonsCont
                data={data}
                columns={columns}
            />
            <TableCategories
                data={data}
                columns={columns}
            />
        </div>
    );
}

export default Categories;

const columns_test: (keyof ICategory)[] = [
  "code_category",
  // "nom_de_categorie",
  "name_category",
];

// const data_test: ICategory[] = [
//   {
//     id: 1,
//     code_category: "C001",
//     nom_de_categorie: "Category 1",
//   },
//   {
//     id: 2,
//     code_category: "C002",
//     nom_de_categorie: "Category 2",
//   },
// ];