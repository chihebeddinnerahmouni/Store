import TextField from "@mui/material/TextField";
import Label from "../../../ui/Label";
import { Autocomplete, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import IProduct from "../../../../types/Product";


interface IMainProp {
    id: string;
    setValue: (value: string) => void;
  value: string;
  selectedProduct: IProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
}
const Produit = ({
    id,
    value,
  setValue,
  selectedProduct,
  setSelectedProduct,
}: IMainProp) => {

  const url = import.meta.env.VITE_BASE_URL as string;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [dataSearch, setDataSearch] = useState<any[]>([]);


  useEffect(() => { 
    const fetchData = async () => {
      axios
        .post(
          `${url}/api/products/search?q=${value}`,
          {
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res: any) => {
          // console.log(res.data.products);
          const suggestionsArray = res.data.products.map(
            (product: any) => product.name
          );
          setSuggestions(suggestionsArray);
          setDataSearch(res.data.products);
          if (suggestionsArray.length === 0) {
            enqueueSnackbar("Produit non trouvé", { variant: "error" });
          }

          if (suggestionsArray.length === 1) {
            setSelectedProduct(res.data.products[0]);
            setValue("");
            setSuggestions([]);
          }
        })
        .catch((err) => {
          //  setLoading(false);
          if (err.message === "Network Error") {
            enqueueSnackbar("Erreur de connexion", { variant: "error" });
          } else {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          }
        });
    };


    // const testFunction = () => {
    //   const suggestionsArray = test.products.map((product: any) => product.name);
    //   setSuggestions(suggestionsArray);
    //   setDataSearch(test.products);
    // }

    //  value && fetchData();
    const handler = setTimeout(() => {
      if (value) {
        fetchData();
        // testFunction();
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  


    return (
        <div className="bg-red200 flex flex-col gap-3">
            <Label id={id} text="Produit" />
            <InputAutocomplete
                value={value}
          setValue={setValue}
                label="Entrez le nom/code du produit"
                id={id}
          suggestions={suggestions}
          dataSearch={dataSearch}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
            />
        </div>
    );
};

interface InputAutocompleteProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
    id: string;
  suggestions: string[];
  dataSearch: IProduct[];
  selectedProduct: IProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
}

const InputAutocomplete = ({
    value,
    setValue,
    label,
    id,
  suggestions,
  dataSearch,
  // selectedProduct,
  setSelectedProduct,
}: InputAutocompleteProps) => {
    const mainColor = "#006233";
  const [inputValue, setInputValue] = useState(value);

    return (
      <div>
        <Autocomplete
          freeSolo
          options={suggestions}
          value={value}
          onChange={(_event, newValue) => {
            const product = dataSearch.find(
              (product) => product.name === newValue
            );
            if (product) {
              setSelectedProduct(product);
            }
            setValue(newValue || "");
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
            setValue(newInputValue);
          }}
          // onChange={addFunction}
          slots={{
            paper: (props) => (
              <Paper {...props} sx={{ height: "200px", overflowY: "scroll" }} />
            ),
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              id={id}
              sx={{
                "& input": {
                  color: "black",
                },
                "& label.Mui-focused": {
                  color: mainColor,
                },
                "& label": {
                  color: "grey",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: mainColor,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: mainColor,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mainColor,
                  },
                },
              }}
            />
          )}
        />
      </div>
    );
};

export default Produit;




























































// const test = {
//   products: [
//     {
//       id: 9,
//       name: "Mercedes",
//       code_barre: "0258134628",
//       category_id: 2,
//       brand_id: 1,
//       unit_id: 3,
//       reyonage_id: 5,
//       tax_percentage: "0.00",
//       description: "dfsd gdgh fg hfgshg hdfjdhgdjghjhj",
//       price_buy: "100.00",
//       price_sell: "200.00",
//       stock_alert: 2005,
//       quantity: 0,
//       has_serial_number: 0,
//       created_by: 2,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2024-12-23T16:11:25.000000Z",
//       updated_at: "2024-12-23T16:11:25.000000Z",
//       category: {
//         id: 2,
//         code_category: "M-55",
//         name_category: "Mob",
//         description: "From mobile",
//         status: "active",
//         deleted_by: null,
//         created_by: 2,
//         updated_by: 2,
//         created_at: "2024-12-21T22:14:45.000000Z",
//         updated_at: "2024-12-23T17:23:13.000000Z",
//       },
//       brand: {
//         id: 1,
//         code_brand: "test",
//         name_brand: "kjbj",
//         description: "bioib",
//         created_by: 1,
//         updated_by: null,
//         deleted_by: null,
//         created_at: "2024-12-21T21:32:58.000000Z",
//         updated_at: "2024-12-21T21:32:58.000000Z",
//       },
//       unit: {
//         id: 3,
//         code_unit: "KG",
//         name_unit: "Kilogram",
//         description: "Unit of mass",
//         created_by: 1,
//         updated_by: null,
//         deleted_by: null,
//         created_at: "2024-12-22T18:53:40.000000Z",
//         updated_at: "2024-12-22T18:53:40.000000Z",
//       },
//       rayonage: {
//         id: 5,
//         code_location: "H1",
//         name: "H1-N1",
//         description: "Djdhdhdvdbdbfjzkkdjfh",
//         created_by: 1,
//         updated_by: null,
//         deleted_by: null,
//         created_at: "2024-12-23T00:24:51.000000Z",
//         updated_at: "2024-12-23T00:24:51.000000Z",
//       },
//     },
//     {
//       id: 10,
//       name: "Phone",
//       code_barre: "0258134628",
//       category_id: 2,
//       brand_id: 1,
//       unit_id: 3,
//       reyonage_id: 5,
//       tax_percentage: "0.00",
//       description: "dfsd gdgh fg hfgshg hdfjdhgdjghjhj",
//       price_buy: "100.00",
//       price_sell: "200.00",
//       stock_alert: 2005,
//       quantity: 10,
//       has_serial_number: 1,
//       created_by: 2,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2024-12-23T16:11:25.000000Z",
//       updated_at: "2024-12-23T16:11:25.000000Z",
//       category: {
//         id: 2,
//         code_category: "M-55",
//         name_category: "Mob",
//         description: "From mobile",
//         status: "active",
//         deleted_by: null,
//         created_by: 2,
//         updated_by: 2,
//         created_at: "2024-12-21T22:14:45.000000Z",
//         updated_at: "2024-12-23T17:23:13.000000Z",
//       },
//       brand: {
//         id: 1,
//         code_brand: "test",
//         name_brand: "kjbj",
//         description: "bioib",
//         created_by: 1,
//         updated_by: null,
//         deleted_by: null,
//         created_at: "2024-12-21T21:32:58.000000Z",
//         updated_at: "2024-12-21T21:32:58.000000Z",
//       },
//       unit: {
//         id: 3,
//         code_unit: "KG",
//         name_unit: "Kilogram",
//         description: "Unit of mass",
//         created_by: 1,
//         updated_by: null,
//         deleted_by: null,
//         created_at: "2024-12-22T18:53:40.000000Z",
//         updated_at: "2024-12-22T18:53:40.000000Z",
//       },
//       rayonage: {
//         id: 5,
//         code_location: "H1",
//         name: "H1-N1",
//         description: "Djdhdhdvdbdbfjzkkdjfh",
//         created_by: 1,
//         updated_by: null,
//         deleted_by: null,
//         created_at: "2024-12-23T00:24:51.000000Z",
//         updated_at: "2024-12-23T00:24:51.000000Z",
//       },
//     },
//   ],
// };