import Loading from "../../../components/ui/Loading";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IProduit } from "../../../types/rapport/produits/produits";
import { IProduitTable } from "../../../types/rapport/produits/produits";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/produits/produits/ButtonsCont";
import MagasinSelect from "../../../containers/raports/MagasinSelect";
import TableProduits from "../../../containers/raports/produits/produits/TableProduits";
import DatesCont from "../../../containers/raports/DatesCont";
import { PrivilegesContext } from "../../../App";
import { useNavigate } from "react-router-dom";


const ProduitsReport = () => {


  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];
  const todatSratDate = new Date().toISOString().split("T")[0];
  

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IProduit[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;
    const privileges = useContext(PrivilegesContext);
    const navigate = useNavigate();


  useEffect(() => {
    if (!privileges.Rapports["Rapport Produits"]) navigate("/tableau-de-bord");
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
      return;
    }

    // console.log(startDate, endDate);
    setLoading(true);
    axios
      .post(
        url + "/api/reports/rapport-products",
        {
          start_date: startDate,
          end_date: endDate,
          entrepot_id: magasinId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const newData = createNewArrayAchats(res.data.products);
        setData(newData);
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
  }, [magasinId, startDate, endDate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de produit" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between md:items-end">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        <div className="">
        <ButtonsCont columns={columnsAchats} data={data} />
          <DatesCont
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
      <TableProduits columns={columnsAchats} rows={data} />
    </div>
  );
};

const columnsAchats: (keyof IProduitTable)[] = [
    "code",
    "produit",
    "ventes",
    "montant",
];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
        code: item.code_barre,
        produit: item.name,
        ventes: item.total_sales,
        montant: item.total_amount,
    };
  });
};

// const data_test_achat = [
//   "id": 9,
// "name": "prod1 pdated",
// "code_barre": "123456789",
// "total_sales": 0,
// "total_amount": 0
// ];


export default ProduitsReport;
