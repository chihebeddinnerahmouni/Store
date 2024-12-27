import Loading from "../../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/fournisseurs/details/ButtonsCont";
import TableAchats from "../../../containers/raports/fournisseurs/details/TableAchat";
import { useParams } from "react-router-dom";
import { IProviderDetails } from "../../../types/rapport/fournisseur/fournisseur_details";
import { IProviderDetailsTable } from "../../../types/rapport/fournisseur/fournisseur_details";
import StatsCont from "../../../containers/raports/fournisseurs/details/StatsCont";


const FournisseurDetails = () => {
  const [loading, setLoading] = useState(true);
  //   const [dataAchats, setDataAchats] = useState<IClient[]>([]);
  const [data, setData] = useState<IProviderDetails[]>([]);
  const url = import.meta.env.VITE_BASE_URL as string;
  // const [selected, setSelected] = useState<"achats" | "ventes">("achats");
  const { fournisseurId } = useParams<{ fournisseurId: string }>();
  const [fourni, setFourni] = useState<any>({});
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + `/api/reports/providers/${fournisseurId}/report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(createNewArrayVentes(res.data.achats));
        setFourni(res.data.provider);
        setStats({ total_achats: res.data.total_achats, total_cost: res.data.total_cost });
        setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de fournisseurs" />
      <p className="text-center font-bold text-xl whitespace-nowrap">
        {fourni.name}
      </p>
      <ButtonsCont columns={columnsVentes} data={data} />
      <StatsCont data={stats} />
      <TableAchats columns={columnsVentes} rows={data} />
    </div>
  );
};

export default FournisseurDetails;

const createNewArrayVentes = (data: any) => {
  return data.map((item: any, index:number) => {
    return {
      ...item,
      id: index,
      "référence": item.invoice_number,
      "référence de l'utilisateur": item.user_invoice_number,
      magasin: item.entrepot_name,
      // total: item.total,
      // date: item.date,
    };
  });
};

const columnsVentes: (keyof IProviderDetailsTable)[] = [
  "référence",
  "date",
  "référence de l'utilisateur",
  "magasin",
  "total",
];