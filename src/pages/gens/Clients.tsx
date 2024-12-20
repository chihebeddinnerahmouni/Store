import PageTitle from "../../components/ui/PageTitle";
import IClient from "../../types/client";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/gens/clients/ButtonCont";
import Tablevente from "../../containers/gens/clients/TableClients";


const Clients = () => {

    const [clients, setClients] = useState<IClient[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        setClients(clients_test);
        setColumns(columns_test);
    }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
          <PageTitle text="Gestion Du Clients" />
          <ButtonsCont data={clients} columns={columns} />
            <Tablevente rows={clients} columns={columns} />
    </div>
  );
}

export default Clients


const columns_test = [
    "id", 
    "nom",
    "téléphone",
    "email",
    "vente_total_dû",
    "retour_de_vente_total_dû",
]

const clients_test: IClient[] = [
  {
    id: 1,
    nom: "John Doe",
    téléphone: "123-456-7890",
    email: "johndoe@example.com",
    vente_total_dû: 1500.0,
    retour_de_vente_total_dû: 100.0,
  },
  {
    id: 2,
    nom: "Jane Smith",
    téléphone: "987-654-3210",
    email: "janesmith@example.com",
    vente_total_dû: 2200.5,
    retour_de_vente_total_dû: 150.5,
  },
  {
    id: 3,
    nom: "Marc Dupont",
    téléphone: "555-123-4567",
    email: "marcdupont@example.com",
    vente_total_dû: 3000.0,
    retour_de_vente_total_dû: 200.0,
  },
  {
    id: 4,
    nom: "Sophie Martin",
    téléphone: "444-789-0123",
    email: "sophiemartin@example.com",
    vente_total_dû: 1800.75,
    retour_de_vente_total_dû: 120.75,
  },
];




