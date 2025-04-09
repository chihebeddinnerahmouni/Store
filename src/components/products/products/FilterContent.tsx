import { Box } from "@mui/material";
import InputNumber from "../../ui/inputs/InputNumber";
import Label from "../../ui/Label";
import SelectInput from "../../ui/inputs/SelectInput";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../../components/ui/buttons/FullShiningButton";
import LoadingComp from "../../ui/LoadingComp";
import { useState } from "react";
import axios from "axios";
import InputText from "../../ui/inputs/InputText";
import { useQueries } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";


const url = import.meta.env.VITE_BASE_URL;
const fetchHelper = (endpoint: string) => { 
  return axios.get(`${url}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}


const fetchData = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => fetchHelper("api/categories"),
      },
      {
        queryKey: ["brands"],
        queryFn: () => fetchHelper("api/brands"),
      },
      {
        queryKey: ["rayonages"],
        queryFn: () => fetchHelper("api/rayonages"),
      },
    ],
  });
  const categories =
    (queries[0].data as any)?.data?.categories?.map((cat: any) => ({
      id: cat.id,
      name: cat.name_category,
    })) || [];
   const marques =
     (queries[1].data as any)?.data?.brands?.map((mar: any) => ({
       id: mar.id,
       name: mar.name_brand,
     })) || [];

   const reyonages =
     (queries[2].data as any)?.data?.rayonages?.map((ray: any) => ({
       id: ray.id,
       name: ray.name,
     })) || [];
  
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries.find((query) => query.isError)?.error;
  return {categories, marques, reyonages, isLoading, isError, error };
}


interface Props {
  close: () => void;
}

const FilterContent = ({
  close,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [code, setCode] = useState<string>(searchParams.get("code_barre") || "");
  const [name, setName] = useState<string>(searchParams.get("name") || "");  
  const [reyonage, setReyonage] = useState<number>(searchParams.get("reyonage_id") ? parseInt(searchParams.get("reyonage_id") || "") : 0);
  const [categorie, setCategorie] = useState<number>(searchParams.get("category_id") ? parseInt(searchParams.get("category_id") || "") : 0);
  const [marque, setMarque] = useState<number>(searchParams.get("brand_id") ? parseInt(searchParams.get("brand_id") || "") : 0);


  const {isLoading, categories, marques, reyonages} = fetchData();


  const filterFunction = () => {
    const params = new URLSearchParams();
    if (code) params.append("code_barre", code);
    if (name) params.append("name", name);
    if (categorie) params.append("category_id", categorie.toString());
    if (marque) params.append("brand_id", marque.toString());
    if (reyonage) params.append("reyonage_id", reyonage.toString());
    navigate({ search: params.toString() });
    close();
  }

const buttons_array = useMemo(
  () => [
    {
      icon: <CiFilter />,
      text: "Filter",
      color: "#3b82f6",
      onClick: filterFunction,
    },
    {
      icon: <BsArrowRepeat />,
      text: "Réinitialiser",
      color: "#8b5cf6",
      onClick: () => {
        navigate("/produits");
        close();
      },
    },
  ],
  [code, name, reyonage, categorie, marque, close, navigate] 
);


  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">
      <LoadingComp />
    </div>
  }
  
  

  return (
    <Box
      sx={{
        padding: 2,
      }}
      role="presentation"
    >
      <p className="font-bold text-[25px]">Filtre</p>
      <div className="content flex flex-col gap-6 mt-5">
        
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsCode"} text={"Code Produit"} />
          <InputNumber
            value={code}
            setValue={setCode}
            label="Par code produit"
          />
        </div>


        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsName"} text={"Nom Produit"} />
          <InputText
            value={name}
            setValue={setName}
            label="Par nom produit"
          />
        </div>

        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsCategorie"} text={"Category"} />
          <SelectInput
            options={categories}
            value={categorie}
            setValue={(value) => setCategorie(categories.find((cat: any) => cat.name === value)?.id)}
            label="Par categorie"
          />
        </div>

        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsMarque"} text={"Marque"} />
          <SelectInput
            options={marques}
            value={marque}
            setValue={(value) => setMarque(marques.find((mar: any) => mar.name === value)?.id)}
            label="Par marque"
          />
        </div>



        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsRay"} text={"Rayon"} />
          <SelectInput
            options={reyonages}
            value={reyonage}
            setValue={(value) => setReyonage(reyonages.find((rey: any) => rey.name === value)?.id)}
            label="Par rayon"
          />
        </div>

        <div className="buttons flex gap-2">
          {buttons_array.map((button, index) => (
            <FullShiningButton
              key={index}
              text={button.text}
              icon={button.icon}
              color={button.color}
              onClick={button.onClick}
              // loading={button.loading}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterContent;
