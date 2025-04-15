import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../helper/CreatePdf";
import { IVente } from "../../../types/rapport/ventes/vente";
import { IVenteTable } from "../../../types/rapport/ventes/vente";
import { CiFilter } from "react-icons/ci";
import FilterContent from "../../../components/rapport/vente/FilterContent";
import { useState } from "react";
import SideDrawer from "../../../components/ui/side drawer/SideDrawer";


interface ButtonsContProps {
  setData: (value: IVente[]) => void;
  data: IVente[];
  columns: (keyof IVenteTable)[];
  magasinsArray: any[];
  clientsArray: any[];
  setClientId: (value: number) => void;
  magasinId: number;
  setMagasinId: (value: number) => void;
  clientId: number;
  userInvNumber: string;
  setUserInvNumber: (value: string) => void;
}

const ButtonsCont = ({
  setData,
  data,
  columns,
  magasinsArray,
  magasinId,
  setMagasinId,
  clientsArray,
  setClientId,
  clientId,
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
      onClick: () => handlePrintPdf(data, columns, "Rapport-de-sorties.pdf"),
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
     <SideDrawer open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
        <FilterContent
          setData={setData}
          close={handleFilter}
          magasinsArray={magasinsArray}
          magasinId={magasinId}
          setMagasinId={setMagasinId}
          clientsArray={clientsArray}
          setClientId={setClientId}
          clientId={clientId}
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
        />
      </SideDrawer>
    </section>
  );
};

export default ButtonsCont;
