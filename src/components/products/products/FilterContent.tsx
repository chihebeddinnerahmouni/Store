import { Box } from "@mui/material";
import InputNumber from "../../ui/inputs/InputNumber";
import Label from "../../ui/Label";
import SelectInput from "../../ui/inputs/SelectInput";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../../components/ui/buttons/FullShiningButton";
import LoadingComp from "../../ui/LoadingComp";
import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import InputText from "../../ui/inputs/InputText";
import IProductSingle from "../../../types/IProductSingle";




interface Props {
  close: () => void;
  setData: (value: IProductSingle[]) => void;
  code: string;
  setCode: (value: string) => void;
  categorie: string;
  setCategorie: (value: string) => void;
  marque: string;
  setMarque: (value: string) => void;
  categoriesArray: any;
  marquesArray: any;
  reyonagesArray: any;
  setCategoriesArray: (value: any) => void;
  setMarquesArray: (value: any) => void;
  setReyonagesArray: (value: any) => void;
}

const FilterContent = ({
  close,
  setData,
  code,
  setCode,
  categorie,
  setCategorie,
  marque,
  setMarque,
  categoriesArray,
  marquesArray,
  reyonagesArray,
  setCategoriesArray,
  setMarquesArray,
  setReyonagesArray,
}: Props) => {


  
  
  const [loading, setLoading] = useState(true);
  const [reyonage, setReyonage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {

    if (categoriesArray.length === 0 && marquesArray.length === 0 && reyonagesArray.length === 0) {
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
        axios.get(`${url}/api/rayonages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ])
        .then(
          axios.spread((cat, mar, ray) => {
            const categories = cat.data.categories.map((cat: any) => ({
              id: cat.id,
              name: cat.name_category,
            }));
            const marques = mar.data.brands.map((mar: any) => ({
              id: mar.id,
              name: mar.name_brand,
            }));
            const reyonages = ray.data.rayonages.map((ray: any) => ({
              id: ray.id,
              name: ray.name,
            }));

            setCategoriesArray(categories);
            setMarquesArray(marques);
            setReyonagesArray(reyonages);
            setLoading(false);
          })
        )
        .catch((err) => {
          setLoading(false);
          if (err.message === "Network Error") {
            enqueueSnackbar("Erreur de connexion", { variant: "error" });
          } else {
           enqueueSnackbar(err.response.data.message, { variant: "error" });
          }
        });
    } else {
      setLoading(false);
    }
  }, []);




  const filterFunction = () => {
    setLoadingButton(true);
    const catId = categoriesArray.find((cat: any) => cat.name === categorie)?.id;
    const marId = marquesArray.find((mar: any) => mar.name === marque)?.id;
    const reyId = reyonagesArray.find((rey: any) => rey.name === reyonage)?.id;

    axios.post(`${url}/api/products/filter`, {
      code_barre: code,
      category_id: catId,
      brand_id: marId,
      name: name,
      reyonage_id: reyId,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const Modified = ModifiedData(res.data.products);
        setData(Modified);
        close();
        setLoadingButton(false);
      })
      .catch((err) => {
        setLoadingButton(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      })
  }




  if (loading) {
    return <div className="w-full h-full flex justify-center items-center">
      <LoadingComp />
    </div>
  }
  
  
  const buttons_array = [
    {
      icon: <CiFilter />,
      text: "Filter",
      color: "#3b82f6",
      onClick: filterFunction,
      loading: loadingButton,
    },
    {
      icon: <BsArrowRepeat />,
      text: "Réinitialiser",
      color: "#8b5cf6",
      onClick: () => {
        setCode("");
        setCategorie("");
        setMarque("");
        setName("");
        setReyonage("");
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: 2,
      }}
      role="presentation"
    >
      <p className="font-bold text-[25px]">Filtre</p>
      <div className="content flex flex-col gap-6 mt-5">
        {/* code */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsCode"} text={"Code Produit"} />
          <InputNumber
            value={code}
            setValue={setCode}
            label="Par code produit"
          />
        </div>


        {/* name */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsName"} text={"Nom Produit"} />
          <InputText
            value={name}
            setValue={setName}
            label="Par nom produit"
          />
        </div>

        {/* categoie */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsCategorie"} text={"Category"} />
          <SelectInput
            options={categoriesArray}
            value={categorie}
            setValue={setCategorie}
            label="Par categorie"
          />
        </div>

        {/* brands */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsMarque"} text={"Marque"} />
          <SelectInput
            options={marquesArray}
            value={marque}
            setValue={setMarque}
            label="Par marque"
          />
        </div>



        {/* rayonnage */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsRay"} text={"Rayon"} />
          <SelectInput
            options={reyonagesArray}
            value={reyonage}
            setValue={setReyonage}
            label="Par rayon"
          />
        </div>

        {/* buttons */}
        <div className="buttons flex gap-2">
          {buttons_array.map((button, index) => (
            <FullShiningButton
              key={index}
              text={button.text}
              icon={button.icon}
              color={button.color}
              onClick={button.onClick}
              loading={button.loading}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterContent;
const ModifiedData = (data: IProductSingle[]) => {
  return data.map((product: IProductSingle) => ({
    ...product,
    designation: product.name,
    code: product.code_barre,
    marque: product.brand.name_brand,
    categorie: product.category.name_category,
    cout: product.price_buy,
    prix: product.price_sell,
    unité: product.unit.name_unit,
    quantité: product.quantity,
    rayon: product.rayonage.name,
  }));
};
