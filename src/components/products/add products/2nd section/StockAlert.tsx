import Label from "../../../ui/Label";
import InputNumber from "../../../ui/inputs/InputNumber";
import { ProductFormValues } from "../../../../types/products/form";
import { FormikProps } from "formik";


interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
}

const StockAlert = ({
  id,
  formik,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Alerte de stock*" />
      <InputNumber
        label="Entrez l'alerte de stock"
        error={formik.touched.stockAlert && Boolean(formik.errors.stockAlert)}
        helperText={formik.touched.stockAlert && formik.errors.stockAlert}
        value={formik.values.stockAlert}
        setValue={(value: string) => {
          formik.handleChange("stockAlert")(value);
        }}
      />
    </div>
  );
};

export default StockAlert;
