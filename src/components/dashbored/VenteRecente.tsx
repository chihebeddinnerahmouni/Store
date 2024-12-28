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


// interface IRecentVente {
//   id: number;
//   "Nom de Produit": string;
//   "Quantité Vendue": number;
//   "Coût Total": string;
// }


// interface Props {
//   recentVente: IRecentVente[];
// }

// const VenteRecente = ({ recentVente }: Props) => {
  
//   let data = recentVente.map((item, index) => {
//     return {
//       id: index + 1,
//       "Nom de Produit": item["Nom de Produit"],
//       "Quantité Vendue": item["Quantité Vendue"],
//       "Coût Total": item["Coût Total"],
//     };
//   });

//   const [order, setOrder] = useState<"asc" | "desc">("asc");
//   const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("Nom de Produit");
// type DataKeys = keyof (typeof data)[0];
// const columns: DataKeys[] = [
//     "Nom de Produit",
//     "Quantité Vendue",
//     "Coût Total",
//   ];
  

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
//     <div className="cardCss w-full">
//       <CardTitle text={`Ventes récentes`} />
//       <div className="mt-5 flex justify-center items-center flex-grow">
//         <TableContainer component={Paper}>
//           <Table
//             sx={{
//               border: "none",
//             }}
//           >
//             <TableHead>
//               {columns.map((column) => (
//                 <TableCell
//                   sx={{
//                     wordBreak: "keep-all",
//                     whiteSpace: "nowrap",
//                     border: "none",
//                     borderBottom: "1px solid rgba(224, 224, 224, 1)",
//                   }}
//                   key={column}
//                 >
//                   <TableSortLabel
//                     active={orderBy === column}
//                     direction={orderBy === column ? order : "asc"}
//                     onClick={() => handleRequestSort(column)}
//                   >
//                     {/* <p className="capitalize">{column.replace(/_/g, " ")}</p> */}
//                     {column}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//             </TableHead>
//             <TableBody>
//               {sortedData.map((row, index) => (
//                 <TableRow key={index}>
//                   {columns.map((column, index) => (
//                     <TableCell
//                       sx={{
//                         border: "none",
//                       }}
//                       key={index}
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

// export default VenteRecente;

    import { useState } from "react";
    import {
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TableRow,
      TableSortLabel,
      Paper,
    } from "@mui/material";
    import CardTitle from "../ui/CardTitle";

    interface IRecentVente {
      id: number;
      "Nom de Produit": string;
      "Quantité Vendue": number;
      "Coût Total": string;
    }

    interface Props {
      recentVente: IRecentVente[];
    }

    const VenteRecente = ({ recentVente }: Props) => {
      let data = recentVente.map((item, index) => {
        return {
          id: index + 1,
          "Nom de Produit": item["Nom de Produit"],
          "Quantité Vendue": item["Quantité Vendue"],
          "Coût Total": item["Coût Total"],
        };
      });

      const [order, setOrder] = useState<"asc" | "desc">("asc");
      const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("Nom de Produit");
      type DataKeys = keyof (typeof data)[0];
      const columns: DataKeys[] = [
        "Nom de Produit",
        "Quantité Vendue",
        "Coût Total",
      ];

      const handleRequestSort = (property: DataKeys) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
      };

      const sortedData = data.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return order === "asc" ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      });

      return (
        <div className="cardCss w-full">
          <CardTitle text={`Ventes récentes`} />
          <div className="mt-5 flex justify-center items-center flex-grow">
            <TableContainer component={Paper}>
              <Table
                sx={{
                  border: "none",
                }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{
                          wordBreak: "keep-all",
                          whiteSpace: "nowrap",
                          border: "none",
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                        key={column}
                      >
                        <TableSortLabel
                          active={orderBy === column}
                          direction={orderBy === column ? order : "asc"}
                          onClick={() => handleRequestSort(column)}
                        >
                          {column}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column, index) => (
                        <TableCell
                          sx={{
                            border: "none",
                          }}
                          key={index}
                        >
                          {row[column]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      );
    };

    export default VenteRecente;