import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../helper/CreatePdf";
import IInventaire from "../../../types/rapport/inventaire/inventaire";
import { IIventaireTable } from "../../../types/rapport/inventaire/inventaire";

interface ButtonsContProps {
  data: IInventaire[];
  columns: (keyof IIventaireTable)[];
}

const ButtonsCont = ({ data, columns }: ButtonsContProps) => {
  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "Rapport d'inventaire.pdf"),
    },
  ];

  return (
    <section className="w-full flex flex-col items-center md:items-end">
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
    </section>
  );
};

export default ButtonsCont;
