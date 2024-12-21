import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/products/unite/ButtonsCont";
import TableUnite from "../../containers/products/unite/TableUnite";
import IUnite from "../../types/unite";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";

const Unite = () => {

  const [data, setData] = useState<IUnite[]>([]);
  const [columns, setColumns] = useState<(keyof IUnite)[]>([]);
        const url = import.meta.env.VITE_BASE_URL as string;
        const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {

    axios
      .get(`${url}/api/units`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.units);
        // setColumns(Object.keys(res.data.units[0]) as (keyof IUnite)[]);
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



  if (loading) return <Loading />;


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Unité" />
      <ButtonsCont data={data} columns={columns} />
      <TableUnite data={data} columns={columns} />
    </div>
  );
};

export default Unite;

const columns_test: (keyof IUnite)[] = ["code_unit", "name_unit"];



// const columns_test: (keyof IUnite)[] = ["nom_court", "nom_de_unité", "unité_de_base"];
// const data_test: IUnite[] = [
//   {
//     id: 1,
//     nom_court: "U001",
//     nom_de_unité: "Unité 1",
//     unité_de_base: "Unité 1",
//   },
//   {
//     id: 2,
//         nom_court: "U002",
//         nom_de_unité: "Unité 2",
//         unité_de_base: "Unité 2",
//     },
// ];