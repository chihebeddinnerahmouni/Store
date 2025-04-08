import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import ImageCont from "../../containers/products/add product/ImageCont";
import ProductsNd from "../../containers/products/add product/ProductsNd";
import InstructionsCont from "../../containers/products/add product/InstructionsCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/ui/Loading";

type FormValues = {
  designation: string;
  codeBarre: string;
  category: string;
  marque: string;
  tax: string;
  description: string;
  prixAchat: string;
  prixVente: string;
  unite: string;
  uniteVente: string;
  uniteAchat: string;
  stockAlert: string;
  reyonage: string;
};

const AddProduct = () => {
  const [designation, setDesignation] = useState<string>("");
  const [codeBarre, setCodeBarre] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [marque, setMarque] = useState<number>(0);
  const [tax, setTax] = useState<string>("");
  const [description, setDescription] = useState("");
  const [prixAchat, setPrixAchat] = useState<string>("");
  const [prixVente, setPrixVente] = useState<string>("");
  const [unite, setUnite] = useState<number>(0);
  const [stockAlert, setStockAlert] = useState<string>("");
  const [numSerie, setNumSerie] = useState<boolean>(false);
  const [reyonage, setReyonage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [LoadingPage, setLoadingPage] = useState<boolean>(true);
  const [categoriesArray, setCategoriesArray] = useState<any>([]);
  const [marquesArray, setMarquesArray] = useState<any>([]);
  const [unitesArray, setUnitesArray] = useState<any>([]);
  const [reyonagesArray, setReyonagesArray] = useState<any>([]);
  
  const mainColor = "#006233";
  const url = import.meta.env.VITE_BASE_URL;

  // console.log(category);

  useEffect(() => { 
     Promise.all([
       axios.get(`${url}/api/categories`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }),
       axios.get(`${url}/api/brands`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }),
       axios.get(`${url}/api/units`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }),
       axios.get(`${url}/api/rayonages`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }),
     ])
       .then(
         axios.spread((response1, response2, response3, response4) => {
           setCategoriesArray(response1.data.categories);
           setMarquesArray(response2.data.brands);
           setUnitesArray(response3.data.units);
           setReyonagesArray(response4.data.rayonages);
           setLoadingPage(false);
         })
       )
       .catch((err) => {
        //  console.log(err);
         setLoadingPage(false);
         if (err.message === "Network Error") {
           enqueueSnackbar("Erreur de connexion", { variant: "error" });
         } else {
           Object.keys(err.response.data.erreurs).map((key) => {
             err.response.data.erreurs[key].map((err: any) => {
               enqueueSnackbar(err, { variant: "error" });
             });
           });
         }
       });
  }, []);

  const send = () => {
    setLoading(true);
    axios
      .post(
        `${url}/api/products`,
        {
          name: designation,
          code_barre: codeBarre,
          category_id: category,
          brand_id: marque,
          unit_id: unite,
          rayonage_id: reyonage,
          has_serial_number: numSerie,
          tax_percentage: Number(tax),
          description: description,
          price_buy: Number(prixAchat),
          price_sell: Number(prixVente),
          stock_alert: Number(stockAlert),
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          Object.keys(err.response.data.erreurs).map((key) => {
            err.response.data.erreurs[key].map((err: any) => {
              enqueueSnackbar(err, { variant: "error" });
            });
          });
        }
      })
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = send;


  if (LoadingPage) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter un produit" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <ProductStCont
            control={control}
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            designation={designation}
            setDesignation={setDesignation}
            codeBarre={codeBarre}
            setCodeBarre={setCodeBarre}
            category={category}
            setCategory={setCategory}
            marque={marque}
            setMarque={setMarque}
            tax={tax}
            setTax={setTax}
            description={description}
            setDescription={setDescription}
            reyonage={reyonage}
            setReyonage={setReyonage}
            categoriesArray={categoriesArray}
            marquesArray={marquesArray}
            // unitesArray={unitesArray}
            // setUnitesArray={setUnitesArray}
            reyonagesArray={reyonagesArray}
          />

          {/* <ImageCont /> */}

          <ProductsNd
            control={control}
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            prixAchat={prixAchat}
            setPrixAchat={setPrixAchat}
            prixVente={prixVente}
            setPrixVente={setPrixVente}
            unite={unite}
            setUnite={setUnite}
            stockAlert={stockAlert}
            setStockAlert={setStockAlert}
            numSerie={numSerie}
            setNumSerie={setNumSerie}
            unitesArray={unitesArray}
          />
          <div className="lg:col-span-12 lghidden">
            <InstructionsCont />
          </div>
        </div>
        <div className="button mt-5">
          <FullShiningButton
            text="Soumettre"
            loading={loading}
            color={mainColor}
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
