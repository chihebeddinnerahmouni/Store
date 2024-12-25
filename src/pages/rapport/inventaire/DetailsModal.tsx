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
// import QuatiteTable from "../../../containers/raports/inventaire/details/QuatiteTable";
import { useParams } from "react-router-dom";


interface ViewModalProps {
  onClose: () => void;
  // id: number;
}

const DetailsModal = ({ onClose }: ViewModalProps) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>({});
  const [dataAchats, setDataAchats] = useState<IInvDetails_achats[]>([]);
  //   const [dataVentes, setDataVentes] = useState<IEntVente[]>([]);
  // const [statsArray, setStatsArray] = useState<
  //   { magasin: string; quantité: number }[]
  // >([]);
  const url = import.meta.env.VITE_BASE_URL as string;
  // const [selected, setSelected] = useState<"achats" | "ventes">("achats");
  const [selected, setSelected] = useState<string>("achats");
  const { produitId } = useParams();
  const id = Number(produitId);

  // console.log(magasinsArray);
  // console.log(id);

  useEffect(() => {
    axios
      .get(url + "/api/reports/product/" + id + "/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const newArrayAchats = createNewArrayAchats(res.data.achats);
        // const newArrayVentes = createNewArrayVentes(data_test_ventes);
        // setDataVentes(newArrayVentes);
        setProduct(res.data.product);
        // setStatsArray(statsArray_test);
        setDataAchats(newArrayAchats);
        setLoading(false);
      })
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
          maxWidth: "1500px",
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
            <p className="text-center font-bold text-xl mb-5">{product.name}</p>

            {/* {selected === "achats" ? ( */}
            <ButtonsContAchat columns={columnsAchats} data={dataAchats} />
            {/* ) : (
               <ButtonsContVentes columns={columnsVentes} data={dataVentes} />
             )} */}
            {/* <QuatiteTable data={statsArray} /> */}
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
  "référence de l'utilisateur",
  "référence",
  "fournisseur",
  "magasin",
  "quantité",
  "total",
];
const createNewArrayAchats = (data: any) => {
  return data.map((item: any, index:number) => {
    return {
      ...item,
      id: index,
      "référence de l'utilisateur": item.user_invoice_number,
      référence: item.invoice_number,
      fournisseur: item.provider_name,
      magasin: item.entrepot_name,
      quantité: item.quantity_declared,
      // total: item.total,
    };
  });
};

// const data_test_achat = [
//   {
//     user_invoice_number: "INV02",
//     invoice_number: "INV002",
//     provider_name: "Supplier Inc.",
//     entrepot_name: "Main Warehouse",
//     quantity_declared: 250,
//     total: "25000.00",
//   },
// ];

// const statsArray_test = data_test_achat.map((item: any) => {
//   return {
//     magasin: item.entrepot.name,
//     quantité: item.produit.quantity,
//   };
// });

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
