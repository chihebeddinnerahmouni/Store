import html2pdf from "html2pdf.js";

interface Data {}

// interface DataArray {
//     data: Data[];
//     }

// interface Columns {
//     columns: string[];
//     }

const handlePrintPdf = (data: any, columns: string[], title: string) => {
  const element = document.createElement("div");
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  // Create table headers
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  columns.forEach((column) => {
    const th = document.createElement("th");
    th.style.padding = "4px";
    th.style.backgroundColor = "#f2f2f2";
    th.style.borderBottom = "2px solid #000";
    th.style.textAlign = "left";
    th.style.fontWeight = "bold";
    th.textContent = column;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table rows
  const tbody = document.createElement("tbody");
  data.forEach((row: any) => {
    const tr = document.createElement("tr");
    columns.forEach((column) => {
      const td = document.createElement("td");
      td.style.padding = "4px";
      td.style.borderBottom = "1px solid #ddd";
      td.textContent = row[column as keyof typeof row] as string;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  element.appendChild(table);

  html2pdf()
    .from(element)
    .set({
      margin: 0.5,
      filename: title,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .toPdf()
    .save();
};

export default handlePrintPdf;
