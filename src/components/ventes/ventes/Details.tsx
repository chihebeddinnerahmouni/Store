import { Modal, Box, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import IVente from "../../../types/vente";

// not used

interface ViewModalProps {
  onClose: () => void;
  row: IVente;
}

const Details = ({ onClose, row }: ViewModalProps) => {
//   console.log(row);

  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<
    { label: string; value: string }[]
        >([]);
        
     useEffect(() => {
       setProductDetails([
         { label: "Créé par", value: row.created_by.toString() },
         { label: "Date", value: row.date },
         {
           label: "Supprimé par",
           value: row.deleted_by ? row.deleted_by.toString() : "N/A",
         },
         { label: "ID Entrepôt", value: row.entrepot_id.toString() },
         { label: "Client", value: row.nom_du_client },
         { label: "ID", value: row.id.toString() },
         { label: "Numéro de facture", value: row.invoice_number },
         { label: "Coût de livraison", value: row.livraison_cost },
         { label: "Magasin", value: row.magasin },
         { label: "Référence", value: row.référence },
         { label: "Remarques", value: row.remarks ? row.remarks : "N/A" },
         {
           label: "Mis à jour par",
           value: row.updated_by ? row.updated_by.toString() : "N/A",
         },
         {
           label: "Numéro de facture utilisateur",
           value: row.user_invoice_number,
         },
       ]);
       setLoading(false);
     }, [row]);

 

  return (
    <Modal
      open={true}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "60%", lg: "40%" },
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
          <>
            <Grid container spacing={2}>
              {productDetails.map((detail, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>{detail.label}:</strong> {detail.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default Details;
