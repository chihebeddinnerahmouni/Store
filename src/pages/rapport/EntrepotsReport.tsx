import Loading from "../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import IEntAchat from "../../types/rapport/entrepot/entrepot_achat";
import { ITableEntrepotAchat } from "../../types/rapport/entrepot/entrepot_achat";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../components/ui/PageTitle";
import ButtonsContAchat from "../../containers/raports/entrepot/achat/ButtonsCont";
import ButtonsContVentes from "../../containers/raports/entrepot/vente/ButtonsCont";
import MagasinSelect from "../../containers/raports/MagasinSelect";
import TableAchat from "../../containers/raports/entrepot/achat/TableAchat";
import { ITableEntrepotVente } from "../../types/rapport/entrepot/entrepot_vente";
import IEntVente from "../../types/rapport/entrepot/entrepot_vente";
import TableVentes from "../../containers/raports/entrepot/vente/TableVentes";
import SwitchButtons from "../../components/rapport/SwitchButtons";
import StatsCont from "../../containers/raports/entrepot/StatsCont";

const EntrepotsReport = () => {
  const [loading, setLoading] = useState(true);
  const [dataAchats, setDataAchats] = useState<IEntAchat[]>([]);
  const [dataVentes, setDataVentes] = useState<IEntVente[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const [achatStat, setAchatStat] = useState<number>(0);
  const [venteStat, setVenteStat] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;
  // const [selected, setSelected] = useState<"achats" | "ventes">("achats");
  const [selected, setSelected] = useState<string>("Achats");

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
    if (magasinId !== 0) {
      setLoading(true);
      axios
        .get(url + "/api/reports/entrepot/" + magasinId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const newArrayAchats = createNewArrayAchats(res.data.achats);
          const newArrayVentes = createNewArrayVentes(res.data.ventes);
          setDataVentes(newArrayVentes);
          setDataAchats(newArrayAchats);
          setAchatStat(res.data.summary.total_achats);
          setVenteStat(res.data.summary.total_ventes);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.message === "Network Error") {
            enqueueSnackbar("Erreur de connexion", { variant: "error" });
          } else {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          }
        });
    }
  }, [magasinId]);


  if (loading) {
    return <Loading />;
  }


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport d'entrepôt" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        {selected === "achats" ? (
          <ButtonsContAchat columns={columnsAchats} data={dataAchats} />
        ) : (
            <ButtonsContVentes columns={columnsVentes} data={dataVentes} /> 
            // null
        )}
      </div>
      <StatsCont
        achatStat={achatStat}
        venteStat={venteStat}
      />
      <SwitchButtons options={["Achats", "Ventes"]} setSelected={setSelected} selected={selected} />
      {selected === "achats" ? (
        <TableAchat columns={columnsAchats} rows={dataAchats} />
      ) : (
          <TableVentes columns={columnsVentes} rows={dataVentes} />
          // null
      )}
    </div>
  );
};



const columnsAchats: (keyof ITableEntrepotAchat)[] = [
  "référence",
  "fournisseur",
  "référence de l'utilisateur",
  "magasin",
  "coût_total",
];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      fournisseur: item.provider_name,
      référence: item.invoice_number,
      "référence de l'utilisateur": item.user_invoice_number,
      magasin: item.entrepot_name,
      coût_total: item.total_cost,
    };
  });
};

const createNewArrayVentes = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      client: item.client_name,
      référence: item.invoice_number,
      magasin: item.entrepot_name,
      total: item.total_cost,
    };
  });
};

const columnsVentes: (keyof ITableEntrepotVente)[] = [
  "référence",
  "client",
  "magasin",
  "total",
  "status",
];


export default EntrepotsReport;
