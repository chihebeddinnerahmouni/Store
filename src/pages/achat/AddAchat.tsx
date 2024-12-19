import PageTitle from "../../components/ui/PageTitle";
import AchatStCont from "../../containers/achat/add achat/AchatStCont";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import ImageCont from "../../containers/products/add product/ImageCont";
// import ProductsNd from "../../containers/products/add product/ProductsNd";
import { Button } from "@mui/material";
// import InstructionsCont from "../../containers/products/add product/InstructionsCont";
import TableCont from "../../containers/achat/add achat/TableCont";
// import IProduct from "../../types/Product";

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
    // const [productsArray, setProductsArray] = useState<IProduct[]>(products_test);
    const [productsCommandeArray, setProductsCommandeArray] = useState<IProductCommandeItem[]>([]);

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
      <PageTitle text="Ajouter d'achat" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <AchatStCont
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
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            produit={produit}
            setProduit={setProduit}
            productsCommandeArray={productsCommandeArray}
            setProductsCommandeArray={setProductsCommandeArray}
          />

          {/* <ImageCont />

          <ProductsNd
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            type={type}
            setType={setType}
            prixAchat={prixAchat}
            setPrixAchat={setPrixAchat}
            prixVente={prixVente}
            setPrixVente={setPrixVente}
            unite={unite}
            setUnite={setUnite}
            uniteVente={uniteVente}
            setUniteVente={setUniteVente}
            uniteAchat={uniteAchat}
            setUniteAchat={setUniteAchat}
            stockAlert={stockAlert}
            setStockAlert={setStockAlert}
            numSerie={numSerie}
            setNumSerie={setNumSerie}
          />
          <div className="lg:col-span-3 lg:hidden">
            <InstructionsCont />
          </div> */}
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


export default AddAchat;

