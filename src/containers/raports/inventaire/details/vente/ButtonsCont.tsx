import ShiningButton from "../../../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../../../helper/CreatePdf";
import { IInvDetails_vente } from "../../../../../types/rapport/inventaire/inv_details_vente";
import { IInvDetails_vente_Table } from "../../../../../types/rapport/inventaire/inv_details_vente";

interface ButtonsContProps {
  data: IInvDetails_vente[];
  columns: (keyof IInvDetails_vente_Table)[];
}

const ButtonsCont = ({ data, columns }: ButtonsContProps) => {
  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "Rapport-inventaire-details-vente.pdf"),
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
    </section>
  );
};

export default ButtonsCont;
