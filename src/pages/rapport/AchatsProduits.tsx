import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ButtonsCont from "../../containers/raports/achats produit/ButtonsCont";
import TableAchats from "../../containers/raports/achats produit/TableAchats";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import StatsCont from "../../containers/raports/achats produit/StatsCont";
import { IAchatProduit } from "../../types/rapport/achat produit/achat_produit";
import { IAchatProduitTable } from "../../types/rapport/achat produit/achat_produit";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IMagasin from "../../types/magasin";
import { IProvider } from "../../types/provider";
import { handleAxiosError } from "../../helper/axios_error";

const AchatsProduits = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

  const todatSratDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAchatProduit[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinName, setMagasinName] = useState<string>("");
  const [fournisseurName, setFournisseurName] = useState<string>("");
  const [fournisseurArray, setFournisseurArray] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const url = import.meta.env.VITE_BASE_URL as string;
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.Rapports["Rapport Entrée De Produits"]) navigate("/tableau-de-bord");

    Promise.all([
      axios.get<{achats: any[], total_cost: number, total_quantity: number}>(
        `${url}/api/reports/products/achats?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      axios.get<{entrepots: IMagasin[]}>(`${url}/api/entreports`, {
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
        setStats({
          total_cost: data.total_cost,
          total_quantity: data.total_quantity,
        });
        setMagasinsArray(magasinsResult.entrepots);
        setFournisseurArray(fourniResult.providers);
        setLoading(false);
      })
      .catch((err) => {
        handleAxiosError(err)
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
        `${url}/api/reports/products/achats?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response: any) => {
        const newArrayAchats = createNewArrayAchats(response.data.achats);
        setData(newArrayAchats);
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
      <PageTitle text="Rapport d'entrées de produits" />
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
          setStats={setStats}
        />
        <DatesCont
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <StatsCont data={stats} />
        <TableAchats columns={columns} rows={data} />
      </div>
    </div>
  );
};

const columns: (keyof IAchatProduitTable)[] = [
  "référence",
  "date",
  "réference de l'utilisateur",
  "fournisseur",
  "magasin",
  "produit",
  "quantité",
  "total",
];



const createNewArrayAchats = (data: IAchatProduit[]) => {
  return data.map((item: IAchatProduit, index: number) => {
    return {
      ...item,
      id: index,
      "réference de l'utilisateur": item.user_invoice_number,
      référence: item.invoice_number,
      fournisseur: item.provider_name,
      magasin: item.entrepot_name,
      produit: item.product_name,
      quantité: item.quantity_bought,
      // total: item.total,
      // date: item.date,
    };
  });
};


export default AchatsProduits;
