import Loading from "../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import IEntAchat from "../../types/rapport/entrepot/entrepot_achat";
import { ITableEntrepotAchat } from "../../types/rapport/entrepot/entrepot_achat";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../components/ui/PageTitle";
import ButtonsContAchat from "../../containers/raports/entrepot/achat/ButtonsCont";
import ButtonsContVentes from "../../containers/raports/entrepot/vente/ButtonsCont";
import MagasinSelect from "../../containers/raports/alerte/MagasinSelect";
import TableAchat from "../../containers/raports/entrepot/achat/TableAchat";
import SwitchCont from "../../containers/raports/entrepot/SwitchCont";
import { ITableEntrepotVente } from "../../types/rapport/entrepot/entrepot_vente";
import IEntVente from "../../types/rapport/entrepot/entrepot_vente";
import TableVentes from "../../containers/raports/entrepot/vente/TableVentes";

const EntrepotsReport = () => {
  const [loading, setLoading] = useState(true);
  const [dataAchats, setDataAchats] = useState<IEntAchat[]>([]);
  const [dataVentes, setDataVentes] = useState<IEntVente[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;
  const [selected, setSelected] = useState<"achats" | "ventes">("achats");

  useEffect(() => {
    Promise.all([
      axios.get(url + "/api/entreports/authorized/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // axios.get(url + "/api/reports/stock-alerts/" + magasinId , {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }),
    ])
      .then(
        axios.spread(
          (
            // data,
            magasins
          ) => {
            // console.log(magasins.data.entrepots);
            const newArrayAchats = createNewArrayAchats(data_test_achat);
            const newArrayVentes = createNewArrayVentes(data_test_ventes);
            setDataVentes(newArrayVentes);
            setDataAchats(newArrayAchats);
            setMagasinsArray(magasins.data.entrepots);
            setLoading(false);
          }
        )
      )
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });

    // fetshData()
    // const timer = setTimeout(() => {
    //   const newArray = createNewArray(data)
    //   setData(newArray);
    //   setLoading(false)
    // }, 1000)
    // return () => clearTimeout(timer)
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport d'entrepôt" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        {selected === "achats" ? (
          <ButtonsContAchat columns={columnsAchats} data={dataAchats} />
        ) : (
          <ButtonsContVentes columns={columnsVentes} data={dataVentes} />
        )}
      </div>
      <SwitchCont selected={selected} setSelected={setSelected} />
      {selected === "achats" ? (
        <TableAchat columns={columnsAchats} rows={dataAchats} />
      ) : (
        <TableVentes columns={columnsVentes} rows={dataVentes} />
      )}
    </div>
  );
};

const columnsAchats: (keyof ITableEntrepotAchat)[] = [
  "date",
  "référence",
  "nom_du_client",
  "magasin",
  "total",
];

const data_test_achat = [
  {
    date: "2023-10-01",
    id: 1,
    code: "EA001",
    client: {
      id: 1,
      code_client: "C001",
      name: "Client One",
      email: "clientone@example.com",
      phone: "1234567890",
      address: "123 Main St",
      status: "active",
      total_purchases: "1000.00",
      outstanding_balance: "200.00",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
    entrepot: {
      id: 1,
      name: "Warehouse One",
      code_entreport: "W001",
      description: "Main warehouse",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
    total: 500,
    référence: "REF001",
    magasin: "Main Store",
  },
  {
    date: "2023-10-02",
    id: 2,
    code: "EA002",
    client: {
      id: 2,
      code_client: "C002",
      name: "Client Two",
      email: "clienttwo@example.com",
      phone: "0987654321",
      address: "456 Elm St",
      status: "inactive",
      total_purchases: "2000.00",
      outstanding_balance: "500.00",
      created_by: 2,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-02-01T00:00:00Z",
      updated_at: "2023-02-01T00:00:00Z",
    },
    entrepot: {
      id: 2,
      name: "Warehouse Two",
      code_entreport: "W002",
      description: "Secondary warehouse",
      created_by: 2,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-02-01T00:00:00Z",
      updated_at: "2023-02-01T00:00:00Z",
    },
    total: 1000,
    référence: "REF002",
    magasin: "Secondary Store",
  },
];

const columnsVentes: (keyof ITableEntrepotVente)[] = [
  "référence",
  "nom_du_client",
  "magasin",
  "total",
  "status",
];

const data_test_ventes = [
  {
    id: 1,
    code: "EV001",
    client: {
      id: 1,
      code_client: "C001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      status: "active",
      total_purchases: "1000.00",
      outstanding_balance: "200.00",
      created_by: 201,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-01-01T10:00:00Z",
      updated_at: "2023-01-01T10:00:00Z",
    },
    entrepot: {
      id: 1,
      name: "Warehouse A",
      code_entreport: "WA123",
      description: "Main warehouse for electronics",
      created_by: 101,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-01-01T10:00:00Z",
      updated_at: "2023-01-01T10:00:00Z",
    },
    total: 500,
    status: "completed",
    référence: "REF001",
    nom_du_client: "John Doe",
    magasin: "Warehouse A",
  },
  {
    id: 2,
    code: "EV002",
    client: {
      id: 2,
      code_client: "C002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, Othertown, USA",
      status: "inactive",
      total_purchases: "500.00",
      outstanding_balance: "50.00",
      created_by: 202,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-02-01T11:00:00Z",
      updated_at: "2023-02-01T11:00:00Z",
    },
    entrepot: {
      id: 2,
      name: "Warehouse B",
      code_entreport: "WB456",
      description: "Secondary warehouse for furniture",
      created_by: 102,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-02-01T11:00:00Z",
      updated_at: "2023-02-01T11:00:00Z",
    },
    total: 300,
    status: "pending",
    référence: "REF002",
    nom_du_client: "Jane Smith",
    magasin: "Warehouse B",
  },
];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      référence: item.code,
      nom_du_client: item.client.name,
      magasin: item.entrepot.name,
    };
  });
};

const createNewArrayVentes = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      référence: item.code,
      nom_du_client: item.client.name,
      magasin: item.entrepot.name,
    };
  });
};

export default EntrepotsReport;
