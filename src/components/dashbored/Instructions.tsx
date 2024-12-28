// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Paper,
// } from "@mui/material";
// import CardTitle from "../ui/CardTitle";

// type DataKeys = keyof (typeof data)[0];

// const columns: DataKeys[] = [
//   "name",
//   "vente_total",
//   "montant_total",
// ];

// const data = [
//   {
//     id: 1,
//     name: "coca-cola",
//     vente_total: 100,
//     montant_total: 1000,
//   },
//   {
//     id: 2,
//     name: "fanta",
//     vente_total: 50,
//     montant_total: 500,
//   }
// ];

// const PlusVendueTable = () => {
//   const [order, setOrder] = useState<"asc" | "desc">("asc");
//   const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("name");
//   const currentMonth = new Date().toLocaleString("default", { month: "long" });

//   const handleRequestSort = (property: DataKeys) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const sortedData = data.sort((a, b) => {
//     if (a[orderBy] < b[orderBy]) {
//       return order === "asc" ? -1 : 1;
//     }
//     if (a[orderBy] > b[orderBy]) {
//       return order === "asc" ? 1 : -1;
//     }
//     return 0;
//   });

//   return (
//     <div className="cardCss xl:w-[300px]">
//       <CardTitle text={`Produit Les Plus Vendus (${currentMonth})`} />
//       <div className="mt-5 flex justify-center items-center flex-grow">
//         <TableContainer component={Paper}>
//           <Table
//             sx={{
//               border: "none",
//             }}
//           >
//             <TableHead>
//               {columns.map((column, index) => (
//                 <TableCell
//                   key={index}
//                   sx={{
//                     wordBreak: "keep-all",
//                     whiteSpace: "nowrap",
//                     border: "none",
//                     borderBottom: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                 >
//                   <TableSortLabel
//                     active={orderBy === column}
//                     direction={orderBy === column ? order : "asc"}
//                     onClick={() => handleRequestSort(column)}
//                   >
//                     <p className="capitalize">{column.replace(/_/g, " ")}</p>
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//             </TableHead>
//             <TableBody>
//               {sortedData.map((row) => (
//                 <TableRow key={row.id}>
//                   {columns.map((column) => (
//                     <TableCell
//                       sx={{
//                         border: "none",
//                       }}
//                     >
//                       {row[column]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };


// export default PlusVendueTable;

         
import CardTitle from "../ui/CardTitle";


const Instructions = () => {


   const sectionInstructions = {
  "Ventes et achats de cette semaine": "Affiche un résumé des ventes et achats effectués au cours de la semaine, incluant les quantités et montants totaux.",
  "Produit Les Plus Vendus (2024)": "Présente une liste des produits les plus vendus de l'année 2024, classés par popularité ou volume de ventes.",
  "Alerte de stock": "Met en évidence les produits dont les niveaux de stock sont faibles ou épuisés, nécessitant une action immédiate.",
  "Ventes récentes": "Montre un historique des transactions de vente récemment enregistrées, avec les détails des produits, quantités et clients."
};

  return (
    <div className="cardCss xl:w-[300px]">
      <CardTitle text={`Instructions`} />
      <div className="">
        {Object.entries(sectionInstructions).map(([key, value]) => (
          <div key={key} className="mb-5">
            <h3 className="text-sm font-bold">{key}</h3>
            <p className="text-xs text-black/70">{value}</p>
          </div>
       ))}
      </div>
    </div>
  );
};


export default Instructions;

         