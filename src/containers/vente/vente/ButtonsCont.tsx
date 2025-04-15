import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import FilterContent from "../../../components/ventes/ventes/FilterContent";
import { useNavigate } from "react-router-dom";
import handlePrintPdf from "../../../helper/CreatePdf";
import IVente from "../../../types/vente";
import SideDrawer from "../../../components/ui/side drawer/SideDrawer";

interface IProps {
  data: IVente[];
  columns: any[];
}

const ButtonsCont = ({columns, data}: IProps) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilter = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // const handleExportExcel = () => {
  //   console.log("Export Excel not implemented");
  // };

  const handleAdd = () => {
    navigate("/ventes/ajouter-un-vente");
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
      onClick: () => handlePrintPdf(data, columns, "Liste-vents.pdf"),
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
     
      <SideDrawer open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
        <FilterContent
          close={handleFilter}
        />
      </SideDrawer>
      
    </section>
  );
};

export default ButtonsCont;
