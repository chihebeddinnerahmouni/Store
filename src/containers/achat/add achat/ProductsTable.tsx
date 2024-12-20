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
import InputQuantite from "../../../components/ui/inputs/InputQuantite";
import { enqueueSnackbar } from "notistack";




interface IProductCommandeItem {
  id: number;
  name: string;
  cout_unitaire: number;
  stock_actuel: number;
  remise: number;
  taxe: number;
  quantite: number;
  grand_total: number;
  alert_stock: number;
  unité: string;
}

interface Props {
  data: IProductCommandeItem[];
  setData: React.Dispatch<React.SetStateAction<IProductCommandeItem[]>>;
}

const ProductsTable = ({ data, setData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // console.log(data[0]);

  const filteredData = useMemo(() => {
    if (searchQuery !== "") {
      return data.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery, data]);

  return (
    <div className="cardCss mt-5 w-full">
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
                      wordBreak: "keep-all",
                      whiteSpace: "nowrap",
                      border: "none",
                      borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    <TableSortLabel direction="asc">
                      {column
                        .toString()
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <ProductRow
                  key={row.id}
                  row={row}
                  setData={setData}
                  data={data}
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
  setData,
  data,
}: {
  row: IProductCommandeItem;
  setData: (value: IProductCommandeItem[]) => void;
  data: IProductCommandeItem[];
  }) => {
  
  // const { enqueueSnackbar } = useSnackbar();
  
  
  const handleIncrement = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const newData = data.map((product) => {
      if (product.id === row.id) {
        const newQuantite = product.quantite + 1;
        if (product.stock_actuel < newQuantite) {
          enqueueSnackbar("Stock insuffisant");
          return product;
        }
        return {
          ...product,
          quantite: newQuantite,
          grand_total: newQuantite * product.cout_unitaire,
        };
      }
      return product;
    });
    setData(newData);
  };

  const handleDecrement = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const newData = data.map((product) =>
      product.id === row.id && product.quantite > 0
        ? {
            ...product,
            quantite: product.quantite - 1,
            grand_total: (product.quantite - 1) * product.cout_unitaire,
          }
        : product
    );
    setData(newData);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newQuantity = parseInt(e.target.value, 10);
    const newData = data.map((product) => {
      if (product.id === id) {
        if (product.stock_actuel < newQuantity) {
          enqueueSnackbar("Stock insuffisant");
          return product;
        }
        return {
          ...product,
          quantite: newQuantity,
          grand_total: newQuantity * product.cout_unitaire,
        };
      }
      return product;
    });
    setData(newData);
  };
    
  return (
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
        {row.stock_actuel === 0 ? (
          <p className="border-2 border-red-500 rounded inline px-1 text-red-500">
            0 <span className="text-xs">{row.unité}</span>
          </p>
        ) : row.stock_actuel < row.alert_stock ? (
          <p className="border-2 border-yellow-500 rounded inline px-1 text-yellow-500">
            {row.stock_actuel} <span className="text-xs">{row.unité}</span>
          </p>
        ) : (
          <p>
            {row.stock_actuel} <span className="text-xs">{row.unité}</span>
          </p>
        )}
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
        {row.remise}
      </TableCell>
      <TableCell align="center" sx={{ border: "none" }}>
        {row.taxe}
      </TableCell>
      <TableCell align="center" sx={{ border: "none" }}>
        {row.grand_total}
      </TableCell>
    </TableRow>
  );
};

export default ProductsTable;

const columns = [
  "id",
  "name",
  "cout_unitaire",
  "stock_actuel",
  "quantite",
  "remise",
  "taxe",
  "grand_total",
];
