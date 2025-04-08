import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect, useContext } from "react";
import ButtonsCont from "../../containers/products/rayonnage/ButtonsCont";
import TableReyon from "../../containers/products/rayonnage/TableReyon";
import IReyonnage from "../../types/reyonnage";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Reyonnage = () => {
  const [data, setData] = useState<IReyonnage[]>([]);
  const [columns, setColumns] = useState<(keyof IReyonnage)[]>([]);
  const url = import.meta.env.VITE_BASE_URL as string;
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.Produits["Reyonnage"]) navigate("/tableau-de-bord");

    axios
      .get(`${url}/api/rayonages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // enqueueSnackbar("Categories chargées", { variant: "success" });
        setData(res.data.rayonages);
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
      <PageTitle text="Rayonage" />
      <ButtonsCont data={data} columns={columns} />
      <TableReyon data={data} columns={columns} />
    </div>
  );
};

const columns_test: (keyof IReyonnage)[] = ["name", "code_location"];

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

export default Reyonnage;
