import { Typography, Divider, Grid } from "@mui/material";
import { useEffect } from "react";
// import Loading from "../../ui/Loading";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import ModalComp from "../../ui/modals/Modal";

interface ViewModalProps {
  onClose: () => void;
  row: any;
}

const ViewModal = ({ onClose, row }: ViewModalProps) => {
  const [data, setData] = useState<
    { label: string; value: string }[]
    >([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    ]
    setData(table);
    setLoading(false);
  }, []);

      
    
  return (
    <ModalComp open={true} onClose={onClose}>
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
    </ModalComp>
  );
};

export default ViewModal;
