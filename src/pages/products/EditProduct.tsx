import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageCont from "../../containers/products/add product/ImageCont";
import ProductsNd from "../../containers/products/add product/ProductsNd";
import InstructionsCont from "../../containers/products/add product/InstructionsCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/ui/Loading";
import IProductSingle from "../../types/IProductSingle";
import { useParams } from "react-router-dom";

type FormValues = {
  name: string;
  code: string;
  category: string;
  marque: string;
  tax: string;
  description: string;
  // type: string;
  // image: string;
  prixAchat: string;
  prixVente: string;
  unite: string;
  uniteVente: string;
  uniteAchat: string;
  stockAlert: string;
  reyonage: string;
  // quantity: string;
};

const EditProduct = () => {

  const [data, setData] = useState<IProductSingle>();
  const [designation, setDesignation] = useState<string>("");
  const [codeBarre, setCodeBarre] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [marque, setMarque] = useState<number>(0);
  const [tax, setTax] = useState<string>("");
  const [description, setDescription] = useState("");
  // const [type, setType] = useState<string>("");
  // const [image, setImage] = useState<string>("");
  const [prixAchat, setPrixAchat] = useState<string>("");
  const [prixVente, setPrixVente] = useState<string>("");
  const [unite, setUnite] = useState<number>(0);
  // const [uniteVente, setUniteVente] = useState<string>("");
  // const [uniteAchat, setUniteAchat] = useState<string>("");
  const [stockAlert, setStockAlert] = useState<string>("");
  const [numSerie, setNumSerie] = useState<boolean>(false);
  const [reyonage, setReyonage] = useState<number>(0);
  // const [quantity, setQuantity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [LoadingPage, setLoadingPage] = useState<boolean>(true);

  const [categoriesArray, setCategoriesArray] = useState<any>([]);
  const [marquesArray, setMarquesArray] = useState<any>([]);
  const [unitesArray, setUnitesArray] = useState<any>([]);
  const [reyonagesArray, setReyonagesArray] = useState<any>([]);

  const mainColor = "#006233";
  const url = import.meta.env.VITE_BASE_URL;
  const { produitId } = useParams<{ produitId: string }>();


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
      axios.get(`${url}/api/products/${produitId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then(
        axios.spread((cat, mar, units, ray, prod) => {

          // console.log(prod.data.product.rayonage.id);

          setCategoriesArray(cat.data.categories);
          setMarquesArray(mar.data.brands);
          setUnitesArray(units.data.units);
          setReyonagesArray(ray.data.rayonages);
          setData(prod.data.product);
          setDesignation(prod.data.product.name);
          setCodeBarre(prod.data.product.code_barre);
          setCategory(prod.data.product.category.id);
          setMarque(prod.data.product.brand.id);
          setTax(prod.data.product.tax_percentage);
          setDescription(prod.data.product.description);
          setPrixAchat(prod.data.product.price_buy);
          setPrixVente(prod.data.product.price_sell);
          setUnite(prod.data.product.unit.id);
          setStockAlert(prod.data.product.stock_alert.toString());
          setReyonage(prod.data.product.rayonage.id);

          setLoadingPage(false);
        })
      )
      .catch((err) => {
        // console.log(err);
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

    // console.log("response1", response1);
    // console.log("response2", response2);
    // console.log("response3", response3);
    // console.log("response4", response4);
  }, []);

  const send = () => {
    setLoading(true);
    axios
      .put(
        `${url}/api/products/${data!.id}`,
        {
          name: designation,
          code_barre: codeBarre,
          category_id: category,
          brand_id: marque,
          unit_id: unite,
          reyonage_id: reyonage,

          tax_percentage: Number(tax),
          description: description,
          price_buy: Number(prixAchat),
          price_sell: Number(prixVente),
          stock_alert: Number(stockAlert),
          quantity: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        
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
      });

    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      code: "",
      category: "",
      marque: "",
      tax: "",
      description: "",
      // type: "",
      // image: "",
      prixAchat: "",
      prixVente: "",
      unite: "",
      // uniteVente: "",
      // uniteAchat: "",
      stockAlert: "",
      reyonage: "",
    }
  });

   useEffect(() => {
     if (data) {
       setValue("name", data.name);  
       setValue("code", data.code_barre);
       setValue("category", (data.category.id).toString());
       setValue("marque", (data.brand.id).toString());
       setValue("tax", data.tax_percentage);
       setValue("description", data.description);
       setValue("prixAchat", data.price_buy);
       setValue("prixVente", data.price_sell);
       setValue("unite", (data.unit.id).toString());
       setValue("stockAlert", (data.stock_alert).toString());
       // setValue("numSerie", data.has_serial_number);
       setValue("reyonage", (data.rayonage.id).toString());
     }
   }, [data, setValue]);


  const onSubmit: SubmitHandler<FormValues> = send;
  //  const onSubmit: SubmitHandler<FormValues> = (data) => {
  //   //  console.log(data);
  //    send;
  //  };


  if (LoadingPage) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Modifier produit" />
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

          <ImageCont />

          <ProductsNd
            control={control}
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            // type={type}
            // setType={setType}
            // quantity={quantity}
            // setQuantity={setQuantity}
            prixAchat={prixAchat}
            setPrixAchat={setPrixAchat}
            prixVente={prixVente}
            setPrixVente={setPrixVente}
            unite={unite}
            setUnite={setUnite}
            // uniteVente={uniteVente}
            // setUniteVente={setUniteVente}
            // uniteAchat={uniteAchat}
            // setUniteAchat={setUniteAchat}
            stockAlert={stockAlert}
            setStockAlert={setStockAlert}
            numSerie={numSerie}
            setNumSerie={setNumSerie}
            unitesArray={unitesArray}
          />
          <div className="lg:col-span-3 lg:hidden">
            <InstructionsCont />
          </div>
        </div>
        <div className="button mt-5">
          <FullShiningButton
            text="Soumettre"
            loading={loading}
            color={mainColor}
            onClick={handleSubmit(onSubmit)}
            // onClick={send}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};


export default EditProduct;

