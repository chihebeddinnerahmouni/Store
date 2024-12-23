import PageTitle from "../../components/ui/PageTitle";
import IFournisseures from "../../types/fournisseures";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/gens/fournisseures/ButtonCont";
import TableFournis from "../../containers/gens/fournisseures/TableFournis";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";





const Fournisseurs = () => {
  const [data, setData] = useState<IFournisseures[]>([]);
  // const [columns, setColumns] = useState<string[]>([]);
  const columns = columns_test;
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/providers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.providers);
        const newArray = response.data.providers.map((item: any) => {
          return {
            id: item.id,
            code_provider: item.code_provider,
            nom: item.name,
            email: item.email,
            téléphone: item.phone,
            address: item.address,
            status: item.status,
            total_supplies: item.total_supplies,
            amount_paid: item.amount_paid,
            total_dette: item.outstanding_balance,
            created_by: item.created_by,
            updated_by: item.updated_by,
            deleted_by: item.deleted_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
          };
        });
        setData(newArray);
        setLoadingPage(false);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });






    // setClients(data_test);
    // setColumns(columns_test);
  }, []);



  if (loadingPage) {
    return <Loading />;
  } 

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Gestion Du Fournisseurs" />
      <ButtonsCont data={data} columns={columns} />
      <TableFournis rows={data} columns={columns} />
    </div>
  );
};


export default Fournisseurs;


const columns_test = [
  "id",
  "nom",
  "téléphone",
  "email",
  // "wilaya",
  "address",
  // "numéro_de_tva",
  // "dette_dachat_total",
  "total_dette",
];

//  const data_test: IFournisseures[] = [
//   {
//     id: 1,
//     nom: "Fournisseur A",
//     téléphone: "0771122334",
//     email: "contact@fournisseura.com",
//     wilaya: "Alger",
//     numéro_de_tva: "123456789",
//     dette_dachat_total: 150000,
//     total_dette: 20000,
//   },
//   {
//     id: 2,
//     nom: "Fournisseur B",
//     téléphone: "0556677889",
//     email: "info@fournisseurb.com",
//     wilaya: "Oran",
//     numéro_de_tva: "987654321",
//     dette_dachat_total: 250000,
//     total_dette: 50000,
//   },
//   {
//     id: 3,
//     nom: "Fournisseur C",
//     téléphone: "0667788990",
//     email: "sales@fournisseurc.com",
//     wilaya: "Constantine",
//     numéro_de_tva: "456123789",
//     dette_dachat_total: 100000,
//     total_dette: 30000,
//   },
//   {
//     id: 4,
//     nom: "Fournisseur D",
//     téléphone: "0773344556",
//     email: "support@fournisseurd.com",
//     wilaya: "Annaba",
//     numéro_de_tva: "321654987",
//     dette_dachat_total: 300000,
//     total_dette: 75000,
//   },
//   {
//     id: 5,
//     nom: "Fournisseur E",
//     téléphone: "0555566778",
//     email: "contact@fournisseure.com",
//     wilaya: "Blida",
//     numéro_de_tva: "159753846",
//     dette_dachat_total: 50000,
//     total_dette: 10000,
//   },
// ];
