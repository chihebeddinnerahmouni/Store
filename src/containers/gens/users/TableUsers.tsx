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
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { IUser } from "../../../types/utilisateur";
import { IUserTable } from "../../../types/utilisateur";
import TableTop from "../../../components/ui/TableTop";



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
  a: { [key in Key]: number | string | null },
  b: { [key in Key]: number | string | null }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IUser
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
      onRequestSort(event, property as keyof IUser);
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
            align="left"
            padding="normal"
            sortDirection={orderBy === column ? order : false}
          >
            <TableSortLabel
              active={orderBy === column}
              direction={orderBy === column ? order : "asc"}
              onClick={createSortHandler(column)}
            >
              {column
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}

              {orderBy === column ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="left" padding="normal" sortDirection={false}>
          <TableSortLabel>
            Actions
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
      <TableTop title={"Utilisateurs"} value={searchQuery} setValue={setSearchQuery} label={"Cherchez par nom"}/>
    </Toolbar>
  );
}
export default function EnhancedTable({
  rows,
  columns,
}: {
  rows: IUser[];
  columns: (keyof IUserTable)[];
}) {
  // React.useEffect(() => {
  //   console.log(rows);
  // }, [columns, rows]);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IUser>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof IUser
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

  const filteredUsers = React.useMemo(() => {
    if (searchQuery !== "") {
      return rows.filter((row: IUser) =>
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
                        align="left"
                        sx={{
                          border: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {/* {renderColumnContent(column, row)} */}
                        {row[column as keyof IUserTable]}
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        border: "none",
                        display: "flex",
                        gap: "10px",
                      }}
                      align="left"
                    ></TableCell>
                  </TableRow>
                );
              })}
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

// const renderColumnContent = (column: string, row: IClient) => {
//   if (column === "reference") {
//     return <p className="text-blue-500">{row[column as keyof IClient]}</p>;
//   } else if (column === "status_de_paiement") {
//     if (row[column as keyof IClient] === "partiel") {
//       return (
//         <span className="text-yellow-500 border-2 border-yellow-500 px-1 rounded-[5px]">
//           {row[column as keyof IClient]}
//         </span>
//       );
//     } else if (row[column as keyof IClient] === "non paid") {
//       return (
//         <span className="text-red-500 border-2 border-red-500 px-1 rounded-[5px]">
//           {row[column as keyof IClient]}
//         </span>
//       );
//     } else if (row[column as keyof IClient] === "paid") {
//       return (
//         <span className="text-green-500 border-2 border-green-500 px-1 rounded-[5px]">
//           {row[column as keyof IClient]}
//         </span>
//       );
//     } else {
//       return <p>{row[column as keyof IClient]}</p>;
//     }
//   } else if (column === "status") {
//     if (row[column as keyof IClient] === "Complété") {
//       return <p className="text-green-500">{row[column as keyof IClient]}</p>;
//     } else if (row[column as keyof IClient] === "En cours") {
//       return <p className="text-red-500">{row[column as keyof IClient]}</p>;
//     } else {
//       return <p>{row[column as keyof IClient]}</p>;
//     }
//   } else {
//     return <p>{row[column as keyof IClient]}</p>;
//   }
// };
