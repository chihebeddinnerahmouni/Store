import { useState, useEffect } from "react"
import IRetourvents from "../../types/retour-vents"
import PageTitle from "../../components/ui/PageTitle"
import ButtonsCont from "../../containers/retour/retour des vents/ButtonsCont"
import RetourVenteTable from "../../containers/retour/retour des vents/RetourVenteTable"
// import { PrivilegesContext } from "../../App";
// import { useNavigate } from "react-router-dom";

const RetourVantes = () => {

    const [data, setData] = useState<IRetourvents[]>([])
  const [columns, setColumns] = useState<string[]>([])
  // const privileges = useContext(PrivilegesContext);
  // const navigate = useNavigate();

    useEffect(() => {
        setData(data_test)
        setColumns(columns_test)
    }, [])


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Retour des vents" />
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
      <RetourVenteTable rows={data} columns={columns} />
    </div>
  );
}

export default RetourVantes

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
]

const data_test: IRetourvents[] = [
  {
    id: 1,
    date: "2024-12-20",
    reference: "REF1234",
    client: "John Doe",
    magasin: "Magasin Alpha",
    réf_vente: "VNT1234",
    status: "Complété",
    total: 2000,
    payé: 2000,
    rest: 0,
    status_de_paiment: "paid",
  },
  {
    id: 2,
    date: "2024-12-19",
    reference: "REF5678",
    client: "Jane Smith",
    magasin: "Magasin Beta",
    réf_vente: "VNT5678",
    status: "En cours",
    total: 1500,
    payé: 500,
    rest: 1000,
    status_de_paiment: "partiel",
  },
  {
    id: 3,
    date: "2024-12-18",
    reference: "REF9101",
    client: "Michael Brown",
    magasin: "Magasin Gamma",
    réf_vente: "VNT9101",
    status: "Complété",
    total: 3000,
    payé: 0,
    rest: 3000,
    status_de_paiment: "no paid",
  },
  {
    id: 4,
    date: "2024-12-17",
    reference: "REF1123",
    client: "Emily Davis",
    magasin: "Magasin Delta",
    réf_vente: "VNT1123",
    status: "En cours",
    total: 2500,
    payé: 1250,
    rest: 1250,
    status_de_paiment: "partiel",
  },
];
