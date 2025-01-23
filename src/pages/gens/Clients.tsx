import PageTitle from "../../components/ui/PageTitle";
import IClient from "../../types/client";
import { useState, useEffect, useContext } from "react";
import ButtonsCont from "../../containers/gens/clients/ButtonCont";
import TableClients from "../../containers/gens/clients/TableClients";
import Loading from "../../components/ui/Loading";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";


const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BASE_URL as string;
  const columns = columns_test;
    const privileges = useContext(PrivilegesContext);
    const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Gens.Clients) navigate("/tableau-de-bord");

    axios
      .get(`${url}/api/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.clients);
        const newClientsArray = res.data.clients.map((client: IClient) => {
          return {
            ...client,
            nom: client.name,
            téléphone: client.phone,
          };
        });
        setClients(newClientsArray);
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

    // setClients(clients_test);
    // setColumns(columns_test);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Gestion Du Clients" />
      <ButtonsCont data={clients} columns={columns} />
      <TableClients rows={clients} columns={columns} />
    </div>
  );
};

export default Clients;

const columns_test: (keyof IClient)[] = [
  "id",
  "nom",
  // "téléphone",
  // "email",
  // "address",

  // "vente_total_dû",
  // "retour_de_vente_total_dû",
];

// const clients_test: IClient[] = [
//   {
//     id: 1,
//     code_client: "C001",
//     name: "John Doe",
//     email: "johndoe@example.com",
//     phone: "123-456-7890",
//     address: "123 Main St",
//     status: "active",
//     total_purchases: "1500.00",
//     outstanding_balance: "100.00",
//     created_by: 1,
//     updated_by: null,
//     deleted_by: null,
//     created_at: "2024-12-23T23:33:41.000000Z",
//     updated_at: "2024-12-23T23:33:41.000000Z"
//   },
//   {
//     id: 2,
//     code_client: "C002",
//     name: "Jane Smith",
//     email: "janesmith@example.com",
//     phone: "987-654-3210",
//     address: "456 Elm St",
//     status: "active",
//     total_purchases: "2200.50",
//     outstanding_balance: "150.50",
//     created_by: 1,
//     updated_by: null,
//     deleted_by: null,
//     created_at: "2024-12-23T23:33:41.000000Z",
//     updated_at: "2024-12-23T23:33:41.000000Z"
//   },
//   {
//     id: 3,
//     code_client: "C003",
//     name: "Marc Dupont",
//     email: "marcdupont@example.com",
//     phone: "555-123-4567",
//     address: "789 Oak St",
//     status: "active",
//     total_purchases: "3000.00",
//     outstanding_balance: "200.00",
//     created_by: 1,
//     updated_by: null,
//     deleted_by: null,
//     created_at: "2024-12-23T23:33:41.000000Z",
//     updated_at: "2024-12-23T23:33:41.000000Z"
//   },
//   {
//     id: 4,
//     code_client: "C004",
//     name: "Sophie Martin",
//     email: "sophiemartin@example.com",
//     phone: "444-789-0123",
//     address: "101 Pine St",
//     status: "active",
//     total_purchases: "1800.75",
//     outstanding_balance: "120.75",
//     created_by: 1,
//     updated_by: null,
//     deleted_by: null,
//     created_at: "2024-12-23T23:33:41.000000Z",
//     updated_at: "2024-12-23T23:33:41.000000Z"
//   }
// ];
