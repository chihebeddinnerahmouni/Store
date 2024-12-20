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
import { IoSearchSharp } from "react-icons/io5";
import { visuallyHidden } from "@mui/utils";
import IFournisseures from "../../../types/fournisseures";

const mainColor = "#006233";

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
    property: keyof IFournisseures
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
      onRequestSort(event, property as keyof IFournisseures);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
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
        {columns.map((column) => (
          <TableCell
            key={column}
            sx={{ whiteSpace: "nowrap" }}
            align="center"
            padding="normal"
            sortDirection={orderBy === column ? order : false}
          >
            <TableSortLabel
              active={orderBy === column}
              direction={orderBy === column ? order : "asc"}
              onClick={createSortHandler(column)}
            >
              {columnName(column)}

              {orderBy === column ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" padding="normal" sortDirection={false}>
          <TableSortLabel>
            <span className="capitalize">Actions</span>
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { searchQuery, setSearchQuery } = props;

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
        padding={2}
      >
        Fournisseurs
      </Typography>
      <div className="search relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Chercher par nom"
          className={`p-2 w-[130px] border rounded-40 outline-main font-medium bg-emptyInput  pl-7 md:w-[200px] lg:w-[300px] xl:w-[400px]`}
        />
        <IoSearchSharp
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 text-[18px] left-2`}
        />
      </div>
    </Toolbar>
  );
}
export default function EnhancedTable({
  rows,
  columns,
}: {
  rows: IFournisseures[];
  columns: string[];
}) {
  // React.useEffect(() => {
  //   console.log(rows);
  // }, [columns, rows]);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IFournisseures>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof IFournisseures
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

  const filteredUsers = React.useMemo(() => {
    if (searchQuery !== "") {
      return rows.filter((row: any) =>
        row.nom.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return rows;
  }, [searchQuery, rows]);

  // console.log(filteredUsers);

  const visibleRows = React.useMemo(
    () =>
      [...filteredUsers]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredUsers]
  );

  // console.log(visibleRows);

  return (
    <Box sx={{ width: "100%" }} className="cardCs mt-5 lg:mt-10">
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
                    key={index}
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
                    <TableCell
                      padding="checkbox"
                      sx={{
                        border: "none",
                      }}
                    >
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
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        padding="normal"
                        align="center"
                        sx={{
                          border: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {/* {renderColumnContent(column, row)} */}
                        {row[column as keyof IFournisseures]}
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        border: "none",
                      }}
                    >
                      actionshh
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  empty
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


const columnName = (column: string) => {

  if (column === "total_dette") return "Total de la dette de retour d'achat";
  return column
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// const renderColumnContent = (column: string, row: IFournisseures) => {
//   if (column === "reference") {
//     return <p className="text-blue-500">{row[column as keyof IFournisseures]}</p>;
//   } else if (column === "status_de_paiement") {
//     if (row[column as keyof IFournisseures] === "partiel") {
//       return (
//         <span className="text-yellow-500 border-2 border-yellow-500 px-1 rounded-[5px]">
//           {row[column as keyof IFournisseures]}
//         </span>
//       );
//     } else if (row[column as keyof IFournisseures] === "non paid") {
//       return (
//         <span className="text-red-500 border-2 border-red-500 px-1 rounded-[5px]">
//           {row[column as keyof IFournisseures]}
//         </span>
//       );
//     } else if (row[column as keyof IFournisseures] === "paid") {
//       return (
//         <span className="text-green-500 border-2 border-green-500 px-1 rounded-[5px]">
//           {row[column as keyof IFournisseures]}
//         </span>
//       );
//     } else {
//       return <p>{row[column as keyof IFournisseures]}</p>;
//     }
//   } else if (column === "status") {
//     if (row[column as keyof IFournisseures] === "Complété") {
//       return <p className="text-green-500">{row[column as keyof IFournisseures]}</p>;
//     } else if (row[column as keyof IFournisseures] === "En cours") {
//       return <p className="text-red-500">{row[column as keyof IFournisseures]}</p>;
//     } else {
//       return <p>{row[column as keyof IFournisseures]}</p>;
//     }
//   } else {
//     return <p>{row[column as keyof IFournisseures]}</p>;
//   }
// };
