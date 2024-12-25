import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import axios from "axios";
import IInvDetails_achats from "../../../types/rapport/inventaire/inv_details_achat";
import { IInvDetails_achats_Table } from "../../../types/rapport/inventaire/inv_details_achat";
import { enqueueSnackbar } from "notistack";
import ButtonsContAchat from "../../../containers/raports/inventaire/details/achat/ButtonsCont";
// import ButtonsContVentes from "../../../containers/raports/inventaire/details/vente/ButtonsCont";
import TableAchat from "../../../containers/raports/inventaire/details/achat/TableAchat";
// import { ITableEntrepotVente } from "../../../types/rapport/entrepot/entrepot_vente";
// import IEntVente from "../../../types/rapport/entrepot/entrepot_vente";
// import TableVentes from "../../../containers/raports/inventaire/details/vente/TableVentes";
import SwitchButtons from "../../../components/rapport/SwitchButtons";
import { Modal, Box } from "@mui/material";
import QuatiteTable from "../../../containers/raports/inventaire/details/QuatiteTable";

interface ViewModalProps {
  onClose: () => void;
  id: number;
}

const DetailsModal = ({ onClose }: ViewModalProps) => {
  const [loading, setLoading] = useState(true);
  const [dataAchats, setDataAchats] = useState<IInvDetails_achats[]>([]);
  //   const [dataVentes, setDataVentes] = useState<IEntVente[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
//   const [magasinId, setMagasinId] = useState<number>(0);
  const [statsArray, setStatsArray] = useState<
    { magasin: string; quantité: number }[]
  >([]);
  const url = import.meta.env.VITE_BASE_URL as string;
  // const [selected, setSelected] = useState<"achats" | "ventes">("achats");
  const [selected, setSelected] = useState<string>("achats");

    console.log(magasinsArray);
    
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
            // const newArrayVentes = createNewArrayVentes(data_test_ventes);
            // setDataVentes(newArrayVentes);
            setStatsArray(statsArray_test);
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
  }, []);

  return (
    <Modal
      open={true}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          maxHeight: "90vh",
          overflowY: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <div className="w-full">
            {/* {selected === "achats" ? ( */}
            <ButtonsContAchat columns={columnsAchats} data={dataAchats} />
            {/* ) : (
               <ButtonsContVentes columns={columnsVentes} data={dataVentes} />
             )} */}
            <QuatiteTable data={statsArray} />
            <SwitchButtons
              options={["achats", "ventes"]}
              setSelected={setSelected}
              selected={selected}
            />
            {/* {selected === "achats" ? ( */}
            <TableAchat columns={columnsAchats} rows={dataAchats} />
            {/* ) : (
            <TableVentes columns={columnsVentes} rows={dataVentes} />
          )} */}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default DetailsModal;

const columnsAchats: (keyof IInvDetails_achats_Table)[] = [
  "date",
  "référence",
  "nom_du_produit",
  "fournisseur",
  "magasin",
  "quantité",
  "total",
];

const data_test_achat = [
  {
    id: 1,
    provider_id: 1,
    invoice_number: "INV001",
    user_invoice_number: "USR001",
    entrepot_id: 1,
    total_cost: "1500.00",
    livraison_cost: "50.00",
    remarks: "First purchase",
    created_by: 101,
    updated_by: null,
    deleted_by: null,
    created_at: "2023-01-01T10:00:00Z",
    updated_at: "2023-01-01T10:00:00Z",
    produit: {
      id: 11,
      name: "toyota",
      code_barre: "8345588766",
      category_id: 2,
      brand_id: 1,
      unit_id: 1,
      rayonage_id: 2,
      tax_percentage: "0.00",
      description: "hh",
      price_buy: "7000.00",
      price_sell: "9000.00",
      stock_alert: 30,
      quantity: 13,
      has_serial_number: 1,
      created_by: 2,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T16:39:42.000000Z",
      updated_at: "2024-12-24T16:39:42.000000Z",
      category: {
        id: 2,
        code_category: "TS",
        name_category: "test",
        description: "test",
        status: "active",
        deleted_by: null,
        created_by: 2,
        updated_by: null,
        created_at: "2024-12-24T16:34:03.000000Z",
        updated_at: "2024-12-24T16:34:03.000000Z",
      },
      brand: {
        id: 1,
        code_brand: "BR001",
        name_brand: "Brand Name",
        description: "Brand description",
        created_by: 1,
        updated_by: null,
        deleted_by: null,
        created_at: "2024-12-24T11:18:46.000000Z",
        updated_at: "2024-12-24T11:18:46.000000Z",
      },
      unit: {
        id: 1,
        code_unit: "KG",
        name_unit: "Kilogram",
        description: "Unit of mass",
        created_by: 1,
        updated_by: null,
        deleted_by: null,
        created_at: "2024-12-24T11:27:08.000000Z",
        updated_at: "2024-12-24T11:27:08.000000Z",
      },
      rayonage: {
        id: 2,
        code_location: "test",
        name: "testjhjlhj",
        description: "test",
        created_by: 2,
        updated_by: null,
        deleted_by: null,
        created_at: "2024-12-24T16:34:58.000000Z",
        updated_at: "2024-12-24T16:34:58.000000Z",
      },
    },
    provider: {
      id: 1,
      name: "Provider One",
      phone: "1234567890",
      email: "provider1@example.com",
      address: "123 Provider St",
      created_by: 101,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-01-01T10:00:00Z",
      updated_at: "2023-01-01T10:00:00Z",
      amount_paid: "1500.00",
      code_provider: "PROV001",
      outstanding_balance: "0.00",
      status: "active",
      total_supplies: "1",
    },
    entrepot: {
      id: 1,
      name: "Warehouse One",
      code_entreport: "WH001",
      description: "Main warehouse",
      created_by: 101,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-01-01T10:00:00Z",
      updated_at: "2023-01-01T10:00:00Z",
    },
  },
  {
    id: 2,
    provider_id: 2,
    invoice_number: "INV002",
    user_invoice_number: "USR002",
    entrepot_id: 2,
    total_cost: "2000.00",
    livraison_cost: "100.00",
    remarks: "Second purchase",
    created_by: 102,
    updated_by: null,
    deleted_by: null,
    created_at: "2023-02-01T11:00:00Z",
    updated_at: "2023-02-01T11:00:00Z",
    produit: {
      id: 11,
      name: "toyota",
      code_barre: "8345588766",
      category_id: 2,
      brand_id: 1,
      unit_id: 1,
      rayonage_id: 2,
      tax_percentage: "0.00",
      description: "hh",
      price_buy: "7000.00",
      price_sell: "9000.00",
      stock_alert: 30,
      quantity: 13,
      has_serial_number: 1,
      created_by: 2,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T16:39:42.000000Z",
      updated_at: "2024-12-24T16:39:42.000000Z",
      category: {
        id: 2,
        code_category: "TS",
        name_category: "test",
        description: "test",
        status: "active",
        deleted_by: null,
        created_by: 2,
        updated_by: null,
        created_at: "2024-12-24T16:34:03.000000Z",
        updated_at: "2024-12-24T16:34:03.000000Z",
      },
      brand: {
        id: 1,
        code_brand: "BR001",
        name_brand: "Brand Name",
        description: "Brand description",
        created_by: 1,
        updated_by: null,
        deleted_by: null,
        created_at: "2024-12-24T11:18:46.000000Z",
        updated_at: "2024-12-24T11:18:46.000000Z",
      },
      unit: {
        id: 1,
        code_unit: "KG",
        name_unit: "Kilogram",
        description: "Unit of mass",
        created_by: 1,
        updated_by: null,
        deleted_by: null,
        created_at: "2024-12-24T11:27:08.000000Z",
        updated_at: "2024-12-24T11:27:08.000000Z",
      },
      rayonage: {
        id: 2,
        code_location: "test",
        name: "testjhjlhj",
        description: "test",
        created_by: 2,
        updated_by: null,
        deleted_by: null,
        created_at: "2024-12-24T16:34:58.000000Z",
        updated_at: "2024-12-24T16:34:58.000000Z",
      },
    },

    provider: {
      id: 2,
      name: "Provider Two",
      phone: "0987654321",
      email: "provider2@example.com",
      address: "456 Provider Ave",
      created_by: 102,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-02-01T11:00:00Z",
      updated_at: "2023-02-01T11:00:00Z",
      amount_paid: "2000.00",
      code_provider: "PROV002",
      outstanding_balance: "0.00",
      status: "active",
      total_supplies: "1",
    },
    entrepot: {
      id: 2,
      name: "Warehouse Two",
      code_entreport: "WH002",
      description: "Secondary warehouse",
      created_by: 102,
      updated_by: null,
      deleted_by: null,
      created_at: "2023-02-01T11:00:00Z",
      updated_at: "2023-02-01T11:00:00Z",
    },
  },
];

const statsArray_test = data_test_achat.map((item: any) => {
  return {
    magasin: item.entrepot.name,
    quantité: item.produit.quantity,
  };
});

// const columnsVentes: (keyof ITableEntrepotVente)[] = [
//   "référence",
//   "nom_du_client",
//   "magasin",
//   "total",
//   "status",
// ];

// const data_test_ventes = [
//   {
//     id: 1,
//     code: "EV001",
//     client: {
//       id: 1,
//       code_client: "C001",
//       name: "John Doe",
//       email: "john.doe@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St, Anytown, USA",
//       status: "active",
//       total_purchases: "1000.00",
//       outstanding_balance: "200.00",
//       created_by: 201,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-01-01T10:00:00Z",
//       updated_at: "2023-01-01T10:00:00Z",
//     },
//     entrepot: {
//       id: 1,
//       name: "Warehouse A",
//       code_entreport: "WA123",
//       description: "Main warehouse for electronics",
//       created_by: 101,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-01-01T10:00:00Z",
//       updated_at: "2023-01-01T10:00:00Z",
//     },
//     total: 500,
//     status: "completed",
//     référence: "REF001",
//     nom_du_client: "John Doe",
//     magasin: "Warehouse A",
//   },
//   {
//     id: 2,
//     code: "EV002",
//     client: {
//       id: 2,
//       code_client: "C002",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       phone: "987-654-3210",
//       address: "456 Elm St, Othertown, USA",
//       status: "inactive",
//       total_purchases: "500.00",
//       outstanding_balance: "50.00",
//       created_by: 202,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-02-01T11:00:00Z",
//       updated_at: "2023-02-01T11:00:00Z",
//     },
//     entrepot: {
//       id: 2,
//       name: "Warehouse B",
//       code_entreport: "WB456",
//       description: "Secondary warehouse for furniture",
//       created_by: 102,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-02-01T11:00:00Z",
//       updated_at: "2023-02-01T11:00:00Z",
//     },
//     total: 300,
//     status: "pending",
//     référence: "REF002",
//     nom_du_client: "Jane Smith",
//     magasin: "Warehouse B",
//   },
// ];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      date: new Date(item.created_at).toLocaleString(),
      référence: item.invoice_number,
      nom_du_produit: item.produit.name,
      fournisseur: item.provider.name,
      magasin: item.entrepot.name,
      quantité: item.produit.quantity,
      total: item.total_cost,
    };
  });
};

// const createNewArrayVentes = (data: any) => {
//   return data.map((item: any) => {
//     return {
//       ...item,
//       référence: item.code,
//       nom_du_client: item.client.name,
//       magasin: item.entrepot.name,
//     };
//   });
// };
