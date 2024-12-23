import { Modal, Box, Typography, Divider, Grid } from "@mui/material";
import { useEffect } from "react";
// import Loading from "../../ui/Loading";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

interface ViewModalProps {
  onClose: () => void;
  row: any;
}

const ViewModal = ({ onClose, row }: ViewModalProps) => {
  // console.log(row);
  const [data, setData] = useState<
    { label: string; value: string }[]
    >([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(row);

  useEffect(() => {
  const table = [
    { label: "Adresse", value: row.address },
    { label: "Montant payé", value: row.amount_paid },
    { label: "Code Fournisseur", value: row.code_provider },
    { label: "Créé le", value: row.created_at },
    { label: "Créé par", value: row.created_by },
    { label: "Supprimé par", value: row.deleted_by },
    { label: "Email", value: row.email },
    { label: "ID", value: row.id },
    { label: "Nom", value: row.nom },
    { label: "Statut", value: row.status },
    { label: "Dette totale", value: row.total_dette },
    { label: "Total des fournitures", value: row.total_supplies },
    { label: "Téléphone", value: row.téléphone },
    // { label: "Mis à jour le", value: row.updated_at },
    // { label: "Mis à jour par", value: row.updated_by },
    ]
    setData(table);
    setLoading(false);
  }, []);

  
  // if (loading) return <CircularProgress />;
    
    
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
            <Typography variant="h5" gutterBottom>
              {row.nom}
            </Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
            <Grid container spacing={2}>
              {data.map((detail, index) => (
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

export default ViewModal;


// [
//   { label: "Type", value: "Single" },
//   { label: "Code Produit", value: res.data.product.code_barre },
//   { label: "Produit", value: res.data.product.name },
//   {
//     label: "Catégorie",
//     value: res.data.product.category.name_category,
//   },
//   { label: "Marque", value: res.data.product.brand.name_brand },
//   { label: "Coût", value: `${res.data.product.price_buy} DA` },
//   { label: "Prix", value: `${res.data.product.price_sell} DA` },
//   { label: "Unité", value: res.data.product.unit.name_unit },
//   { label: "Taxe", value: `${res.data.product.tax_percentage} %` },
//   { label: "Méthode fiscale", value: "Exclusive" },
//   {
//     label: "Stock Alert",
//     value: res.data.product.stock_alert.toFixed(2),
//   },
// ];