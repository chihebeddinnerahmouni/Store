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
  "name",
  "vente_total",
  "montant_total",
];

const data = [
  {
    id: 1,
    name: "coca-cola",
    vente_total: 100,
    montant_total: 1000,
  },
  {
    id: 2,
    name: "fanta",
    vente_total: 50,
    montant_total: 500,
  }
];

const PlusVendueTable = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("name");
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

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
    <div className="cardCss xl:w-[300px]">
      <CardTitle text={`Produit Les Plus Vendus (${currentMonth})`} />
      <div className="mt-5 flex justify-center items-center flex-grow">
        <TableContainer component={Paper}>
          <Table
            sx={{
              border: "none",
            }}
          >
            <TableHead>
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


export default PlusVendueTable;

            {/* <TableContainer component={Paper}>
              <Table
                sx={{
                  border: "none",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        wordBreak: "keep-all",
                        whiteSpace: "nowrap",
                        border: "none",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleRequestSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "keep-all",
                        whiteSpace: "nowrap",
                        border: "none",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === "magasin"}
                        direction={orderBy === "magasin" ? order : "asc"}
                        onClick={() => handleRequestSort("magasin")}
                      >
                        Magasin
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "keep-all",
                        whiteSpace: "nowrap",
                        border: "none",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === "quantite"}
                        direction={orderBy === "quantite" ? order : "asc"}
                        onClick={() => handleRequestSort("quantite")}
                      >
                        Quantite
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "keep-all",
                        whiteSpace: "nowrap",
                        border: "none",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === "alert_quantite"}
                        direction={orderBy === "alert_quantite" ? order : "asc"}
                        onClick={() => handleRequestSort("alert_quantite")}
                      >
                        Alert Quantite
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        {row.magasin}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        {row.quantite}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        <span className="text-red-500">{row.alert_quantite}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}