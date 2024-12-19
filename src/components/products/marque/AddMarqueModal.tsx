import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import InputText from "../../ui/inputs/InputText";
import InputNumber from "../../ui/inputs/InputNumber";
import FullShiningButton from "../../ui/buttons/FullShiningButton";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMarqueModal = ({ open, onClose }: AddCategoryModalProps) => {
  const [marqueName, setmarqueName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const mainColor = "#006233";

  const handleSave = () => {};

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
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
          width: { xs: "90%", md: "40%", lg: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Nunito",
          }}
          variant="h6"
          component="h2"
        >
          Ajouter une marque
        </Typography>

        {/* texts */}
        <div className="flex flex-col gap-5 mt-5">
          <InputText
            label="Nom de la marque"
            value={marqueName}
            setValue={setmarqueName}
          />
          <InputNumber
            label="Code de la marque"
            value={categoryCode}
            setValue={setCategoryCode}
          />
        </div>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <FullShiningButton
            text="Soumettre"
            color={mainColor}
            onClick={handleSave}
          />
        </Box>
      </Box>
    </Modal>
  );
};


export default AddMarqueModal;
