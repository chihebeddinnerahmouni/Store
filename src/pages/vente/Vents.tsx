// import PageTitle from "../../components/ui/PageTitle";
// import VentsTable from "../../containers/vente/vente/VentsTable";
// import ButtonsCont from "../../containers/vente/vente/ButtonsCont";
// import { useState, useEffect, useContext } from "react";
// import IVente from "../../types/vente";
// import Loading from "../../components/ui/Loading";
// import axios from "axios";
// import { enqueueSnackbar } from "notistack";
// import { IVenteTable } from "../../types/vente";
// import { createContext } from "react";
// import { PrivilegesContext } from "../../App";
// import { useNavigate } from "react-router-dom";

// export const VentsContext = createContext<any>({});

// const Achats = () => {
//   const [date, setDate] = useState("");
//   // const [endDate, setEndDate] = useState("");
//   // const [reference, setReference] = useState("");
//   const [userInvNumber, setUserInvNumber] = useState("");
//   // const [productId, setProductId] = useState("");
//   // const [remark, setRemark] = useState("");
//   // const [category, setCategory] = useState(0);
//   // const [createdBy, setCreatedBy] = useState("");
//   // const [updatedBy, setUpdatedBy] = useState("");
//   // const [minLaivraison, setMinLaivraison] = useState("");
//   // const [maxLaivraison, setMaxLaivraison] = useState("");
//   // const [fournisseur, setFournisseur] = useState(0);
//   const [magasin, setMagasin] = useState(0);
//   const [clientId, setClientId] = useState(0);
//   // const [status, setStatus] = useState("");
//   // const [paimentStatus, setPaimentStatus] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<IVente[]>([]);
//   // const [categoriesArray, setCategoriesArray] = useState<any[]>([]);
//   // const [fourniArray, setFourniArray] = useState<any[]>([]);
//   const [magasinArray, setMagasinArray] = useState<any[]>([]);
//   const [clientsArray, setClientsArray] = useState<any[]>([]);

//   const columns = columns_test;
//   const url = import.meta.env.VITE_BASE_URL as string;
//     const privileges = useContext(PrivilegesContext);
//     const navigate = useNavigate();

//   useEffect(() => {
//     // if (!privileges.Sorties["Liste des sorties"]) navigate("/tableau-de-bord");
//     Promise.all([
//       axios.get(`${url}/api/vente`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }),
//       axios.get(`${url}/api/entreports/authorized/get`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }),
//       axios.get(`${url}/api/clients`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }),
//     ])
//       .then((res: any) => {
//         const modifiedAchats = modifiedData(res[0].data.ventes);
//         setData(modifiedAchats);
//         setMagasinArray(res[1].data.entrepots);
//         setClientsArray(res[2].data.clients);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         if (err.message === "Network Error") {
//           enqueueSnackbar("Erreur de connexion", { variant: "error" });
//         } else {
//           enqueueSnackbar(err.response.data.message, { variant: "error" });
//         }
//       });
//     // setData(data_test);
//     // setColumns(columns_test);
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   // console.log(endDate);

//   return (
//     <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
//       <VentsContext.Provider
//         value={{
//           data,
//           setData,
//           columns,
//           date,
//           setDate,
//           // endDate,
//           // setEndDate,
//           // reference,
//           // setReference,
//           userInvNumber,
//           setUserInvNumber,
//           // remark,
//           // setRemark,
//           // fournisseur,
//           // setFournisseur,
//           magasin,
//           setMagasin,
//           clientId,
//           setClientId,
//           clientsArray,
//           // fourniArray,
//           magasinArray,
//           // category,
//           // setCategory,
//           // categoriesArray,
//           // minLaivraison,
//           // setMinLaivraison,
//           // maxLaivraison,
//           // setMaxLaivraison,
//         }}
//       >
//         <PageTitle text="Liste des sorties" />
//         <ButtonsCont/>
//         <VentsTable rows={data} columns={columns} />
//       </VentsContext.Provider>
//     </div>
//   );
// };

// export default Achats;

// const columns_test: (keyof IVenteTable)[] = [
//   // "id",
//   "référence",
//   "date",
//   "référence de l'utilisateur",
//   "nom_du_client",
//   "magasin",
//   "total",
// ];

// const modifiedData = (data: IVente[]) => {
//   return data.map((vente: IVente) => {
//     return {
//       ...vente,
//       référence: vente.invoice_number,
//       nom_du_client: vente.client.name,
//       magasin: vente.entrepot.name,
//       "référence de l'utilisateur": vente.user_invoice_number,
//       total: vente.total_cost,
//     };
//   });
// }

import PageTitle from "../../components/ui/PageTitle";
import VentsTable from "../../containers/vente/vente/VentsTable";
import ButtonsCont from "../../containers/vente/vente/ButtonsCont";
import { useEffect, useContext } from "react";
import IVente from "../../types/vente";
import axios from "axios";
import { IVenteTable } from "../../types/vente";
import { PrivilegesContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL;
const fetshData = async (body: any) => {
  const response = await axios.post<{ ventes: IVente[] }>(
    url + "/api/vente/filter",
    {
      ...(body.clientId && { client_id: body.clientId }),
      ...(body.userInvNumber && { user_invoice_number: body.userInvNumber }),
      ...(body.magasinId && { entrepot_id: body.magasinId }),
      ...(body.date && { date: body.date }),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const modicfiedData = modifiedData(response.data.ventes);
  return modicfiedData;
};

const Achats = () => {
  const columns = columns_test;
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date") || "";
  const userInvNumber = searchParams.get("user_invoice_number") || "";
  const clientId = searchParams.get("client_id") ? parseInt(searchParams.get("client_id")!) : 0;
  const magasinId = searchParams.get("entrepot_id") ? parseInt(searchParams.get("entrepot_id")!) : 0;

  useEffect(() => {
    if (!privileges.Sorties["Liste des sorties"]) navigate("/tableau-de-bord");
  }, []);
  const { data } = useSuspenseQuery({
    queryKey: ["ventes", location.search],
    queryFn: () => fetshData({date, userInvNumber, clientId, magasinId}),
  });


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste des sorties" />
      <ButtonsCont columns={columns} data={data} />
      <VentsTable rows={data} columns={columns} />
    </div>
  );
};

export default Achats;

const columns_test: (keyof IVenteTable)[] = [
  // "id",
  "référence",
  "date",
  "référence de l'utilisateur",
  "nom_du_client",
  "magasin",
  "total",
];

const modifiedData = (data: IVente[]) => {
  return data.map((vente: IVente) => {
    return {
      ...vente,
      référence: vente.invoice_number,
      nom_du_client: vente.client.name,
      magasin: vente.entrepot.name,
      "référence de l'utilisateur": vente.user_invoice_number,
      total: vente.total_cost,
    };
  });
};
