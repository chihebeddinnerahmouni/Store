import { useState, useEffect } from "react";
import IRetourAchats from "../../types/RetourAchats";
import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/retour/retour achats/ButtonsCont";
import RetourAchatsTable from "../../containers/retour/retour achats/RetourAchatTable";

const RetourAchats = () => {
  const [data, setData] = useState<IRetourAchats[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    setData(data_test);
    setColumns(columns_test);
  }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Retour des achats" />
      <ButtonsCont
        data={data}
        columns={columns}
        // date={date}
        // setDate={setDate}
        // reference={reference}
        // setReference={setReference}
        // fournisseur={fournisseur}
        // setFournisseur={setFournisseur}
        // magasin={magasin}
        // setMagasin={setMagasin}
        // status={status}
        // setStatus={setStatus}
        // paimentStatus={paimentStatus}
        // setPaimentStatus={setPaimentStatus}
      />
      <RetourAchatsTable rows={data} columns={columns} />
    </div>
  );
};


const columns_test = [
  // "id",
  "reference",
  "date",
  "client",
  "magasin",
  "réf_vente",
  "status",
  "total",
  "payé",
  "rest",
  "status_de_paiment",
];

const data_test: IRetourAchats[] = [
  {
    id: 1,
    reference: "REF-001",
    date: "2024-12-20",
    fournisseur: "Fournisseur A",
    magasin: "Magasin Alpha",
    réf_dachat: "ACH-123",
    status: "Reçu",
    total: 1500,
    payé: 1500,
    restant: 0,
    status_de_paiement: "paid",
  },
  {
    id: 2,
    reference: "REF-002",
    date: "2024-12-19",
    fournisseur: "Fournisseur B",
    magasin: "Magasin Beta",
    réf_dachat: "ACH-456",
    status: "Non Reçu",
    total: 2000,
    payé: 1000,
    restant: 1000,
    status_de_paiement: "partiel",
  },
  {
    id: 3,
    reference: "REF-003",
    date: "2024-12-18",
    fournisseur: "Fournisseur C",
    magasin: "Magasin Gamma",
    réf_dachat: "ACH-789",
    status: "Reçu",
    total: 1200,
    payé: 0,
    restant: 1200,
    status_de_paiement: "non paid",
  },
  {
    id: 4,
    reference: "REF-004",
    date: "2024-12-17",
    fournisseur: "Fournisseur D",
    magasin: "Magasin Delta",
    réf_dachat: "ACH-101",
    status: "Reçu",
    total: 2500,
    payé: 2500,
    restant: 0,
    status_de_paiement: "paid",
  },
];

export default RetourAchats;
