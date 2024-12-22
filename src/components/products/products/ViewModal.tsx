import {
    Modal,
    // Box,
    // Typography
} from "@mui/material";
// import { Controller, useForm, SubmitHandler } from "react-hook-form";
// import InputText from "../../ui/inputs/InputText";
// import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import { enqueueSnackbar } from "notistack";
// import axios from "axios";
// import { useState } from "react";
// import InputMultiLine from "../../ui/inputs/InputMultiLine";
import IProduct from "../../../types/Product";


interface ViewModalProps {
  onClose: () => void;
  row: IProduct;
}

const ViewModal = ({onClose, row}: ViewModalProps) => {
//   const mainColor = "#006233";
  
 

  return (
    <Modal
      open={true}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <div>
        <h2>Modal Title</h2>
        <p>Modal content...</p>
      </div>
    </Modal>
  );
};


export default ViewModal;
