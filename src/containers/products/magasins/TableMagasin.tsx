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
import IMagasin from "../../../types/magasin";
import UpdateButton from "../../../components/ui/buttons/actions/UpdateButton";
import DeleteButton from "../../../components/ui/buttons/actions/DeleteButton";
import UpdateMarqueModal from "../../../components/products/marque/UpdateMarqueModal";
import DeleteMarqueModal from "../../../components/products/marque/DeleteMarqueModal";

interface Props {
  data: IMagasin[];
  columns: (keyof IMagasin)[];
  // columns: string[];
}

const TableMarques = ({ data, columns }: Props) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IMagasin>("id");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updateRow, setUpdateRow] = useState<IMagasin | null>(null);
  const [deleteRow, setDeleteRow] = useState<IMagasin | null>(null);

  const handleRequestSort = (property: keyof IMagasin) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    if (searchQuery !== "") {
      return data.filter((row) =>
        row.nom_de_magasin.toLowerCase().includes(searchQuery.toLowerCase())
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
        title="Magasins"
        value={searchQuery}
        setValue={setSearchQuery}
        label="Chercher par nom"
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
                <TableCell
                  sx={{
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    border: "none",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Actions
                </TableCell>
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
                  <TableCell
                    sx={{
                      border: "none",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <UpdateButton
                      active={true}
                      onClick={() => {
                        setUpdateRow(row);
                      }}
                    />
                    <DeleteButton
                      active={true}
                      onClick={() => {
                        setDeleteRow(row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {updateRow && (
          <UpdateMarqueModal
            open={updateRow !== null}
            setOpen={setUpdateRow}
            data={updateRow}
          />
        )}
        {deleteRow && (
          <DeleteMarqueModal
            open={deleteRow !== null}
            setOpen={setDeleteRow}
            data={deleteRow}
          />
        )} */}
      </div>
    </div>
  );
};

export default TableMarques;
