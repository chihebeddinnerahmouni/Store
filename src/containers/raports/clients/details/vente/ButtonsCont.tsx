import ShiningButton from "../../../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../../../helper/CreatePdf";
import { IClientVent } from "../../../../../types/rapport/clients/details/vente_details";
import { IClientVenteTable } from "../../../../../types/rapport/clients/details/vente_details";

interface ButtonsContProps {
  data: IClientVent[];
  columns: (keyof IClientVenteTable)[];
}

const ButtonsCont = ({ data, columns }: ButtonsContProps) => {
  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "Rapport-client-ventes.pdf"),
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
