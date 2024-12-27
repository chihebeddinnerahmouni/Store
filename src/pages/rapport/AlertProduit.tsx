import Loading from "../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import IAlerte from "../../types/rapport/alerts/alert_quantite";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/raports/alerte/ButtonsCont";
import MagasinSelect from "../../containers/raports/MagasinSelect";
import TableAlerte from "../../containers/raports/alerte/TableAlerte";


const AlertProduit = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAlerte[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
      axios.get(url + "/api/entreports/authorized/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((magasins) => {
        setMagasinsArray(magasins.data.entrepots);
        setMagasinId(magasins.data.entrepots[0].id);
          }
        )
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.erreur, { variant: "error" });
        }
      });
  }, []);


  useEffect(() => { 
    if (magasinId === 0) {
      return;
    }
    setLoading(true);
    axios.get(url + "/api/reports/stock-alerts/" + magasinId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
         const newColumns = Object.keys(res.data.alerts[0]).filter(
              (key) => key !== "id"
            );
            setColumns(newColumns);
        setData(res.data.alerts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.erreur, { variant: "error" });
        }
      });
  }, [magasinId]);

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Alertes de quantité de produits" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        <ButtonsCont columns={columns} data={data} />
      </div>
      <TableAlerte columns={columns} rows={data} />
    </div>
  );
};

export default AlertProduit;





// const columns: (keyof IAlerteTAble)[] = [
//   "code_produit",
//   "produit",
//   "magasin",
//   "quantité",
//   "quantité_alert",
// ];

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

// const createNewArray = (data: any) => {
//   return data.map((item: any) => {
//     return {
//       ...item,
//       code_produit: item.code_barre,
//       produit: item.name,
//       magasin: item.rayonage.name,
//       quantité: item.quantity,
//       quantité_alert: item.stock_alert,
//     };
//   });
// };
