import { Typography } from "@mui/material";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ModalComp from "../../ui/modals/Modal";
import ModalTitle from "../../ui/modals/ModalTitle";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../helper/axios_error";
import IFournisseures from "../../../types/fournisseures";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (id: number) => {
  const { data } = await axios.delete(`${url}/api/providers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

interface IProps {
  onClose: () => void;
  refetch: () => void;
  data: IFournisseures;
}

const DeleteFourniModal = ({
  onClose,
  refetch,
  data,
}: IProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
      refetch();
      onClose();
    },
    onError: handleAxiosError,
  });

  return (
    <ModalComp open={true} onClose={onClose}>
      <ModalTitle text={`Supprimer ${data.name}`} />
      <Typography
        sx={{
          fontFamily: "Nunito",
          mt: 1,
        }}
        variant="body1"
        component="p"
      >
        Voulez-vous vraiment supprimer fournisseur {data!.name} ?
      </Typography>

      <div className="mt-5 flex justify-end">
        <FullShiningButton
          text="Soumettre"
          color="red"
          type="submit"
          loading={isPending}
          onClick={() => mutate(data.id)}
        />
      </div>
    </ModalComp>
  );
};

export default DeleteFourniModal;
