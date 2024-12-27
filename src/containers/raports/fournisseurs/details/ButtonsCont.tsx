import ShiningButton from "../../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../../helper/CreatePdf";
import { IProviderDetails } from "../../../../types/rapport/fournisseur/fournisseur_details";
import { IProviderDetailsTable } from "../../../../types/rapport/fournisseur/fournisseur_details";

interface ButtonsContProps {
  data: IProviderDetails[];
  columns: (keyof IProviderDetailsTable)[];
}

const ButtonsCont = ({ data, columns }: ButtonsContProps) => {
  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "Rapport-fournisseur-details.pdf"),
    },
  ];

  return (
    <section className="w-full flex flex-col items-center mt-5 md:items-end lg:mt-10">
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
