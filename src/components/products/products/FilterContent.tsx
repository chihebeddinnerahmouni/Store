import { Box } from "@mui/material";
import InputNumber from "../../ui/inputs/InputNumber";
import Label from "../Label";
// import { useState } from "react";
import SelectInput from "../../ui/inputs/SelectInput";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import ShiningButton from "../../ui/buttons/ShiningButton";

interface Props {
  close: () => void;
  code: string;
  setCode: (value: string) => void;
  categorie: string;
  setCategorie: (value: string) => void;
  marque: string;
  setMarque: (value: string) => void;
}

const FilterContent = ({
  close,
  code,
  setCode,
  categorie,
  setCategorie,
  marque,
  setMarque,
}: Props) => {

  const buttons_array = [
    {
      icon: <CiFilter />,
      text: "Filter",
      color: "#3b82f6",
      onClick: () => {
        close();
      },
    },
    {
      icon: <BsArrowRepeat />,
      text: "Réinitialiser",
      color: "#8b5cf6",
      onClick: () => {
        setCode("");
        setCategorie("");
        setMarque("");
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

        {/* categoie */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsCategorie"} text={"Category"} />
          <SelectInput
            options={categories_array}
            value={categorie}
            setValue={setCategorie}
            label="Par categorie"
          />
        </div>

        {/* categoie */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsMarque"} text={"Marque"} />
          <SelectInput
            options={categories_array}
            value={marque}
            setValue={setMarque}
            label="Par marque"
          />
        </div>

        {/* buttons */}
        <div className="buttons flex gap-2">
          {buttons_array.map((button, index) => (
            <ShiningButton
              key={index}
              text={button.text}
              icon={button.icon}
              color={button.color}
              onClick={button.onClick}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterContent;

const categories_array = [
  {
    id: 1,
    name: "Fruits",
  },
  {
    id: 2,
    name: "Beverages",
  },
  {
    id: 3,
    name: "Dairy",
  },
  {
    id: 4,
    name: "Meat",
  },
  {
    id: 2,
    name: "Beverages",
  },
  {
    id: 3,
    name: "Dairy",
  },
  {
    id: 4,
    name: "Meat",
  },
];
