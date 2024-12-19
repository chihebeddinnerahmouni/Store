import { Box } from "@mui/material";
import Label from "../../ui/Label";
import SelectInput from "../../ui/inputs/SelectInput";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import InputDate from "../../ui/inputs/InputDate";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";

interface Props {
  close: () => void;
  date: string;
  setDate: (value: string) => void;
  reference: string;
  setReference: (value: string) => void;
  fournisseur: string;
  setFournisseur: (value: string) => void;
  magasin: string;
  setMagasin: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  paimentStatus: string;
  setPaimentStatus: (value: string) => void;
}

const FilterContent = ({
  close,
  date,
  setDate,
  reference,
  setReference,
  fournisseur,
  setFournisseur,
  magasin,
  setMagasin,
  status,
  setStatus,
  paimentStatus,
  setPaimentStatus,
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
        // setCode("");
        // setCategorie("");
        // setMarque("");
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
        {/* date */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterAchatDate"} text={"Date"} />
          <InputDate value={date} setValue={setDate} label="Par date" />
        </div>

        {/* refecrence*/}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterAchatRef"} text={"Refecrence"} />
          <InputText
            value={reference}
            setValue={setReference}
            label="Par Refecrence"
          />
        </div>

        {/* fournisseures */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsFourni"} text={"Fournisseures"} />
          <SelectInput
            options={fournisseures_array}
            value={fournisseur}
            setValue={setFournisseur}
            label="Par Fournisseure"
          />
        </div>

        {/* magasins */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsMagasins"} text={"Magasins"} />
          <SelectInput
            options={magasins_array}
            value={magasin}
            setValue={setMagasin}
            label="Par Magasin"
          />
        </div>

        {/* Status */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterProductsStatus"} text={"Status"} />
          <SelectInput
            options={status_array}
            value={status}
            setValue={setStatus}
            label="Par Magasin"
          />
        </div>

        {/* Paiment status */}
        <div className="bg-red200 flex flex-col gap-3">
          <Label
            id={"filterProductsPaiment status"}
            text={"Status de paiment"}
          />
          <SelectInput
            options={paimentStatus_array}
            value={paimentStatus}
            setValue={setPaimentStatus}
            label="Par Status de paiment"
          />
        </div>

        {/* buttons */}
        <div className="buttons flex gap-2 mt-5">
          {buttons_array.map((button, index) => (
            <FullShiningButton
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

const paimentStatus_array = [
  {
    id: 1,
    name: "Partiel",
  },
  {
    id: 2,
    name: "Payé",
  },
  {
    id: 3,
    name: "Non payé",
  },
];

const status_array = [
  {
    id: 1,
    name: "En cours",
  },
  {
    id: 2,
    name: "paid",
  },
  {
    id: 3,
    name: "non paid",
  },
];

const magasins_array = [
  {
    id: 1,
    name: "Magasin 1",
  },
  {
    id: 2,
    name: "Magasin 2",
  },
  {
    id: 3,
    name: "Magasin 3",
  },
  {
    id: 4,
    name: "Magasin 4",
  }
]

const fournisseures_array = [
  {
    id: 1,
    name: "Fournisseur A",
  },
  {
    id: 2,
    name: "Fournisseur B",
  },
  {
    id: 3,
    name: "Fournisseur C",
  },
  {
    id: 4,
    name: "Fournisseur D",
  },
  {
    id: 2,
    name: "Fournisseur E",
  },
  {
    id: 3,
    name: "Fournisseur F",
  },
  {
    id: 4,
    name: "Fournisseur G",
  },
];
