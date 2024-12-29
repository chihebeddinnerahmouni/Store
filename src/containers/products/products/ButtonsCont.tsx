import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
// import { AiOutlineFileExcel } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import FilterContent from "../../../components/products/products/FilterContent";
// import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import handlePrintPdf from "../../../helper/CreatePdf";
// import IProduct from "../../../types/Product";
import IProductSingle from "../../../types/IProductSingle";

interface ButtonsContProps {
  data: IProductSingle[];
  columns: string[];
  setData: (value: IProductSingle[]) => void;
  // columns: (keyof IProduct)[];
  code: string;
  categorie: string;
  marque: string;
  setCode: (value: string) => void;
  setCategorie: (value: string) => void;
  setMarque: (value: string) => void;
  categoriesArray: any;
  marquesArray: any;
  reyonagesArray: any;
  setCategoriesArray: (value: any) => void;
  setMarquesArray: (value: any) => void;
  setReyonagesArray: (value: any) => void;
}

const ButtonsCont = ({
  data,
  columns,
  setData,
  code,
  categorie,
  marque,
  setCode,
  setCategorie,
  setMarque,
  categoriesArray,
  marquesArray,
  reyonagesArray,
  setCategoriesArray,
  setMarquesArray,
  setReyonagesArray,
}: ButtonsContProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilter = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleAdd = () => {
    navigate("/produits/ajouter-un-produit");
  };

  const buttons_array = [
    {
      icon: <CiFilter />,
      text: "Filter",
      color: "#3b82f6",
      onClick: handleFilter,
    },
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "Liste-de-produites.pdf"),
    },
    {
      icon: <IoIosAddCircleOutline />,
      text: "Ajouter",
      color: "#8b5cf6",
      onClick: handleAdd,
    },
  ];

  return (
    <section className="w-full flex flex-col items-end">
      {/* Action Buttons */}
      <div className="buttons flex flex-wrap gap-2">
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
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: "300px",
          },

          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <FilterContent
          close={handleFilter}
          setData={setData}
          code={code}
          setCode={setCode}
          categorie={categorie}
          setCategorie={setCategorie}
          marque={marque}
          setMarque={setMarque}
          categoriesArray={categoriesArray}
          setCategoriesArray={setCategoriesArray}
          marquesArray={marquesArray}
          setMarquesArray={setMarquesArray}
          reyonagesArray={reyonagesArray}
          setReyonagesArray={setReyonagesArray}
        />
      </Drawer>
    </section>
  );
};

export default ButtonsCont;
