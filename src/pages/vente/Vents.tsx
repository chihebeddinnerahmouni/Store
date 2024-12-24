import PageTitle from "../../components/ui/PageTitle";
import VentsTable from "../../containers/vente/vente/VentsTable";
import ButtonsCont from "../../containers/vente/vente/ButtonsCont";
import { useState, useEffect } from "react";
import IVente from "../../types/vente";
import Loading from "../../components/ui/Loading";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { IVenteTable } from "../../types/vente";
import { createContext } from "react";

export const VentsContext = createContext<any>({});

const Achats = () => {
  const [date, setDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [reference, setReference] = useState("");
  const [userInvNumber, setUserInvNumber] = useState("");
  // const [productId, setProductId] = useState("");
  // const [remark, setRemark] = useState("");
  // const [category, setCategory] = useState(0);
  // const [createdBy, setCreatedBy] = useState("");
  // const [updatedBy, setUpdatedBy] = useState("");
  // const [minLaivraison, setMinLaivraison] = useState("");
  // const [maxLaivraison, setMaxLaivraison] = useState("");
  // const [fournisseur, setFournisseur] = useState(0);
  const [magasin, setMagasin] = useState(0);
  const [clientId, setClientId] = useState(0);
  // const [status, setStatus] = useState("");
  // const [paimentStatus, setPaimentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IVente[]>([]);
  // const [categoriesArray, setCategoriesArray] = useState<any[]>([]);
  // const [fourniArray, setFourniArray] = useState<any[]>([]);
  const [magasinArray, setMagasinArray] = useState<any[]>([]);
  const [clientsArray, setClientsArray] = useState<any[]>([]);

  const columns = columns_test;
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    Promise.all([
      axios.get(`${url}/api/vente`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then((res) => {
        // console.log(res[0].data.ventes);
        const modifiedAchats = res[0].data.ventes.map((vente: IVente) => {
          return {
            ...vente,
            // date: new Date(achat.created_at).toLocaleDateString(),
            référence: vente.invoice_number,
            nom_du_client: vente.client.name,
            magasin: vente.entrepot.name,
          };
        });
        setData(modifiedAchats);
        setMagasinArray(res[1].data.entrepots);
        setClientsArray(res[2].data.clients);
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
    // setData(data_test);
    // setColumns(columns_test);
  }, []);

  if (loading) {
    return <Loading />;
  }

  // console.log(endDate);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <VentsContext.Provider
        value={{
          data,
          setData,
          columns,
          date,
          setDate,
          // endDate,
          // setEndDate,
          // reference,
          // setReference,
          userInvNumber,
          setUserInvNumber,
          // remark,
          // setRemark,
          // fournisseur,
          // setFournisseur,
          magasin,
          setMagasin,
          clientId,
          setClientId,
          clientsArray,
          // fourniArray,
          magasinArray,
          // category,
          // setCategory,
          // categoriesArray,
          // minLaivraison,
          // setMinLaivraison,
          // maxLaivraison,
          // setMaxLaivraison,
        }}
      >
        <PageTitle text="Liste des vents" />
        <ButtonsCont/>
        <VentsTable rows={data} columns={columns} />
      </VentsContext.Provider>
    </div>
  );
};

export default Achats;

const columns_test: (keyof IVenteTable)[] = [
  "id", 
  "nom_du_client",
  "magasin",
  "référence",
  "date",
];

















  // import PageTitle from "../../components/ui/PageTitle";
  // import VenteTable from "../../containers/vente/vente/VenteTable";
  // import ButtonsCont from "../../containers/vente/vente/ButtonsCont";
  // import { useState, useEffect } from "react";
  // import IVente from "../../types/vente";
  
  // const Vents = () => {
  //   const [date, setDate] = useState("");
  //   const [reference, setReference] = useState("");
  //   const [fournisseur, setFournisseur] = useState("");
  //   const [magasin, setMagasin] = useState("");
  //   const [status, setStatus] = useState("");
  //   const [paimentStatus, setPaimentStatus] = useState("");
  //   const [data, setData] = useState<IVente[]>([]);
  //   const [columns, setColumns] = useState<string[]>([]);
  
  //   useEffect(() => {
  //     setData(data_test);
  //     setColumns(columns_test);
  //   }, []);
  
  //   return (
  //     <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
  //       <PageTitle text="Liste des achats" />
  //       <ButtonsCont
  //         data={data}
  //         columns={columns}
  //         date={date}
  //         setDate={setDate}
  //         reference={reference}
  //         setReference={setReference}
  //         fournisseur={fournisseur}
  //         setFournisseur={setFournisseur}
  //         magasin={magasin}
  //         setMagasin={setMagasin}
  //         status={status}
  //         setStatus={setStatus}
  //         paimentStatus={paimentStatus}
  //         setPaimentStatus={setPaimentStatus}
  //       />
  //       <VenteTable rows={data} columns={columns} />
  //     </div>
  //   );
  // };
  
  
  // const columns_test = [
  //   "date",
  //   "reference",
  //     "ajouter_par",
  //     "client",
  //     "magasin",
  //     "status",
  //     "total",
  //     "payé",
  //     "dû",
  //     "status_de_paiement",
  //     "status_envoi",
  // ];
  
  // const data_test: IVente[] = [
      
  //         {
  //             id: 1,
  //             date: "2023-01-01",
  //             reference: "REF001",
  //             ajouter_par: "User1",
  //             client: "Client1",
  //             magasin: "Magasin 1",
  //             status: "En cours",
  //             total: "1000",
  //             payé: "500",
  //             dû: "500",
  //             status_de_paiement: "partiel",
  //             status_envoi: "non envoyé",
  //         },
  //         {
  //             id: 2,
  //             date: "2023-02-01",
  //             reference: "REF002",
  //             ajouter_par: "User2",
  //             client: "Client2",
  //             magasin: "Magasin 2",
  //             status: "Complété",
  //             total: "2000",
  //             payé: "2000",
  //             dû: "0",
  //             status_de_paiement: "paid",
  //             status_envoi: "envoyé",
  //         },
  //         {
  //             id: 3,
  //             date: "2023-03-01",
  //             reference: "REF003",
  //             ajouter_par: "User3",
  //             client: "Client3",
  //             magasin: "Magasin 3",
  //             status: "En attente",
  //             total: "1500",
  //             payé: "0",
  //             dû: "1500",
  //             status_de_paiement: "non paid",
  //             status_envoi: "non envoyé",
  //         },
  //         {
  //             id: 4,
  //             date: "2023-04-01",
  //             reference: "REF004",
  //             ajouter_par: "User4",
  //             client: "Client4",
  //             magasin: "Magasin 4",
  //             status: "En cours",
  //             total: "2500",
  //             payé: "1000",
  //             dû: "1500",
  //             status_de_paiement: "partiel",
  //             status_envoi: "non envoyé",
  //         },
  //         {
  //             id: 5,
  //             date: "2023-05-01",
  //             reference: "REF005",
  //             ajouter_par: "User5",
  //             client: "Client5",
  //             magasin: "Magasin 5",
  //             status: "Complété",
  //             total: "3000",
  //             payé: "3000",
  //             dû: "0",
  //             status_de_paiement: "paid",
  //             status_envoi: "envoyé",
  //         },
  //     ];
  
  // export default Vents;
