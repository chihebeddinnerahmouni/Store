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
  const [selected, setSelected] = useState<string>("Achats");
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

            {/* {selected === "Achats" ? ( */}
            <ButtonsContAchat columns={columnsAchats} data={dataAchats} />
            {/* ) : (
               <ButtonsContVentes columns={columnsVentes} data={dataVentes} />
             )} */}
            {/* <QuatiteTable data={statsArray} /> */}
            <SwitchButtons
              options={["Achats", "Ventes"]}
              setSelected={setSelected}
              selected={selected}
            />
            {/* {selected === "Achats" ? ( */}
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
  "référence",
  "référence de l'utilisateur",
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


// const columnsVentes: (keyof ITableEntrepotVente)[] = [
//   "référence",
//   "nom_du_client",
//   "magasin",
//   "total",
//   "status",
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
