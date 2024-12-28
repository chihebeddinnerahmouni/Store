import { useState, useMemo } from "react";
import { CiBarcode } from "react-icons/ci";
import ActionsButton from "../../../components/ui/buttons/actions/ActionButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TableTop from "../../../components/ui/TableTop";
import InputQuantite from "../../../components/ui/inputs/InputQuantite";
import { enqueueSnackbar } from "notistack";
import InputText from "../../../components/ui/inputs/InputText";
import FullShiningButton from "../../../components/ui/buttons/FullShiningButton";

interface IProductCommandeItem {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  // remise: number;
  taxe: number;
  quantite: number;
  grand_total: number;
  alert_stock: number;
  unité: string;
  has_serial_number: boolean;
  serial_numbers: string[];
}

interface Props {
  data: IProductCommandeItem[];
  setData: React.Dispatch<React.SetStateAction<IProductCommandeItem[]>>;
}

const ProductsTable = ({ data, setData }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return searchQuery
      ? data.filter((row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;
  }, [searchQuery, data]);

  return (
    <div className="cardCs mt-5 w-full scrollableCs">
      <TableTop
        title="Produits"
        value={searchQuery}
        setValue={setSearchQuery}
        label="Chercher un produit"
      />
      <div className="mt-5 flex justify-center items-center w-full">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      border: "none",
                      borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    <TableSortLabel direction="asc">
                      {formatColumnName(column)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    border: "none",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <TableSortLabel direction="asc">Actions</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <ProductRow
                  key={row.id}
                  row={row}
                  data={data}
                  setData={setData}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const ProductRow = ({
  row,
  data,
  setData,
}: {
  row: IProductCommandeItem;
  data: IProductCommandeItem[];
  setData: React.Dispatch<React.SetStateAction<IProductCommandeItem[]>>;
}) => {
  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(data[1].serial_numbers);

  const updateData = (id: number, newQuantity: number) => {
    const updatedData = data.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantite: newQuantity,
          grand_total: parseFloat(
            (
              newQuantity *
              product.cout_unitaire *
              (1 + product.taxe / 100)
            ).toFixed(2)
          ),
        };
      }
      return product;
    });
    setData(updatedData);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    updateData(row.id, row.quantite + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (row.quantite > 0) updateData(row.id, row.quantite - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) updateData(row.id, newQuantity);
  };

  const handleSerialNumbersSave = () => {
    if (serialNumbers.length !== row.quantite) {
      enqueueSnackbar(
        `Veuillez saisir ${row.quantite} numéros de série pour ce produit.`
      );
      return;
    }

    const updatedData = data.map((product) => {
      if (product.id === row.id) {
        return {
          ...product,
          serial_numbers: serialNumbers,
          grand_total: product.quantite * product.cout_unitaire, // Ensure grand total is updated
        };
      }
      return product;
    });
    setData(updatedData);
    setIsModalOpen(false);
    enqueueSnackbar("Numéros de série sauvegardés avec succès.");
  };


  const handleModalClose = () => {
    const updatedData = data.map((product) => {
      if (product.id === row.id) {
        const newQuantity = Math.max(product.quantite - 1, 0);
        return {
          ...product,
          quantite: newQuantity,
          grand_total: newQuantity * product.cout_unitaire, // Recalculate grand total
        };
      }
      return product;
    });
    setData(updatedData);
    setIsModalOpen(false);
  };



      const mainColor = "#006233";


  return (
    <>
      <TableRow>
        <TableCell align="center" sx={{ border: "none" }}>
          {row.id}
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          {row.cout_unitaire}
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          <StockStatus
            stock={row.stock_actuel}
            alertStock={row.alert_stock}
            unité={row.unité}
          />
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          <InputQuantite
            row={row}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleQuantityChange={handleQuantityChange}
          />
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          {row.taxe}
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          {row.grand_total}
        </TableCell>
        <TableCell align="center" sx={{ border: "none" }}>
          <ActionsButton
            active={row.has_serial_number}
            icon={<CiBarcode />}
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true)
            }}
            color={mainColor}
          />
        </TableCell>
      </TableRow>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Saisir les numéros de série</DialogTitle>
        <DialogContent sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
          {[...Array(row.quantite)].map((_, idx) => (
            <InputText
              key={idx}
              label={`Numéro de série ${idx + 1}`}
              value={serialNumbers[idx] || ""}
              setValue={(value) => {
                const updatedSerials = [...serialNumbers];
                updatedSerials[idx] = value;
                setSerialNumbers(updatedSerials);
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <FullShiningButton
            text="Annuler"
            color="#f00"
            // onClick={() => setIsModalOpen(false)}
            onClick={handleModalClose}
          />
          <FullShiningButton
            text="Sauvegarder"
            color={mainColor}
            onClick={handleSerialNumbersSave}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const StockStatus = ({
  stock,
  alertStock,
  unité,
}: {
  stock: number;
  alertStock: number;
  unité: string;
}) => {
  if (stock === 0)
    return (
      <p className="border-2 border-red-500 rounded inline px-1 text-red-500">
        0 <span className="text-xs">{unité}</span>
      </p>
    );
  if (stock < alertStock)
    return (
        <p className="border-2 border-yellow-500 rounded inline px-1 text-yellow-500">
          {stock} <span className="text-xs">{unité}</span>
        </p>
      );
    return (
        <p>
          {stock} <span className="text-xs">{unité}</span>
        </p>
      );
    };










const formatColumnName = (column: string) =>
  column.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default ProductsTable;

const columns = [
  "id",
  "name",
  "cout_unitaire",
  "stock_actuel",
  "quantite",
  // "remise",
  "taxe",
  "grand_total",
];
