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
import CardTitle from "./CardTitle";

const data = [
  {
    id: 1,
    name: "sprite",
    magasin: "magasin 1",
    quantite: 80,
    alert_quantite: 100,
  },
  {
    id: 2,
    name: "fanta",
    magasin: "magasin 2",
    quantite: 90,
    alert_quantite: 100,
  },
  {
    id: 3,
    name: "coca-cola",
    magasin: "magasin 3",
    quantite: 100,
    alert_quantite: 100,
  },
  {
    id: 4,
    name: "pepsi",
    magasin: "magasin 4",
    quantite: 70,
    alert_quantite: 100,
  },
  {
    id: 5,
    name: "sprite",
    magasin: "magasin 5",
    quantite: 80,
    alert_quantite: 100,
  },
];

const Alerts = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("name");

  const handleRequestSort = (property: keyof (typeof data)[0]) => {
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
    <div className="shadow-mainShadow p-[1.25em] rounded-10 flex flex-col xl:flex-grow">
      <CardTitle text="Stock Alert" />
      <div className="mt-5 flex justify-center items-center flex-grow">
        <TableContainer component={Paper}>
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
        </TableContainer>
      </div>
    </div>
  );
};

export default Alerts;
