import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ButtonsCont from "../../containers/raports/achats/ButtonsCont";
import TableAchats from "../../containers/raports/achats/TableAchats";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import { IAchatReport } from "../../types/rapport/achats/achat";
import { IAchatReportTable } from "../../types/rapport/achats/achat";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Achats = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

  const todatSratDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAchatReport[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinName, setMagasinName] = useState<string>("");
  const [fournisseurName, setFournisseurName] = useState<string>("");
  const [fournisseurArray, setFournisseurArray] = useState<any[]>([]);
  const [userInvNumber, setUserInvNumber] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const url = import.meta.env.VITE_BASE_URL as string;
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Rapport Des Entrées"]) navigate("/tableau-de-bord");
    Promise.all([
      axios.get(
        `${url}/api/reports/achats?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      axios.get(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/providers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then(
        axios.spread((data, magasinsResult, fourniResult) => {
            // console.log(data.data);
          // console.log(fourniResult.data.providers);
          const newArrayAchats = createNewArrayAchats(data.data.achats);
          setData(newArrayAchats);
          setTotal(data.data.total_sum);
          setMagasinsArray(magasinsResult.data.entrepots);
          setFournisseurArray(fourniResult.data.providers);
          setLoading(false);
        })
      )
      .catch(() => {
        // console.log(err);
        enqueueSnackbar("Erreur lors de la récupération des données", {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (startDate === formattedDate && endDate === todatSratDate) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `${url}/api/reports/achats?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
    // console.log(response.data);
        const newArrayAchats = createNewArrayAchats(response.data.achats);
        setData(newArrayAchats);
        setTotal(response.data.total_sum);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Erreur lors de la récupération des données", {
          variant: "error",
        });
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport d'entrées" />
      <div className="w-full">
        <ButtonsCont
          setData={setData}
          columns={columns}
          data={data}
          magasinsArray={magasinsArray}
          setMagasinName={setMagasinName}
          magasinName={magasinName}
          fournisseurArray={fournisseurArray}
          fournisseurName={fournisseurName}
          setFournisseurName={setFournisseurName}
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
        />
        <DatesCont
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <h2 className="text-xl font-bold mt-5 lg:text-2xl lg:mt-10">
          Total : {total} DA
        </h2>
        <TableAchats columns={columns} rows={data} />
      </div>
    </div>
  );
};

const columns: (keyof IAchatReportTable)[] = [
  "référence",
  "date",
  "réference de l'utilisateur",
  "fournisseur",
  "magasin",
  "total",
];
const createNewArrayAchats = (data: IAchatReport[]) => {
  return data.map((item: IAchatReport, index: number) => {
    return {
      ...item,
      id: index,
      // date: item.date,
      "réference de l'utilisateur": item.user_invoice_number,
      référence: item.invoice_number,
      fournisseur: item.provider_name,
      magasin: item.entrepot_name,
      // total: item.total,
    };
  });
};

export default Achats;
