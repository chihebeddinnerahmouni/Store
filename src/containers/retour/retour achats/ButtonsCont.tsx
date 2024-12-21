import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import Drawer from "@mui/material/Drawer";
// import FilterContent from "../../../components/ventes/ventes/FilterContent";
// import { useNavigate } from "react-router-dom";
import handlePrintPdf from "../../../helper/CreatePdf";
import IRetourAchats from "../../../types/RetourAchats";

interface ButtonsContProps {
  data: IRetourAchats[];
  columns: string[];
}

const ButtonsCont = ({
  data,
  columns,
}: ButtonsContProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const navigate = useNavigate();

  const handleFilter = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleExportExcel = () => {
    console.log("Export Excel not implemented");
  };

//   const handleAdd = () => {
//     navigate("/ventes/ajouter-un-vente");
//   };

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
      onClick: () => handlePrintPdf(data, columns, "Liste-retour-ventes.pdf"),
    },
    {
      icon: <AiOutlineFileExcel />,
      text: "Export Excel",
      color: "#ef4444",
      onClick: handleExportExcel,
    },
    // {
    //   icon: <IoIosAddCircleOutline />,
    //   text: "Add",
    //   color: "#8b5cf6",
    //   onClick: handleAdd,
    // },
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
      {/* <Drawer
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
          date={date}
          setDate={setDate}
          reference={reference}
          setReference={setReference}
          fournisseur={fournisseur}
          setFournisseur={setFournisseur}
          magasin={magasin}
          setMagasin={setMagasin}
          status={status}
          setStatus={setStatus}
          paimentStatus={paimentStatus}
          setPaimentStatus={setPaimentStatus}
        />
      </Drawer> */}
    </section>
  );
};

export default ButtonsCont;
