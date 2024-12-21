import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/products/marques/ButtonsCont";
import TableMarques from "../../containers/products/marques/TableMarques";
import IMArque from "../../types/marque";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const Marques = () => {

    const [data, setData] = useState<IMArque[]>([]);
  const [columns, setColumns] = useState<(keyof IMArque)[]>([]);
      const url = import.meta.env.VITE_BASE_URL as string;
      const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { 
    axios
      .get(`${url}/api/brands`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // enqueueSnackbar("Categories chargées", { variant: "success" });
        setData(res.data.brands);
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
    }
      , []);
  
  
  if (loading) return <Loading />;
  
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Marques" />
          <ButtonsCont data={data} columns={columns} />
          <TableMarques data={data} columns={columns} />
    </div>
  );
}

export default Marques

const columns_test: (keyof IMArque)[] = ["code_brand", "name_brand"];

// const columns_test: (keyof IMArque)[] = ["code_de_marque", "nom_de_marque"];
 
// const data_test = [
//   {
//     id: 1,
//     code_de_marque: "M001",
//     nom_de_marque: "Marque 1",
//   },
//   {
//     id: 2,
//     code_de_marque: "M002",
//     nom_de_marque: "Marque 2",
//   },
// ];
