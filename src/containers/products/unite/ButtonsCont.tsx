import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import handlePrintPdf from "../../../helper/CreatePdf";
import AddUniteModal from "../../../components/products/unite/AddUniteModal";
import IUnite from "../../../types/unite";

interface ButtonsContProps {
  data: IUnite[];
  columns: string[];
  refetch: () => void;
}

const ButtonsCont = ({ data, columns, refetch }: ButtonsContProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      color: "#10b981",
      onClick: () => handlePrintPdf(data, columns, "Liste-de-unités.pdf"),
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
      {isAddOpen && <AddUniteModal refetch={refetch} onClose={() => setIsAddOpen(false)} />}
    </section>
  );
};

export default ButtonsCont;
