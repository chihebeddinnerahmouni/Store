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
import ViewButton from "../../../components/ui/buttons/actions/ViewButton";
import DeleteButton from "../../../components/ui/buttons/actions/DeleteButton";
import UpdateButton from "../../../components/ui/buttons/actions/UpdateButton";
import ViewModal from "../../../components/products/products/ViewModal";
import DeleteModal from "../../../components/products/products/DeleteModal";
import IProductSingle from "../../../types/IProductSingle";
import { IProductTable } from "../../../types/IProductSingle";
import TableTop from "../../../components/ui/TableTop";


const mainColor = "#006233";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof IProductSingle>(
  order: Order,
  orderBy: Key
): (a: IProductSingle, b: IProductSingle) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IProductSingle
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
      onRequestSort(event, property as keyof IProductSingle);
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
            align="left"
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
      <TableTop
        title="Produits"
        value={searchQuery}
        setValue={setSearchQuery}
        label="Chercher par code"
      />
    </Toolbar>
  );
}
export default function EnhancedTable({
  rows,
  columns,
}: {
  rows: IProductSingle[];
    columns: (keyof IProductTable)[];
}) {
  // React.useEffect(() => {
  // console.log(rows);
  // }, [columns, rows]);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IProductSingle>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewRow, setViewRow] = React.useState<IProductSingle | null>(null);
  const [deleteRow, setDeleteRow] = React.useState<IProductSingle | null>(null);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof IProductSingle
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
      return rows.filter((row: IProductSingle) =>
        row.code.toLowerCase().includes(searchQuery.toLowerCase())
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
                        {row[column as keyof IProductTable]}
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        border: "none",
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <ViewButton
                          active={true}
                          onClick={() => setViewRow(row)}
                        />
                        <UpdateButton
                          active={true}
                          onClick={() =>
                            window.open(
                              `/produits/modifier-produit/${row.id}`,
                              `_blank`
                            )
                          }
                        />
                        <DeleteButton
                          active={true}
                          onClick={() => setDeleteRow(row)}
                        />
                      </div>
                    </TableCell>
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

      {viewRow && (
        <ViewModal
          onClose={() => setViewRow(null)}
          // row={viewRow}
          id={viewRow.id}
        />
      )}
      {deleteRow && (
        <DeleteModal onClose={() => setDeleteRow(null)} row={deleteRow} />
      )}
    </Box>
  );
}
