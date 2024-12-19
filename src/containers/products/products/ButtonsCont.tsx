import ShiningButton from "../../../components/ui/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

const ButtonsCont = () => {
    const handleFilter = () => {
    };
    const handleExportPDF = () => {
    };
    const handleExportExcel = () => {
    };
    const handleAdd = () => {
    };

    const buttons_array = [
        {
            icon: <CiFilter />,
            text: "Filtrer",
            color: "#0000FF",
            onClick: handleFilter, 
        },
        {
            icon: <BsFiletypePdf />,
            text: "Exporter en PDF",
            color: "#008000",
            onClick: handleExportPDF, 
        },
        {
            icon: <AiOutlineFileExcel />,
            text: "Exporter en Excel",
            color: "#FF0000",
            onClick: handleExportExcel, 
        },
        {
            icon: <IoIosAddCircleOutline />,
            text: "Ajouter",
            color: "#800080",
            onClick: handleAdd, 
        },
    ];

    return (
      <section className="w-full flex justify-end">
        <div className="buttons flex flex-wrap gap-2">
          {buttons_array.map((button, index) => (
            <ShiningButton
              key={index}
              icon={button.icon}
              text={button.text}
              color={button.color}
              onClick={button.onClick}
            />
          ))}
        </div>
      </section>
    );
};

export default ButtonsCont;