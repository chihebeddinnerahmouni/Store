import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ButtonsCont from "../../containers/raports/achats/ButtonsCont";
import TableAchats from "../../containers/raports/achats/TableAchats";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import { IAchatReport } from "../../types/rapport/achats/achat";
import { IAchatReportTable } from "../../types/rapport/achats/achat";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IMagasin from "../../types/magasin";
import { IProvider } from "../../types/provider";
import { handleAxiosError } from "../../helper/axios_error";

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
      axios.get<{ total_sum: number; achats: any[] }>(
        `${url}/api/reports/achats?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      axios.get<{ entrepots : IMagasin[]}>(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get<{providers: IProvider[]}>(`${url}/api/providers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then((responses) => {
        const data = responses[0].data;
        const magasinsResult = responses[1].data;
        const fourniResult = responses[2].data;
        const newArrayAchats = createNewArrayAchats(data.achats);
        setData(newArrayAchats);
        setTotal(data.total_sum);
        setMagasinsArray(magasinsResult.entrepots);
        setFournisseurArray(fourniResult.providers);
        setLoading(false);
      })
      .catch((err) => {
        handleAxiosError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (startDate === formattedDate && endDate === todatSratDate) return;
    
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
      .then((response: any) => {
        const newArrayAchats = createNewArrayAchats(response.data.achats);
        setData(newArrayAchats);
        setTotal(response.data.total_sum);
        setLoading(false);
      })
      .catch((err) => {
       handleAxiosError(err);
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
