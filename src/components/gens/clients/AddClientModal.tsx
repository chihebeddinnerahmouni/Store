import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import InputText from "../../ui/inputs/InputText";
import InputNumber from "../../ui/inputs/InputNumber";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import InputEmail from "../../ui/inputs/InputEmail";
import SelectInput from "../../ui/inputs/SelectInput";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddClientModal = ({ open, onClose }: AddCategoryModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");

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
          Ajouter un client
        </Typography>

        <div className="fields flex flex-col gap-5 mt-5">
          {/* nom */}
          <InputText label="Nom du client*" value={name} setValue={setName} />

          {/* email */}
          <InputEmail
            label="Email du client*"
            value={email}
            setValue={setEmail}
          />

          {/* phone */}
          <InputNumber
            label="Téléphone du client*"
            value={phone}
            setValue={setPhone}
          />

          {/* wilaya */}
          <SelectInput
            options={wilayas_array}
            label="Wilaya du client*"
            value={wilaya}
            setValue={setWilaya}
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

export default AddClientModal;

const wilayas_array = [
  { id: 1, name: "Adrar" },
  { id: 2, name: "Chlef" },
  { id: 3, name: "Laghouat" },
  { id: 4, name: "Oum El Bouaghi" },
  { id: 5, name: "Batna" },
  { id: 6, name: "Béjaïa" },
  { id: 7, name: "Biskra" },
  { id: 8, name: "Béchar" },
  { id: 9, name: "Blida" },
  { id: 10, name: "Bouira" },
  { id: 11, name: "Tamanrasset" },
  { id: 12, name: "Tébessa" },
  { id: 13, name: "Tlemcen" },
  { id: 14, name: "Tiaret" },
  { id: 15, name: "Tizi Ouzou" },
  { id: 16, name: "Alger" },
  { id: 17, name: "Djelfa" },
  { id: 18, name: "Jijel" },
  { id: 19, name: "Sétif" },
  { id: 20, name: "Saïda" },
  { id: 21, name: "Skikda" },
  { id: 22, name: "Sidi Bel Abbès" },
  { id: 23, name: "Annaba" },
  { id: 24, name: "Guelma" },
  { id: 25, name: "Constantine" },
  { id: 26, name: "Médéa" },
  { id: 27, name: "Mostaganem" },
  { id: 28, name: "M'Sila" },
  { id: 29, name: "Mascara" },
  { id: 30, name: "Ouargla" },
  { id: 31, name: "Oran" },
  { id: 32, name: "El Bayadh" },
  { id: 33, name: "Illizi" },
  { id: 34, name: "Bordj Bou Arréridj" },
  { id: 35, name: "Boumerdès" },
  { id: 36, name: "El Tarf" },
  { id: 37, name: "Tindouf" },
  { id: 38, name: "Tissemsilt" },
  { id: 39, name: "El Oued" },
  { id: 40, name: "Khenchela" },
  { id: 41, name: "Souk Ahras" },
  { id: 42, name: "Tipaza" },
  { id: 43, name: "Mila" },
  { id: 44, name: "Aïn Defla" },
  { id: 45, name: "Naâma" },
  { id: 46, name: "Aïn Témouchent" },
  { id: 47, name: "Ghardaïa" },
  { id: 48, name: "Relizane" },
  { id: 49, name: "El M'Ghair" },
  { id: 50, name: "El Menia" },
];
