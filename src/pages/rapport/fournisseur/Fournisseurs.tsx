import Loading from "../../../components/ui/Loading";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { IAlerteTAble } from "../../types/rapport/alert_quantite";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/fournisseurs/ButtonsCont";
import TableFournis from "../../../containers/raports/fournisseurs/TableFournis";
import { IProvider } from "../../../types/rapport/fournisseur/fournisseur";
import { IProviderTable } from "../../../types/rapport/fournisseur/fournisseur";
import { PrivilegesContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const Fournisseurs = () => {
  const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IProvider[]>([]);
    const [total, setTotal] = useState(0);
  const url = import.meta.env.VITE_BASE_URL as string;
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Rapport Fournisseur"]) navigate("/tableau-de-bord");
    setLoading(true);
    axios
      .get(url + "/api/reports/providers/report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.providers);
          setData(createNewArray(res.data.providers));
            setTotal(res.data.global_total);
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
      <PageTitle text="Rapport de fournisseurs" />
      <ButtonsCont columns={columns} data={data} />
      <h2 className="text-xl font-bold mt-5 lg:text-2xl lg:mt-10">
        Total : {total} DA
      </h2>
      <TableFournis columns={columns} rows={data} />
    </div>
  );
};

export default Fournisseurs;

const columns: (keyof IProviderTable)[] = [
    "fournisseur",
    "téléphone",
    "total achats",
    "coût total",
];

const createNewArray = (data: IProvider[]) => {
  return data.map((item: IProvider) => {
    return {
      ...item,
        fournisseur: item.provider_name,
        téléphone: item.provider_phone,
        "total achats": item.total_achats,
        "coût total": item.total_cost
    };
  });
};
