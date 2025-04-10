import Label from "../../../ui/Label";
import InputNumber from "../../../ui/inputs/InputNumber";
import { ProductFormValues } from "../../../../types/products/form";
import { FormikProps } from "formik";


interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
}

const PrixVente = ({
  id,
  formik,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Prix de vente (DA)*" />
      <InputNumber
        label="Entrez le prix d'achat (DA)"
        error={formik.touched.prixVente && Boolean(formik.errors.prixVente)}
        helperText={formik.touched.prixVente && formik.errors.prixVente}
        value={formik.values.prixVente}
        setValue={(value: string) => {
          formik.handleChange("prixVente")(value);
        }}
      />
    </div>
  );
};


export default PrixVente;
