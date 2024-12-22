import {
    Modal,
    Box,
    Typography,
    Avatar,
    Divider,
    Grid,
} from "@mui/material";
import IProduct from "../../../types/Product";
import Barcode from "react-barcode";

interface ViewModalProps {
    onClose: () => void;
    row: IProduct;
}

const ViewModal = ({ onClose, row }: ViewModalProps) => {
    const productDetails = [
        { label: "Type", value: "Single" },
        { label: "Code Produit", value: row.code },
        { label: "Produit", value: row.name },
        { label: "Catégorie", value: row.categorie },
        { label: "Marque", value: row.marque },
        { label: "Coût", value: `${row.cout_unitaire.toFixed(2)} DA` },
        { label: "Prix", value: `${row.prix} DA` },
        { label: "Unité", value: row.unité },
        { label: "Taxe", value: `${row.taxe.toFixed(2)} %` },
        { label: "Méthode fiscale", value: "Exclusive" },
        { label: "Stock Alert", value: row.alert_stock.toFixed(2) },
    ];

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
                <Avatar
                    alt={row.name}
                    src={row.image}
                    sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                    {row.name}
                </Typography>
                <Barcode value={row.code} />
                <Divider sx={{ width: "100%", my: 2 }} />
                <Grid container spacing={2}>
                    {productDetails.map((detail, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="body2" color="textSecondary">
                                <strong>{detail.label}:</strong> {detail.value}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Modal>
    );
};

export default ViewModal;