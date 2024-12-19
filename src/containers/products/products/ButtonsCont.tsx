import {
    useState,
} from "react";
import ShiningButton from "../../../components/ui/ShiningButton";
import { CiFilter } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import FilterContent from "../../../components/products/products/FilterContent";
// import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import handlePrintPdf from "../../../helper/createPDF";

interface ButtonsContProps {
  data: {
    id: number;
    image: string;
    type: string;
    designation: string;
    code: string;
    marque: string;
    categorie: string;
    cout: string;
    prix: string;
    unité: string;
    quantité: string;
  }[];
    columns: string[];
    code: string;
    categorie: string;
    marque: string;
    setCode: (value: string) => void;
    setCategorie: (value: string) => void;
    setMarque: (value: string) => void;
}

const ButtonsCont = ({
    data,
    columns,
    code,
    categorie,
    marque,
    setCode,
    setCategorie,
    setMarque,
}: ButtonsContProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilter = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

    // const handlePrintPdf = () => {
    //   const element = document.createElement("div");
    //   const table = document.createElement("table");
    //   table.style.width = "100%";
    //   table.style.borderCollapse = "collapse";

    //   // Create table headers
    //   const thead = document.createElement("thead");
    //   const headerRow = document.createElement("tr");
    //   columns.forEach((column) => {
    //     const th = document.createElement("th");
    //     th.style.padding = "4px";
    //     th.style.backgroundColor = "#f2f2f2"; // Light grey background for headers
    //     th.style.borderBottom = "2px solid #000"; // Bottom border for headers
    //     th.style.textAlign = "left"; // Align text to the left
    //     th.style.fontWeight = "bold"; // Bold text
    //     th.textContent = column;
    //     headerRow.appendChild(th);
    //   });
    //   thead.appendChild(headerRow);
    //   table.appendChild(thead);

    //   // Create table rows
    //   const tbody = document.createElement("tbody");
    //   data.forEach((row) => {
    //     const tr = document.createElement("tr");
    //     columns.forEach((column) => {
    //       const td = document.createElement("td");
    //       td.style.padding = "4px";
    //       td.style.borderBottom = "1px solid #ddd"; // Bottom border for cells
    //       td.textContent = row[column as keyof typeof row] as string;
    //       tr.appendChild(td);
    //     });
    //     tbody.appendChild(tr);
    //   });
    //   table.appendChild(tbody);

    //   element.appendChild(table);

    //   html2pdf()
    //     .from(element)
    //     .set({
    //       margin: 0.5,
    //       filename: "Liste-de-produites.pdf",
    //       image: { type: "jpeg", quality: 0.98 },
    //       html2canvas: { scale: 1 },
    //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //     })
    //     .toPdf()
    //     .save();
    // };

    

  const handleExportExcel = () => {
    console.log("Export Excel not implemented");
  };

  const handleAdd = () => {
    navigate("/ajouter-un-produit");
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
      color: "#10b981",
      onClick: () => handlePrintPdf(data, columns, "Liste-de-produites.pdf"),
    },
    {
      icon: <AiOutlineFileExcel />,
      text: "Export Excel",
      color: "#ef4444",
      onClick: handleExportExcel,
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
      {/* Action Buttons */}
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
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
              <FilterContent
                  close={handleFilter}
                  code={code}
                  setCode={setCode}
                  categorie={categorie}
                  setCategorie={setCategorie}
                  marque={marque}
                    setMarque={setMarque}
              />
      </Drawer>
    </section>
  );
};

export default ButtonsCont;
