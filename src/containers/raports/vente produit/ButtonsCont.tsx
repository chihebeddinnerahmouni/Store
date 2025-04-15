import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../helper/CreatePdf";
import { CiFilter } from "react-icons/ci";
import FilterContent from "../../../components/rapport/vent produit/FilterContent";
import { useState } from "react";
import { IProductVente } from "../../../types/rapport/vente produit/vente_produit";
import { IProductVenteTable } from "../../../types/rapport/vente produit/vente_produit";
import SideDrawer from "../../../components/ui/side drawer/SideDrawer";



interface ButtonsContProps {
  setData: (value: IProductVente[]) => void;
  data: IProductVente[];
  columns: (keyof IProductVenteTable)[];
  magasinsArray: any[];
  magasinName: number;
  setMagasinName: (value: number) => void;
  clientsArray: any[];
  setClientName: (value: number) => void;
  clientName: number;
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
      onClick: () =>
        handlePrintPdf(data, columns, "Rapport-de-sorties-de-produits.pdf"),
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
      <SideDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <FilterContent
          setData={setData}
          close={handleFilter}
          magasinsArray={magasinsArray}
          magasinName={magasinName}
          setMagasinName={setMagasinName}
          clientsArray={clientsArray}
          setClientName={setClientName}
          clientName={clientName}
        />
      </SideDrawer>
    </section>
  );
};

export default ButtonsCont;
