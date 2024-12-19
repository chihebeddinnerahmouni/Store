// import { useState } from "react";
// import ShiningButton from "../../../components/ui/ShiningButton";import { BsFiletypePdf } from "react-icons/bs";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import handlePrintPdf from "../../../helper/CreatePdf";

// interface ButtonsContProps {
//   data: {
//     id: number;
//     code_category: string;
//     nom_de_categorie: string;
//   }[];
//   columns: string[];
// }

// const ButtonsCont = ({
//   data,
//   columns,
// }: ButtonsContProps) => {


//   const navigate = useNavigate();
//   const [isAddOpen, setIsAddOpen] = useState(false);

//   const handleAdd = () => {
//     navigate("/ajouter-un-produit");
//   };

//   const buttons_array = [
//     {
//       icon: <BsFiletypePdf />,
//       text: "Export PDF",
//       color: "#10b981",
//       onClick: () => handlePrintPdf(data, columns, "Liste-de-categories.pdf"),
//     },
//     {
//       icon: <IoIosAddCircleOutline />,
//       text: "Add",
//       color: "#8b5cf6",
//       onClick: handleAdd,
//     },
//   ];

//   return (
//     <section className="w-full flex flex-col items-end">
//       <div className="buttons flex flex-wrap gap-2">
//         {buttons_array.map((button, index) => (
//           <ShiningButton
//             key={index}
//             text={button.text}
//             icon={button.icon}
//             color={button.color}
//             onClick={button.onClick}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ButtonsCont;


import { useState } from "react";
import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import handlePrintPdf from "../../../helper/CreatePdf";
import AddCategoryModal from "../../../components/products/categories/AddCategoryModal";

interface ButtonsContProps {
  data: {
    id: number;
    code_category: string;
    nom_de_categorie: string;
  }[];
  columns: string[];
}

const ButtonsCont = ({ data, columns }: ButtonsContProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const buttons_array = [
    {
      icon: <BsFiletypePdf />,
      text: "Export PDF",
      color: "#10b981",
      onClick: () => handlePrintPdf(data, columns, "Liste-de-categories.pdf"),
    },
    {
      icon: <IoIosAddCircleOutline />,
      text: "Add",
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
      <AddCategoryModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </section>
  );
};

export default ButtonsCont;