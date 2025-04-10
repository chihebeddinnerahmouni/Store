import TextField from "@mui/material/TextField";
import Label from "../../../ui/Label";
import { FaBarcode } from "react-icons/fa";
import { ProductFormValues } from "../../../../types/products/form";
import { FormikProps } from "formik";

interface DesignationProps {
  formik: FormikProps<ProductFormValues>;
}

const CodeBarre = ({ formik }: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"codeBarre"} text={"Code Produit*"} />
      <InputCodeBarre
        label="Entrez le code produit*"
        id={"codeBarre"}
        formik={formik}
      />
    </div>
  );
};
export default CodeBarre;

// _____________________________________________
interface InputCodeBarreProps {
  label: string;
  id: string;
  formik: FormikProps<ProductFormValues>;
}

const InputCodeBarre = ({ label, id, formik }: InputCodeBarreProps) => {
  const mainColor = "#006233";

  const createBarcode = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const generateBarcode = () => {
      const timestamp = Date.now().toString();
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      return (timestamp + randomNum).slice(-10);
    };
    let barcode = generateBarcode();
    const isValidBarcode = (barcode: string) => {
      return /^\d{10}$/.test(barcode);
    };
    while (!isValidBarcode(barcode)) {
      barcode = generateBarcode();
    }
    formik.setFieldValue("codeBarre", barcode);
  };

  return (
    <div className="relative bg-green200">
      <TextField
        label={label}
        value={formik.values.codeBarre}
        onChange={formik.handleChange("codeBarre")}
        variant="outlined"
        fullWidth
        helperText={
          formik.touched.codeBarre && formik.errors.codeBarre/*?.message*/
        }
        error={formik.touched.codeBarre && Boolean(formik.errors.codeBarre)}
        inputProps={{
          readOnly: true,
        }}
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
      <div
        className="absolute cursor-pointer top-[28px] -translate-y-[50%] right-3"
        onClick={createBarcode}
      >
        <FaBarcode />
      </div>
    </div>
  );
};
