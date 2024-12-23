import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/products/magasins/ButtonsCont";
import TableMagasin from "../../containers/products/magasins/TableMagasin";
import IMagasin from "../../types/magasin";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const Magasins = () => {
  const [data, setData] = useState<IMagasin[]>([]);
    //   const [columns, setColumns] = useState<(keyof IMagasin)[]>([]);
    const columns = columns_test
  const url = import.meta.env.VITE_BASE_URL as string;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
            const newArray = res.data.entrepots.map((item: any) => {
                return {
                  code_magasin: item.code_entreport,
                  nom_de_magasin: item.name,
                  description: item.description,
                  created_by: item.created_by,
                  updated_at: item.updated_at,
                  created_at: item.created_at,
                  id: item.id,
                };
            });
        setData(newArray);
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
      <PageTitle text="Magasins" />
      <ButtonsCont data={data} columns={columns} />
      <TableMagasin data={data} columns={columns} />
    </div>
  );
};


const columns_test: (keyof IMagasin)[] = ["code_magasin", "nom_de_magasin"];

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

export default Magasins;
