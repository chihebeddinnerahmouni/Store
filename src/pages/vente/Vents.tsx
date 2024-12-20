import PageTitle from "../../components/ui/PageTitle";
import VenteTable from "../../containers/vente/vente/VenteTable";
import ButtonsCont from "../../containers/vente/vente/ButtonsCont";
import { useState, useEffect } from "react";
import IVente from "../../types/vente";

const Vents = () => {
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [magasin, setMagasin] = useState("");
  const [status, setStatus] = useState("");
  const [paimentStatus, setPaimentStatus] = useState("");
  const [data, setData] = useState<IVente[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    setData(data_test);
    setColumns(columns_test);
  }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste des achats" />
      <ButtonsCont
        data={data}
        columns={columns}
        date={date}
        setDate={setDate}
        reference={reference}
        setReference={setReference}
        fournisseur={fournisseur}
        setFournisseur={setFournisseur}
        magasin={magasin}
        setMagasin={setMagasin}
        status={status}
        setStatus={setStatus}
        paimentStatus={paimentStatus}
        setPaimentStatus={setPaimentStatus}
      />
      <VenteTable rows={data} columns={columns} />
    </div>
  );
};


const columns_test = [
  "date",
  "reference",
    "ajouter_par",
    "client",
    "magasin",
    "status",   
    "total",
    "payé",
    "dû",
    "status_de_paiement",
    "status_envoi",
];

const data_test: IVente[] = [
//     status = "completé" || "En cours"
    // paiment_status  = "non paid" || "paid" || "partial"
    
        {
            id: 1,
            date: "2023-01-01",
            reference: "REF001",
            ajouter_par: "User1",
            client: "Client1",
            magasin: "Magasin 1",
            status: "En cours",
            total: "1000",
            payé: "500",
            dû: "500",
            status_de_paiement: "partiel",
            status_envoi: "non envoyé",
        },
        {
            id: 2,
            date: "2023-02-01",
            reference: "REF002",
            ajouter_par: "User2",
            client: "Client2",
            magasin: "Magasin 2",
            status: "Complété",
            total: "2000",
            payé: "2000",
            dû: "0",
            status_de_paiement: "paid",
            status_envoi: "envoyé",
        },
        {
            id: 3,
            date: "2023-03-01",
            reference: "REF003",
            ajouter_par: "User3",
            client: "Client3",
            magasin: "Magasin 3",
            status: "En attente",
            total: "1500",
            payé: "0",
            dû: "1500",
            status_de_paiement: "non paid",
            status_envoi: "non envoyé",
        },
        {
            id: 4,
            date: "2023-04-01",
            reference: "REF004",
            ajouter_par: "User4",
            client: "Client4",
            magasin: "Magasin 4",
            status: "En cours",
            total: "2500",
            payé: "1000",
            dû: "1500",
            status_de_paiement: "partiel",
            status_envoi: "non envoyé",
        },
        {
            id: 5,
            date: "2023-05-01",
            reference: "REF005",
            ajouter_par: "User5",
            client: "Client5",
            magasin: "Magasin 5",
            status: "Complété",
            total: "3000",
            payé: "3000",
            dû: "0",
            status_de_paiement: "paid",
            status_envoi: "envoyé",
        },
    ];

export default Vents;