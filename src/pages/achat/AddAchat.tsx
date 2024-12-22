import PageTitle from "../../components/ui/PageTitle";
import AchatStCont from "../../containers/achat/add achat/AchatStCont";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TableCont from "../../containers/achat/add achat/TableCont";
import AchatNdCont from "../../containers/achat/add achat/AchatNdCont";
import TotalCont from "../../containers/achat/add achat/TotalCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";





interface IProductCommandeItem {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  remise: number;
  taxe: number;
  quantite: number;
  grand_total: number;
  alert_stock: number;
  unité: string;
  has_serial_number: boolean;
  serial_numbers: string[];
}

type FormValues = {
  date: string;
  client: string;
  magasain: string;
};

const AddAchat = () => {
  const [date, setDate] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [magasain, setMagasain] = useState<string>("");
  const [produit, setProduit] = useState<string>("");
  const [productsCommandeArray, setProductsCommandeArray] = useState<
    IProductCommandeItem[]
  >([]);
  const [taxe, setTaxe] = useState<string>("");
  // const [remise, setRemise] = useState<string>("");
  // const [laivraison, setLaivraison] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [remarque, setRemarque] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const mainColor = "#006233";
  const url = import.meta.env.VITE_BASE_URL;

  const send = () => {
    setLoading(true);
    axios
      .post(
        `${url}/api/achats`,
        {
          provider_id: 1,
          entrepot_id: 1,
          user_invoice_number: "INV029",
          date: "2024-12-20",
          livraison_cost: 100.5,
          products: [
            {
              product_id: 6,
              quantity_declared: 15,
              remise: 5,
              tax: 18,
              serial_numbers: ["SN0015"],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });




    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = send;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter d'achat" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {/* <div className="top-left flex flex-col gap-6 xl:flex-grow"> */}
          <AchatStCont
            control={control}
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            date={date}
            setDate={setDate}
            client={client}
            setClient={setClient}
            magasain={magasain}
            setMagasain={setMagasain}
          />
          <TableCont
            produit={produit}
            setProduit={setProduit}
            productsCommandeArray={productsCommandeArray}
            setProductsCommandeArray={setProductsCommandeArray}
          />

          <AchatNdCont
            taxe={taxe}
            setTaxe={setTaxe}
            // remise={remise}
            // setRemise={setRemise}
            // laivraison={laivraison}
            // setLaivraison={setLaivraison}
            status={status}
            setStatus={setStatus}
            remarque={remarque}
            setRemarque={setRemarque}
          />
          {/* </div> */}
          <TotalCont
            // remise={remise}
            taxe={taxe}
            // laivraison={laivraison}
            productsCommandeArray={productsCommandeArray}
          />
        </div>
        <div className="button mt-5">
        <FullShiningButton
          type="submit"
          loading={loading}
          text="Soumettre"
          color={mainColor}
          // onClick={send}
          onClick={handleSubmit(send)}
        />
        </div>
      </form>
    </div>
  );
};

export default AddAchat;
