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
import Ireyonnage from "../../../types/reyonnage";
import UpdateButton from "../../../components/ui/buttons/actions/UpdateButton";
import DeleteButton from "../../../components/ui/buttons/actions/DeleteButton";
import UpdateMarqueModal from "../../../components/products/rayonnage/UpdateReyonModal";
import DeleteReyonModal from "../../../components/products/rayonnage/DeleteReyonModal";


interface Props {
  data: Ireyonnage[];
  columns: (keyof Ireyonnage)[];
}

const TableMarques = ({ data, columns }: Props) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Ireyonnage>("id");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updateRow, setUpdateRow] = useState<Ireyonnage | null>(null);
  const [deleteRow, setDeleteRow] = useState<Ireyonnage | null>(null);

  const handleRequestSort = (property: keyof Ireyonnage) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    if (searchQuery !== "") {
      return data.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        title="Rayonage"
        value={searchQuery}
        setValue={setSearchQuery}
        label="Chercher une marque"
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
        {updateRow && (
          <UpdateMarqueModal
            open={updateRow !== null}
            setOpen={setUpdateRow}
            data={updateRow}
          />
        )}
        {deleteRow && (
          <DeleteReyonModal
            open={deleteRow !== null}
            setOpen={setDeleteRow}
            data={deleteRow}
          />
        )}
      </div>
    </div>
  );
};


export default TableMarques;
