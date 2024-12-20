import PageTitle from "../../components/ui/PageTitle";
import IFournisseures from "../../types/fournisseures";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/gens/fournisseures/ButtonCont";
// import Tablevente from "../../containers/gens/clients/TableClients";

const Fournisseurs = () => {
  const [clients, setClients] = useState<IFournisseures[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    setClients(data_test);
    setColumns(columns_test);
  }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Gestion Du Fournisseurs" />
      <ButtonsCont data={clients} columns={columns} />
      {/* <Tablevente rows={clients} columns={columns} /> */}
    </div>
  );
};


export default Fournisseurs;


const columns_test = [
  "id",
  "nom",
  "téléphone",
  "email",
  "vente_total_dû",
  "retour_de_vente_total_dû",
];

 const data_test: IFournisseures[] = [
  {
    id: 1,
    nom: "Fournisseur A",
    téléphone: "0771122334",
    email: "contact@fournisseura.com",
    wilaya: "Alger",
    numéro_de_tva: "123456789",
    dette_dachat_total: 150000,
    total_dette: 20000,
  },
  {
    id: 2,
    nom: "Fournisseur B",
    téléphone: "0556677889",
    email: "info@fournisseurb.com",
    wilaya: "Oran",
    numéro_de_tva: "987654321",
    dette_dachat_total: 250000,
    total_dette: 50000,
  },
  {
    id: 3,
    nom: "Fournisseur C",
    téléphone: "0667788990",
    email: "sales@fournisseurc.com",
    wilaya: "Constantine",
    numéro_de_tva: "456123789",
    dette_dachat_total: 100000,
    total_dette: 30000,
  },
  {
    id: 4,
    nom: "Fournisseur D",
    téléphone: "0773344556",
    email: "support@fournisseurd.com",
    wilaya: "Annaba",
    numéro_de_tva: "321654987",
    dette_dachat_total: 300000,
    total_dette: 75000,
  },
  {
    id: 5,
    nom: "Fournisseur E",
    téléphone: "0555566778",
    email: "contact@fournisseure.com",
    wilaya: "Blida",
    numéro_de_tva: "159753846",
    dette_dachat_total: 50000,
    total_dette: 10000,
  },
];
