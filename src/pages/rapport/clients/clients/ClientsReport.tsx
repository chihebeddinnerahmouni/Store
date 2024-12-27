import Loading from "../../../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
// import { IAlerteTAble } from "../../types/rapport/alert_quantite";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../../components/ui/PageTitle";
import ButtonsCont from "../../../../containers/raports/clients/ButtonsCont";
import TableClients from "../../../../containers/raports/clients/TableClients";
import { IClient } from "../../../../types/rapport/clients/client";
import { IClientTable } from "../../../../types/rapport/clients/client";

const ClientsReport = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IClient[]>([]);
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/api/reports/clients/achat-report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
            console.log(res.data.clients);
            setData(createNewArray(res.data.clients));
            setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.erreur, { variant: "error" });
        }
      });
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de clients" />
      <ButtonsCont columns={columns} data={data} />
      <TableClients columns={columns} rows={data} />
    </div>
  );
};

export default ClientsReport;

const columns: (keyof IClientTable)[] = [
  "client",
  "téléphone",
  "nombre_total",
  "argent_total",
];

const createNewArray = (data: IClient[]) => {
  return data.map((item: IClient) => {
    return {
      ...item,
      client: item.name,
      téléphone: item.phone,
      nombre_total: item.total_number,
      argent_total: item.total_money,
    };
  });
};

// const data: IAlerte[] = [
// const data_test = [
//   {
//     "Code Produit": "8345588766",
//     Produits: "toyota",
//     Categorie: "test",
//     Marque: "Brand Name",
//     Quantité: 7,
//     "Quantité Alerte": 30,
//   },
// ];
