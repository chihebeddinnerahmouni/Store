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
      "border-2 border-orange-500 rounded inline px-1 text-orange-500",
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
    <div className="shadow-mainShadow p-[1.25em] rounded-10 w-full">
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

/* <TableContainer component={Paper}>
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
                active={orderBy === "reference"}
                direction={orderBy === "reference" ? order : "asc"}
                onClick={() => handleRequestSort("reference")}
              >
                Reference
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
                active={orderBy === "client"}
                direction={orderBy === "client" ? order : "asc"}
                onClick={() => handleRequestSort("client")}
              >
                Client
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
                active={orderBy === "paiment_status"}
                direction={orderBy === "paiment_status" ? order : "asc"}
                onClick={() => handleRequestSort("paiment_status")}
              >
                Status de paiement
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
                active={orderBy === "total"}
                direction={orderBy === "total" ? order : "asc"}
                onClick={() => handleRequestSort("total")}
              >
                Total
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
                active={orderBy === "paye"}
                direction={orderBy === "paye" ? order : "asc"}
                onClick={() => handleRequestSort("paye")}
              >
                Paye
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
                active={orderBy === "restant"}
                direction={orderBy === "restant" ? order : "asc"}
                onClick={() => handleRequestSort("restant")}
              >
                Restant
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
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : "asc"}
                onClick={() => handleRequestSort("status")}
              >
                Status
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
    </TableContainer> */
