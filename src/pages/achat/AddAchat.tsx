import PageTitle from "../../components/ui/PageTitle";
import AchatStCont from "../../containers/achat/add achat/AchatStCont";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TableCont from "../../containers/achat/add achat/TableCont";
// import AchatNdCont from "../../containers/achat/add achat/AchatNdCont";
import TotalCont from "../../containers/achat/add achat/TotalCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/ui/Loading";




interface IProductCommandeItem {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  // remise: number;
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
  fournisseur: string;
  magasain: string;
  user_invoice_number: string;
};

const AddAchat = () => {
  const [date, setDate] = useState<string>("");
  const [fournisseure, setFournisseure] = useState<number>(0);
  const [magasain, setMagasain] = useState<number>(0);
  const [produit, setProduit] = useState<string>("");
  const [productsCommandeArray, setProductsCommandeArray] = useState<
    IProductCommandeItem[]
  >([]);
  // const [taxe, setTaxe] = useState<string>("");
  // const [remise, setRemise] = useState<string>("");
  // const [laivraison, setLaivraison] = useState<string>("");
  // const [status, setStatus] = useState<string>("");
  // const [remarque, setRemarque] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fournisseuresArray, setFournisseuresArray] = useState<any[]>([]);
  const [magasainsArray, setMagasainsArray] = useState<any[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [user_invoice_number, setUserInvoiceNumber] = useState<string>("");

  const mainColor = "#006233";
  const url = import.meta.env.VITE_BASE_URL;
  // console.log(fournisseuresArray, magasainsArray);


  useEffect(() => {
    Promise.all([
      axios.get(`${url}/api/entreports/authorized/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/providers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then((res) => {
        // console.log(res[0].data.entrepots);
        setFournisseuresArray(res[1].data.providers);
        setMagasainsArray(res[0].data.entrepots);
        setLoadingPage(false);
      })
      .catch((err) => {
        setLoadingPage(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }, []);

  const send = () => {
    setLoading(true);

    const products = productsCommandeArray.map((product) => ({
      product_id: product.id,
      quantity_declared: product.quantite,
      remise: 0,
      livraison_cost: 0,
      tax: product.taxe,
      ...(product.has_serial_number && {
        serial_numbers: product.serial_numbers,
      }),
    }));

    axios
      .post(
        `${url}/api/achats`,
        {
          provider_id: fournisseure,
          entrepot_id: magasain,
          user_invoice_number: user_invoice_number,
          date: date,
          products: products,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          const check = typeof err.response.data.message === "string";
          if (check) {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          } else {
            Object.keys(err.response.data.message).map((key) => {
              err.response.data.message[key].map((err: any) => {
                enqueueSnackbar(err, { variant: "error" });
              });
            });
          }
        }
      });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = send;
    
  if (loadingPage) return <Loading />;
  


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter Entrée" />
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
            fournisseur={fournisseure}
            setFournisseur={setFournisseure}
            magasain={magasain}
            setMagasain={setMagasain}
            fournisseuresArray={fournisseuresArray}
            magasainsArray={magasainsArray}
            user_invoice_number={user_invoice_number}
            setUserInvoiceNumber={setUserInvoiceNumber}
          />
          <TableCont
            produit={produit}
            setProduit={setProduit}
            productsCommandeArray={productsCommandeArray}
            setProductsCommandeArray={setProductsCommandeArray}
          />

          {/* <AchatNdCont
            // taxe={taxe}
            // setTaxe={setTaxe}
            // remise={remise}
            // setRemise={setRemise}
            // laivraison={laivraison}
            // setLaivraison={setLaivraison}
            // status={status}
            // setStatus={setStatus}
            remarque={remarque}
            setRemarque={setRemarque}
          /> */}
          {/* </div> */}
          <TotalCont
            // remise={remise}
            // taxe={taxe}
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