import {
    useState,
} from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import FilterContent from "../../../components/products/products/FilterContent";
// import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import handlePrintPdf from "../../../helper/CreatePdf";
import IProduct from "../../../types/Product";


interface ButtonsContProps {
  // data: {
  //   id: number;
  //   image: string;
  //   type: string;
  //   designation: string;
  //   code: string;
  //   marque: string;
  //   categorie: string;
  //   cout: string;
  //   prix: string;
  //   unité: string;
  //   quantité: string;
  // }[];
  data: IProduct[];
  // columns: string[];
  columns: (keyof IProduct)[];  
    code: string;
    categorie: string;
    marque: string;
    setCode: (value: string) => void;
    setCategorie: (value: string) => void;
    setMarque: (value: string) => void;
}

const ButtonsCont = ({
    data,
    columns,
    code,
    categorie,
    marque,
    setCode,
    setCategorie,
    setMarque,
}: ButtonsContProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilter = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleExportExcel = () => {
    console.log("Export Excel not implemented");
  };

  const handleAdd = () => {
    navigate("/ajouter-un-produit");
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
      color: "#10b981",
      onClick: () => handlePrintPdf(data, columns, "Liste-de-produites.pdf"),
    },
    {
      icon: <AiOutlineFileExcel />,
      text: "Export Excel",
      color: "#ef4444",
      onClick: handleExportExcel,
    },
    {
      icon: <IoIosAddCircleOutline />,
      text: "Add",
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
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
              <FilterContent
                  close={handleFilter}
                  code={code}
                  setCode={setCode}
                  categorie={categorie}
                  setCategorie={setCategorie}
                  marque={marque}
                  setMarque={setMarque}
              />
      </Drawer>
    </section>
  );
};

export default ButtonsCont;
