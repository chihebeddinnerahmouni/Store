import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
// import { AiOutlineFileExcel } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import FilterContent from "../../../components/products/products/FilterContent";
// import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import handlePrintPdf from "../../../helper/CreatePdf";
// import IProduct from "../../../types/Product";
import IProductSingle from "../../../types/IProductSingle";
import SideDrawer from "../../../components/ui/side drawer/SideDrawer";


interface ButtonsContProps {
  data: IProductSingle[];
  columns: string[];
}

const ButtonsCont = ({
  data,
  columns,
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
      <SideDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <FilterContent close={handleFilter} />
      </SideDrawer>
    </section>
  );
};

export default ButtonsCont;
