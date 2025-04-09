import Label from "../../../ui/Label";
import InputNumber from "../../../ui/inputs/InputNumber";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";

interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
}

const Tax = ({
  id,
  formik,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Taxe de commande (%)*" />
      <InputNumber
        label="Entrez la taxe de commande (%)"
        error={formik.touched.tax && Boolean(formik.errors.tax)}
        helperText={formik.touched.tax && formik.errors.tax}
        value={formik.values.tax}
        setValue={(value: string) => {
          formik.handleChange("tax")(value);
        }}
      />
    </div>
  );
};

export default Tax;


