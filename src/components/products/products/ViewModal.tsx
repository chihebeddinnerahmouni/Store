import { Typography, Divider, Grid } from "@mui/material";
import IProductSingle from "../../../types/IProductSingle";
import Barcode from "react-barcode";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef } from "react";
import ShiningButton from "../../ui/buttons/ShiningButton";
import { IoPrint } from "react-icons/io5";
import ModalComp from "../../ui/modals/Modal";
import { useQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL;
const fetshData = async (id: number) => {
  const response = await axios.get<{ product: IProductSingle }>(
    `${url}/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  
  return response.data.product;
};

interface ViewModalProps {
  onClose: () => void;
  id: number;
}

const ViewModal = ({ onClose, id }: ViewModalProps) => {

  const printRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetshData(id),
  })

  useEffect(() => {
    if (isSuccess && !data) onClose();
  }, [isSuccess, data]);

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
    <ModalComp onClose={onClose} open={true}>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            {data?.name}
          </Typography>
          <div className="mb-2" ref={printRef}>
            <Barcode value={data?.code_barre || ""} />
          </div>
          <ShiningButton
            text="Imprimer"
            color="grey"
            onClick={handlePrint}
            icon={<IoPrint />}
          />
          <Divider sx={{ width: "100%", my: 2 }} />
          <Grid container spacing={2}>
            {modifiedData(data!).map((detail, index) => (
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


const modifiedData = (data: IProductSingle) => {
  const productDetails = [
    {
      label: "Type",
      value: "Single",
    },
    { label: "Code Produit", value: data.code_barre },
    { label: "Produit", value: data.name },
    {
      label: "Catégorie",
      value: data.category.name_category,
    },
    { label: "Marque", value: data.brand.name_brand },
    { label: "Coût", value: `${data.price_buy} DA` },
    { label: "Prix", value: `${data.price_sell} DA` },
    { label: "Unité", value: data.unit.name_unit },
    { label: "Taxe", value: `${data.tax_percentage} %` },
    { label: "Méthode fiscale", value: "Exclusive" },
    {
      label: "Stock Alert",
      value: data.stock_alert.toFixed(2),
    },
  ];
  return productDetails;
}