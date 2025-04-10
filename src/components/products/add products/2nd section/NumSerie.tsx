import { Checkbox, FormControlLabel } from "@mui/material";
import { ProductFormValues } from "../../../../types/products/form";
import { FormikProps } from "formik";

interface NumSerieProps {
  formik: FormikProps<ProductFormValues>;
}

const NumSerie = ({ formik }: NumSerieProps) => {
  const mainColor = "#006233";

  return (
    <div className="cardCss">
      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.numSerie}
            onChange={(e) => formik.setFieldValue("numSerie", e.target.checked)}
            sx={{
              color: mainColor,
              "&.Mui-checked": {
                color: mainColor,
              },
            }}
          />
        }
        label="Le produit a un numéro de série ?"
      />
    </div>
  );
};

export default NumSerie;
