import PageTitle from "../../components/ui/PageTitle";
import VenteStCont from "../../containers/vente/add vente/VenteStCont";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@mui/material";
import TableCont from "../../containers/vente/add vente/TableCont";
import VenteNdCont from "../../containers/vente/add vente/VenteNdCont";
import TotalCont from "../../containers/achat/add achat/TotalCont";

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

const AddVente = () => {
  const [date, setDate] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [magasain, setMagasain] = useState<string>("");
  const [produit, setProduit] = useState<string>("");
  const [productsCommandeArray, setProductsCommandeArray] = useState<
    IProductCommandeItem[]
  >([]);
  const [taxe, setTaxe] = useState<string>("");
  const [remise, setRemise] = useState<string>("");
  const [laivraison, setLaivraison] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [remarque, setRemarque] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const mainColor = "#006233";
  const mainColorHover = "#004d26";

  const send = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = send;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter vente" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 ">
          {/* <div className="top-left flex flex-col gap-6 xl:flex-grow"> */}
            <VenteStCont
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

            <VenteNdCont
              taxe={taxe}
              setTaxe={setTaxe}
              remise={remise}
              setRemise={setRemise}
              laivraison={laivraison}
              setLaivraison={setLaivraison}
              status={status}
              setStatus={setStatus}
              remarque={remarque}
              setRemarque={setRemarque} 
            />
          {/* </div> */}
          <TotalCont
            remise={remise}
            taxe={taxe}
            laivraison={laivraison}
            productsCommandeArray={productsCommandeArray}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: mainColor,
            color: "#fff",
            margin: "20px 0",
            "&:hover": {
              backgroundColor: mainColorHover,
            },
          }}
        >
          {loading ? "En cours..." : "Soumettre"}
        </Button>
      </form>
    </div>
  );
};

export default AddVente;
