import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../helper/CreatePdf";
import { IVente } from "../../../types/rapport/ventes/vente";
import { IVenteTable } from "../../../types/rapport/ventes/vente";
import { CiFilter } from "react-icons/ci";
import Drawer from "@mui/material/Drawer";
import FilterContent from "../../../components/rapport/vente/FilterContent";
import { useState } from "react";

interface ButtonsContProps {
  setData: (value: IVente[]) => void;
  data: IVente[];
  columns: (keyof IVenteTable)[];
  magasinsArray: any[];
  magasinName: string;
  setMagasinName: (value: string) => void;
  clientsArray: any[];
  setClientName: (value: string) => void;
  clientName: string;
  userInvNumber: string;
  setUserInvNumber: (value: string) => void;
}

const ButtonsCont = ({
  setData,
  data,
  columns,
  magasinsArray,
  magasinName,
  setMagasinName,
  clientsArray,
  setClientName,
  clientName,
  userInvNumber,
  setUserInvNumber,
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
          // zIndex: 1400,
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <FilterContent
          setData={setData}
          close={handleFilter}
          magasinsArray={magasinsArray}
          magasinName={magasinName}
          setMagasinName={setMagasinName}
          clientsArray={clientsArray}
          setClientName={setClientName}
          clientName={clientName}
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
        />
      </Drawer>
    </section>
  );
};

export default ButtonsCont;
