import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { BsFiletypePdf } from "react-icons/bs";
import handlePrintPdf from "../../../helper/CreatePdf";
import { CiFilter } from "react-icons/ci";
import FilterContent from "../../../components/rapport/achats/FilterContent";
import { useState } from "react";
import { IAchatReport } from "../../../types/rapport/achats/achat";
import { IAchatReportTable } from "../../../types/rapport/achats/achat";
import SideDrawer from "../../../components/ui/side drawer/SideDrawer";



interface ButtonsContProps {
  setData: (value: IAchatReport[]) => void;
  data: IAchatReport[];
  columns: (keyof IAchatReportTable)[];
  magasinsArray: any[];
  magasinName: string;
  setMagasinName: (value: string) => void;
  fournisseurArray: any[];
  setFournisseurName: (value: string) => void;
  fournisseurName: string;
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
  fournisseurArray,
  setFournisseurName,
  fournisseurName,
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
      onClick: () => handlePrintPdf(data, columns, "Rapport-d'entrées.pdf"),
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
      <SideDrawer open={isDrawerOpen} onClose={handleFilter}>
        <FilterContent
          setData={setData}
          close={handleFilter}
          magasinsArray={magasinsArray}
          magasinName={magasinName}
          setMagasinName={setMagasinName}
          fournisseurArray={fournisseurArray}
          fournisseurName={fournisseurName}
          setFournisseurName={setFournisseurName}
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
        />
      </SideDrawer>
    </section>
  );
};

export default ButtonsCont;
