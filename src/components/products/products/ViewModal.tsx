import { Modal, Box, Typography, Divider, Grid } from "@mui/material";
import IProductSingle from "../../../types/IProductSingle";
import Barcode from "react-barcode";
import { useEffect } from "react";
import axios from "axios";
// import Loading from "../../ui/Loading";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useRef } from "react";
import { enqueueSnackbar } from "notistack";
import ShiningButton from "../../ui/buttons/ShiningButton";
import { IoPrint } from "react-icons/io5";

interface ViewModalProps {
  onClose: () => void;
  // row: IProduct;
  id: number;
}

const ViewModal = ({ onClose, id }: ViewModalProps) => {
  // console.log(row);

  const [data, setData] = useState<IProductSingle>({} as IProductSingle);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BASE_URL;
  // let productDetails: { label: string; value: string }[] = [];
  const [productDetails, setProductDetails] = useState<
    { label: string; value: string }[]
    >([]);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(`${url}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.product);
        setData(res.data.product);
        setProductDetails([
          { label: "Type", value: "Single" },
          { label: "Code Produit", value: res.data.product.code_barre },
          { label: "Produit", value: res.data.product.name },
          {
            label: "Catégorie",
            value: res.data.product.category.name_category,
          },
          { label: "Marque", value: res.data.product.brand.name_brand },
          { label: "Coût", value: `${res.data.product.price_buy} DA` },
          { label: "Prix", value: `${res.data.product.price_sell} DA` },
          { label: "Unité", value: res.data.product.unit.name_unit },
          { label: "Taxe", value: `${res.data.product.tax_percentage} %` },
          { label: "Méthode fiscale", value: "Exclusive" },
          {
            label: "Stock Alert",
            value: res.data.product.stock_alert.toFixed(2),
          },
        ]);
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


  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); 
    }
  };


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
          maxHeight: "90vh",
          overflowY: "auto",
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
              {data.name}
            </Typography>
            <div className=" mb-2" ref={printRef}>
            <Barcode value={data.code_barre} />
            </div>
              <ShiningButton
                text="Imprimer"
                color="grey"
                onClick={handlePrint}
                icon={<IoPrint />}
              />
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
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ViewModal;

// <Avatar
//               alt={row.name}
//               src={row.image}
//               sx={{ width: 120, height: 120, mb: 2 }}
//             />
//             <Typography variant="h5" gutterBottom>
//               {row.name}
//             </Typography>
//             <Barcode value={row.code} />
//             <Divider sx={{ width: "100%", my: 2 }} />
//             {/* <Grid container spacing={2}>
//                     {productDetails.map((detail, index) => (
//                         <Grid item xs={12} sm={6} key={index}>
//                             <Typography variant="body2" color="textSecondary">
//                                 <strong>{detail.label}:</strong> {detail.value}
//                             </Typography>
//                         </Grid>
//                     ))}
//                 </Grid>
