// import { useState } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TableSortLabel,
//     Paper,
// } from "@mui/material";
// import CardTitle from "../../../components/ui/CardTitle";

// interface Prop {
//     data: {
//         id: number;
//         image: string;
//         type: string;
//         designation: string;
//         code: string;
//         marque: string;
//         category: string;
//         cout: string;
//         unité: string;
//         quantité: string;
//     }[];
// }

// const ProductsTable = ({ data }: Prop) => {
//     type DataKeys = keyof (typeof data)[0];
//     const [order, setOrder] = useState<"asc" | "desc">("asc");
//     const [orderBy, setOrderBy] = useState<keyof (typeof data)[0]>("code");
//     const columns: DataKeys[] = [
//         "type",
//         "designation",
//         "code",
//         "marque",
//         "category",
//         "cout",
//         "unité",
//         "quantité",
//     ];

//     const handleRequestSort = (property: DataKeys) => {
//         const isAsc = orderBy === property && order === "asc";
//         setOrder(isAsc ? "desc" : "asc");
//         setOrderBy(property);
//     };

//     const sortedData = data.sort((a, b) => {
//         if (a[orderBy] < b[orderBy]) {
//             return order === "asc" ? -1 : 1;
//         }
//         if (a[orderBy] > b[orderBy]) {
//             return order === "asc" ? 1 : -1;
//         }
//         return 0;
//     });

//     return (
//         <div className="shadow-mainShadow p-[1.25em] rounded-10 w-full">
//             <CardTitle text={`Ventes récentes`} />
//             <div className="mt-5 flex justify-center items-center flex-grow">
//                 <TableContainer component={Paper}>
//                     <Table
//                         sx={{
//                             border: "none",
//                         }}
//                     >
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell
//                                     sx={{
//                                         wordBreak: "keep-all",
//                                         whiteSpace: "nowrap",
//                                         border: "none",
//                                         borderBottom: "1px solid rgba(224, 224, 224, 1)",
//                                     }}
//                                 >
//                                     <TableSortLabel
//                                         active={orderBy === "image"}
//                                         direction={orderBy === "image" ? order : "asc"}
//                                         onClick={() => handleRequestSort("image")}
//                                     >
//                                         <p className="capitalize">Image</p>
//                                     </TableSortLabel>
//                                 </TableCell>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         key={column}
//                                         sx={{
//                                             wordBreak: "keep-all",
//                                             whiteSpace: "nowrap",
//                                             border: "none",
//                                             borderBottom: "1px solid rgba(224, 224, 224, 1)",
//                                         }}
//                                     >
//                                         <TableSortLabel
//                                             active={orderBy === column}
//                                             direction={orderBy === column ? order : "asc"}
//                                             onClick={() => handleRequestSort(column)}
//                                         >
//                                             <p className="capitalize">{column.replace(/_/g, " ")}</p>
//                                         </TableSortLabel>
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {sortedData.map((row) => (
//                                 <TableRow key={row.id}>
//                                     <TableCell
//                                         sx={{
//                                             border: "none",
//                                         }}
//                                     >
//                                         <img src={row.image} alt={row.designation} width="50" height="50" />
//                                     </TableCell>
//                                     {columns.map((column) => (
//                                         <TableCell
//                                             key={column}
//                                             sx={{
//                                                 border: "none",
//                                             }}
//                                         >
//                                             {row[column]}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>
//         </div>
//     );
// };

// export default ProductsTable;

import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";


const mainColor = "#006233";


interface Data {
  id: number;
  image: string;
  type: string;
  designation: string;
  code: string;
  marque: string;
  categorie: string;
  prix: string;
  cout: string;
  unité: string;
  quantité: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: string[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property as keyof Data);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            // color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all items",
            }}
            sx={{
              color: mainColor,
              "&.Mui-checked": {
                color: mainColor,
              },
              "&.MuiCheckbox-indeterminate": {
                color: mainColor,
              },
            }}
          />
        </TableCell>
        <TableCell align="center" padding="normal" sortDirection={false}>
          <TableSortLabel>
            <span className="capitalize">Image</span>
          </TableSortLabel>
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column}
            align="center"
            padding="normal"
            sortDirection={orderBy === column ? order : false}
          >
            <TableSortLabel
              active={orderBy === column}
              direction={orderBy === column ? order : "asc"}
              onClick={createSortHandler(column)}
            >
              <span className="capitalize">{column}</span>
              {orderBy === column ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
            background: alpha(mainColor, 0.1),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Produits
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
export default function EnhancedTable({
  rows,
  columns,
}: {
  rows: Data[];
  columns: string[];
}) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("code");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }} className="cardCs" >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      bgcolor: "inherit",
                      "&.Mui-selected": {
                        bgcolor: alpha(mainColor, 0.1),
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: alpha(mainColor, 0.2),
                      },
                    }}
                  >
                        <TableCell padding="checkbox" sx={{
                        border: "none",
                    }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        sx={{
                          border: "none",
                          color: mainColor,
                          "&.Mui-checked": {
                            color: mainColor,
                          },
                          "&.MuiCheckbox-indeterminate": {
                            color: mainColor,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                      }}
                    >
                      <img
                        src={row.image}
                        alt={row.designation}
                        className="w-10 h-10 bg-red200 rounded-full object-cover"
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column}
                        padding="normal"
                        align="center"
                        sx={{
                          border: "none",
                        }}
                      >
                        {row[column as keyof Data]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
