import PageTitle from "../../components/ui/PageTitle";
import AchatTable from "../../containers/achat/achat/AchatTable";
import ButtonsCont from "../../containers/products/../achat/achat/ButtonsCont";
import { useState, useEffect } from "react";
import IAchat  from "../../types/achat";
import Loading from "../../components/ui/Loading";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { IAchatTable } from "../../types/achat";
import { createContext } from "react";


export const AchatsContext = createContext<any>(null);


const Achats = () => {
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reference, setReference] = useState("");
  const [userInvNumber, setUserInvNumber] = useState("");
  // const [productId, setProductId] = useState("");
  const [remark, setRemark] = useState("");
  const [category, setCategory] = useState(0);
  // const [createdBy, setCreatedBy] = useState("");
  // const [updatedBy, setUpdatedBy] = useState("");
  const [minLaivraison, setMinLaivraison] = useState("");
  const [maxLaivraison, setMaxLaivraison] = useState("");
  const [fournisseur, setFournisseur] = useState(0);
  const [magasin, setMagasin] = useState(0);
  // const [status, setStatus] = useState("");
  // const [paimentStatus, setPaimentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAchat[]>([]);
  const [categoriesArray, setCategoriesArray] = useState<any[]>([]);
  const [fourniArray, setFourniArray] = useState<any[]>([]);
  const [magasinArray, setMagasinArray] = useState<any[]>([]);

  const columns = columns_test;
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    Promise.all([
      axios.get(`${url}/api/achats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
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
      axios.get(`${url}/api/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then((res) => {
        const modifiedAchatsArray = modifiedAchats(res[0].data.achats);
        setData(modifiedAchatsArray);
        setMagasinArray(res[1].data.entrepots);
        setFourniArray(res[2].data.providers);
        setCategoriesArray(res[3].data.categories);
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  // console.log(endDate);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <AchatsContext.Provider
        value={{
          data,
          setData,
          columns,
          date,
          setDate,
          endDate,
          setEndDate,
          reference,
          setReference,
          userInvNumber,
          setUserInvNumber,
          remark,
          setRemark,
          fournisseur,
          setFournisseur,
          magasin,
          setMagasin,
          // status,
          // setStatus,
          // paimentStatus,
          // setPaimentStatus,
          fourniArray,
          magasinArray,
          category,
          setCategory,
          categoriesArray,
          minLaivraison,
          setMinLaivraison,
          maxLaivraison,
          setMaxLaivraison,
        }}
      >
        <PageTitle text="Liste des achats" />
        <ButtonsCont/>
        <AchatTable rows={data} columns={columns} />
      </AchatsContext.Provider>
    </div>
  );
};

export default Achats;

const columns_test: (keyof IAchatTable)[] = [
  "date",
  "reference",
  "fournisseur",
  "magasin",
  // "status",
  "total",
  // "payé",
  // "dû",
  // "status_de_paiement",
];

const modifiedAchats = (achats: IAchat[]) => {
  return achats.map((achat: IAchat) => {
    return {
      ...achat,
      date: new Date(achat.created_at).toLocaleDateString(),
      reference: achat.invoice_number,
      fournisseur: achat.provider.name,
      magasin: achat.entrepot.name,
      // status: achat.status,
      total: achat.total_cost,
    };
  });
}