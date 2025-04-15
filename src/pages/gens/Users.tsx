import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect } from "react";
// import ButtonsCont from "../../containers/gens/clients/ButtonCont";
import TableUsers from "../../containers/gens/users/TableUsers";
import Loading from "../../components/ui/Loading";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { IUser } from "../../types/utilisateur";
import { IUserTable } from "../../types/utilisateur";

const Users = () => {
  const [clients, setClients] = useState<IUser[]>([]);
  // const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BASE_URL as string;
  const columns = columns_test;

  useEffect(() => {
    axios
      .get(`${url}/api/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        // console.log(res.data.clients);
        const newClientsArray = res.data.clients.map((client: IUser) => {
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
      <PageTitle text="Gestion De utilisateurs" />
      {/* <ButtonsCont data={clients} columns={columns} /> */}
      <TableUsers rows={clients} columns={columns} />
    </div>
  );
};

export default Users;

const columns_test: (keyof IUserTable)[] = [
  "nom",
  "téléphone",
  "email",
  "address",
];
