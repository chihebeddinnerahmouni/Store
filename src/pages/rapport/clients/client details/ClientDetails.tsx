import Loading from "../../../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
// import IEntAchat from "../../../../types/rapport/entrepot/entrepot_achat";
// import { ITableEntrepotAchat } from "../../../../types/rapport/entrepot/entrepot_achat";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../../components/ui/PageTitle";
// import ButtonsContAchat from "../../../../containers/raports/clients/details/achat/ButtonsCont";
import ButtonsContVentes from "../../../../containers/raports/clients/details/vente/ButtonsCont";
// import TableAchat from "../../../../containers/raports/clients/details/achat/TableAchat";
import TableVentes from "../../../../containers/raports/clients/details/vente/TableVentes";
import SwitchButtons from "../../../../components/rapport/SwitchButtons";
import { useParams } from "react-router-dom";
import { IClientVent } from "../../../../types/rapport/clients/details/vente_details";
import { IClientVenteTable } from "../../../../types/rapport/clients/details/vente_details";





const ClientDetails = () => {
  const [loading, setLoading] = useState(true);
//   const [dataAchats, setDataAchats] = useState<IClient[]>([]);
  const [dataVentes, setDataVentes] = useState<IClientVent[]>([]);
  const url = import.meta.env.VITE_BASE_URL as string;
  // const [selected, setSelected] = useState<"achats" | "ventes">("achats");
    const [selected, setSelected] = useState<string>("Achats");
    const { clientId } = useParams<{ clientId: string }>();
    const [client, setClient] = useState<any>({});
    const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + `/api/reports/clients/${clientId}/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
            // console.log(res.data);
            // setDataAchats(createNewArrayAchats(res.data.achats));
            setDataVentes(createNewArrayVentes(res.data.ventes));
            setClient(res.data.client);
            setTotal(res.data.global_total);
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
      <PageTitle text="Rapport de client" />
      <p className="text-center font-bold text-xl whitespace-nowrap">
        {client.name}
      </p>
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between">
        {/* {selected === "achats" ? (
          <ButtonsContAchat columns={columnsAchats} data={dataAchats} />
        ) : ( */}
        <ButtonsContVentes columns={columnsVentes} data={dataVentes} />
        {/* )} */}
      </div>
      <SwitchButtons
        options={["Achats", "Ventes"]}
        setSelected={setSelected}
        selected={selected}
      />
      <h2 className="text-xl font-bold mt-5 lg:text-2xl lg:mt-10">
        Total : {total} DA
      </h2>
      {/* {selected === "achats" ? (
        <TableAchat columns={columnsAchats} rows={dataAchats} />
      ) : ( */}
      <TableVentes columns={columnsVentes} rows={dataVentes} />
      {/* )}  */}
    </div>
  );
};

// const columnsAchats: (keyof ITableEntrepotAchat)[] = [
//   "référence",
//   "fournisseur",
//   "référence de l'utilisateur",
//   "magasin",
//   "coût_total",
// ];

// const createNewArrayAchats = (data: any) => {
//   return data.map((item: any) => {
//     return {
//       ...item,
//       fournisseur: item.provider_name,
//       référence: item.invoice_number,
//       "référence de l'utilisateur": item.user_invoice_number,
//       magasin: item.entrepot_name,
//       coût_total: item.total_cost,
//     };
//   });
// };

const createNewArrayVentes = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
        client: item.client_name,
        référence: item.invoice_number,
        "référence client": item.user_invoice_number,
        magasin: item.entrepot_name,
        // total: item.total,
        // date: item.date,
    };
  });
};

const columnsVentes: (keyof IClientVenteTable)[] = [
    "référence",
    "client",
    "référence client",
    "magasin",
    "total",
    "date",
];


export default ClientDetails;
