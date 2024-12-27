import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../helper/CreatePdf";
import { IBestSell } from "../../../types/rapport/best sell/best_sell";
import { IBestSellTable } from "../../../types/rapport/best sell/best_sell";

interface ButtonsContProps {
  data: IBestSell[];
  columns: (keyof IBestSellTable)[];
}

const ButtonsCont = ({
  data,
  columns,
}: ButtonsContProps) => {

  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "plus-vendus.pdf"),
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
