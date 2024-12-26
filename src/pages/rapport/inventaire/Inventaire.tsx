import Loading from "../../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import IInventaire from "../../../types/rapport/inventaire/inventaire";
import { IIventaireTable } from "../../../types/rapport/inventaire/inventaire";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/inventaire/ButtonsCont";
import MagasinSelect from "../../../containers/raports/MagasinSelect";
import TableInventaire from "../../../containers/raports/inventaire/TableInventaire";


const Inventaire = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IInventaire[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(1);
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/api/entreports/authorized/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((magasins) => {
        setMagasinsArray(magasins.data.entrepots);
        setMagasinId(magasins.data.entrepots[0].id);
      })
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
      return
    }
    setLoading(true);
    axios
      .get(url + "/api/reports/inventory/" + magasinId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.inventory);
        const newArrayAchats = createNewArrayAchats(res.data.inventory);
        setData(newArrayAchats);
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
  }, [magasinId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport d'inventaire" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        <ButtonsCont columns={columnsAchats} data={data} />
      </div>
      <TableInventaire columns={columnsAchats} rows={data} />
    </div>
  );
};

const columnsAchats: (keyof IIventaireTable)[] = [
  "code",
    "désignation",
    "catégorie",
    "stock_actuel"
];

// const data_test_achat = [
//   {
//     code: "123456789",
//     product_name: "prod1 pdated",
//     category_name: "test",
//     stock_actual: 500,
//   },
// ];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      // code: item.code_barre,
      désignation: item.product_name,
      catégorie: item.category_name,
      stock_actuel: item.stock_actual,
    };
  });
};

export default Inventaire;
