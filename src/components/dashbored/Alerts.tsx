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

interface IAlerteData {
  "Nom de Produit": string;
  "Nom d'entrepot": string;
  quanitité: number;
  "alerte de stock": number;
}

interface Props {
  alerteData: IAlerteData[];
}

const Alerts = ({ alerteData }: Props) => {
  const data = alerteData;
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof (typeof data)[0]>("Nom de Produit");
  type DataKeys = keyof (typeof data)[0];
  const columns: DataKeys[] = [
    "Nom de Produit",
    "Nom d'entrepot",
    "alerte de stock",
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
    <div className="cardCss xl:flex-grow">
      <CardTitle text="Alerte de stock" />
      <div className="mt-5 flex justify-center items-center flex-grow">
        <TableContainer component={Paper}>
          <Table sx={{ border: "none" }}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column, index) => (
                    <TableCell sx={{ border: "none" }} key={index}>
                      <p
                        className={`${
                          column === "alerte de stock" && "text-red-500"
                        }`}
                      >
                        {row[column]}
                      </p>
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

export default Alerts;
