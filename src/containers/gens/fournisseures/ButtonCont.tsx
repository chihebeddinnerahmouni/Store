import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import handlePrintPdf from "../../../helper/CreatePdf";
import IFournisseures from "../../../types/fournisseures";
import AddFourniModal from "../../../components/gens/fournisseures/AddFourniModal";

interface ButtonsContProps {
  data: IFournisseures[];
  columns: string[];
  refetch: () => void;
}

const ButtonsCont = ({ data, columns, refetch }: ButtonsContProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleExportExcel = () => {
    console.log("Export Excel not implemented");
  };

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      color: "#10b981",
      onClick: () => handlePrintPdf(data, columns, "Liste-du-clients.pdf"),
    },
    {
      icon: <AiOutlineFileExcel />,
      text: "Export Excel",
      color: "#ef4444",
      onClick: handleExportExcel,
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
      {isAddOpen && (
        <AddFourniModal onClose={() => setIsAddOpen(false)} refetch={refetch} />
      )}
    </section>
  );
};

export default ButtonsCont;
