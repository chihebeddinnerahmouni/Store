import ShiningButton from "../../../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../../../helper/CreatePdf";
import { IProductDetails } from "../../../../../types/rapport/produits/details/product";
import { IProductDetailsTable } from "../../../../../types/rapport/produits/details/product";
import { CiFilter } from "react-icons/ci";
import Drawer from "@mui/material/Drawer";
import FilterContent from "../../../../../components/rapport/produit/details/FilterContent";
import { useState } from "react";

interface ButtonsContProps {
  data: IProductDetails[];
  columns: (keyof IProductDetailsTable)[];
  magasinsArray: any[];
  usersArray: any[];
  magasinName: number;
  setMagasinName: (value: number) => void;
  userName: string;
  setUserName: (value: string) => void;
}

const ButtonsCont = ({
  data,
  columns,
  magasinsArray,
  usersArray,
  magasinName,
  userName,
  setMagasinName,
  setUserName,
}: ButtonsContProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFilter = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
      // color: "#10b981",
      color: "#ef4444",
      onClick: () => handlePrintPdf(data, columns, "Rapport-de-produit.pdf"),
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
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          zIndex: 1400,
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <FilterContent
          close={handleFilter}
          magasinsArray={magasinsArray}
          usersArray={usersArray}
          magasinName={magasinName}
          userName={userName}
          setMagasinName={setMagasinName}
          setUserName={setUserName}
        />
      </Drawer>
    </section>
  );
};

export default ButtonsCont;
