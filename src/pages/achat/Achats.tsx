import PageTitle from "../../components/ui/PageTitle";
// import ProductsTable from "../../containers/products/products/ProductsTable";
import ButtonsCont from "../../containers/products/../achat/achat/ButtonsCont";
import { useState, useEffect } from "react";
import IAchhat  from "../../types/achat";

const Achats = () => {

    const [date, setDate] = useState("");
    const [reference, setReference] = useState("");
    const [fournisseur, setFournisseur] = useState("");
    const [magasin, setMagasin] = useState("");
    const [status, setStatus] = useState("");
    const [paimentStatus, setPaimentStatus] = useState("");
//   const [code, setCode] = useState("");
//   const [categorie, setCategorie] = useState("");
//   const [marque, setMarque] = useState("");
  const [data, setData] = useState<IAchhat[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    setData(data_test);
    setColumns(columns_test);
  }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste de produits" />
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
     {/* <ProductsTable
        rows={data}
        columns={columns}
      /> */}
    </div>
  );
};

export default Achats;

const columns_test = [
  "date",
    "reference",
    "fournisseur",
    "magasin",
    "status",
    "total",
    "payé",
    "dû",
    "status_de_paiement",
];


const data_test: IAchhat[] = [
  {
    id: 1,
    date: "2023-01-01",
    reference: "REF001",
    fournisseur: "Fournisseur A",
    magasin: "Magasin 1",
    status: "En cours",
    total: "1000",
    payé: "500",
    dû: "500",
    status_de_paiement: "Partiellement payé",
  },
  {
    id: 2,
    date: "2023-02-01",
    reference: "REF002",
    fournisseur: "Fournisseur B",
    magasin: "Magasin 2",
    status: "Complété",
    total: "2000",
    payé: "2000",
    dû: "0",
    status_de_paiement: "Payé",
  },
  {
    id: 3,
    date: "2023-03-01",
    reference: "REF003",
    fournisseur: "Fournisseur C",
    magasin: "Magasin 3",
    status: "En attente",
    total: "1500",
    payé: "0",
    dû: "1500",
    status_de_paiement: "Non payé",
  },
  {
    id: 4,
    date: "2023-04-01",
    reference: "REF004",
    fournisseur: "Fournisseur D",
    magasin: "Magasin 4",
    status: "En cours",
    total: "2500",
    payé: "1000",
    dû: "1500",
    status_de_paiement: "Partiellement payé",
  },
  {
    id: 5,
    date: "2023-05-01",
    reference: "REF005",
    fournisseur: "Fournisseur E",
    magasin: "Magasin 5",
    status: "Complété",
    total: "3000",
    payé: "3000",
    dû: "0",
    status_de_paiement: "Payé",
  },
];
