import { useState, useMemo } from "react";
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
import TableTop from "../../../components/ui/TableTop";

interface Data {
  id: number;
  nom_court: string;
  nom_de_unité: string;
  unité_de_base: string;
}

interface Props {
  data: Data[];
  columns: (keyof Data)[];
}

const TableUnite = ({ data, columns }: Props) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    if (searchQuery !== "") {
      return data.filter((row) =>
        row.nom_de_unité.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery, data]);

  const sortedData = filteredData.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="cardCss mt-5 lg:mt-10">
      <TableTop
        title="Unités"
        value={searchQuery}
              setValue={setSearchQuery}
              label="Chercher une unité"
      />
      <div className="mt-5 flex justify-center items-center flex-grow">
        <TableContainer component={Paper}>
          <Table
            sx={{
              border: "none",
            }}
          >
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
                      <p className="capitalize">
                        {column.toString().replace(/_/g, " ")}
                      </p>
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={column as string}
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


export default TableUnite;