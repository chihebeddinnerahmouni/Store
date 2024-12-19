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

type DataKeys = keyof (typeof data)[0];

const columns: DataKeys[] = [
  "reference",
  "client",
  "magasin",
  "status",
  "total",
  "paye",
  "restant",
  "paiment_status",
];

const VenteRecente = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("reference");
  const statusStyles = {
    "En cours":
      "border-2 border-yellow-500 rounded inline px-1 text-yellow-500",
    completé: "border-2 border-green-500 rounded inline px-1 text-green-500",
  };

  const paiment_statusStyles = {
    paid: "border-2 border-green-500 rounded inline px-1 text-green-500",
    "non paid":
      "border-2 border-red-500 rounded inline px-1 text-red-500",
    partial: "border-2 border-yellow-500 rounded inline px-1 text-yellow-500",
  };

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
              {columns.map((column) => (
                <TableCell
                  sx={{
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    border: "none",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleRequestSort(column)}
                  >
                    <p className="capitalize">{column.replace(/_/g, " ")}</p>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        border: "none",
                      }}
                    >
                      {column === "status" &&
                        statusStyles[
                          row[column] as keyof typeof statusStyles
                        ] && (
                          <div
                            className={
                              statusStyles[
                                row[column] as keyof typeof statusStyles
                              ]
                            }
                          >
                            <span>{row[column]}</span>
                          </div>
                        )}
                      {column === "paiment_status" &&
                        paiment_statusStyles[
                          row[column] as keyof typeof paiment_statusStyles
                        ] && (
                          <div
                            className={
                              paiment_statusStyles[
                                row[column] as keyof typeof paiment_statusStyles
                              ]
                            }
                          >
                            <span>{row[column]}</span>
                          </div>
                        )}
                      {column !== "status" && column !== "paiment_status" && (
                        <p>{row[column]}</p>
                      )}
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

const data = [
  {
    id: 1,
    reference: "SL-001",
    client: "client 1",
    magasin: "magasin 1",
    status: "completé",
    total: 1071.89,
    paye: 1000,
    restant: 71.89,
    paiment_status: "non paid",
  },
  {
    id: 2,
    reference: "SL-002",
    client: "client 2",
    magasin: "magasin 2",
    status: "En cours",
    total: 1071.89,
    paye: 1000,
    restant: 71.89,
    paiment_status: "paid",
  },
  {
    id: 3,
    reference: "SL-003",
    client: "client 3",
    magasin: "magasin 3",
    status: "En cours",
    total: 1071.89,
    paye: 1000,
    restant: 71.89,
    paiment_status: "partial",
  },
];

