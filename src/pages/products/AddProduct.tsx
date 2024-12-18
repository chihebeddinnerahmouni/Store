import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageCont from "../../containers/products/add product/ImageCont";
import ProductsNd from "../../containers/products/add product/ProductsNd";
import { Button } from "@mui/material";

type FormValues = {
  designation: string;
  codeBarre: string;
  category: string;
  marque: string;
  tax: string;
  description: string;
  type: string;
  // image: string;
  prixAchat: string;
  prixVente: string;
  unite: string;
  uniteVente: string;
  uniteAchat: string;
  stockAlert: string;
};

const AddProduct = () => {
  const [designation, setDesignation] = useState<string>("");
  const [codeBarre, setCodeBarre] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [marque, setMarque] = useState<string>("");
  const [tax, setTax] = useState<string>("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("");
  // const [image, setImage] = useState<string>("");
  const [prixAchat, setPrixAchat] = useState<string>("");
  const [prixVente, setPrixVente] = useState<string>("");
  const [unite, setUnite] = useState<string>("");
  const [uniteVente, setUniteVente] = useState<string>("");
  const [uniteAchat, setUniteAchat] = useState<string>("");
  const [stockAlert, setStockAlert] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const mainColor = "#006233";
  const mainColorHover = "#004d26";

  const send = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
   }

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = send;



  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter un produit" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* <div className="top"> */}
            <ProductStCont
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
            />
            <ImageCont />
          {/* </div> */}

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
          />
        </div>
        {/* <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          // loading={loading}
          sx={{
          backgroundColor: mainColor,
          color: "#fff",
          margin: "20px 0",
          "&:hover": {
            backgroundColor: mainColorHover,
          },
        }}>
          {/* Soumettre */}
          {loading ? "En cours..." : "Soumettre"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;


