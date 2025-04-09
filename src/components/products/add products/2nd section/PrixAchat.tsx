import Label from "../../../ui/Label";
import InputNumber from "../../../ui/inputs/InputNumber";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";


interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
}

const PrixAchat = ({
  id,
  formik
}: DesignationProps) => {

  // console.log(errors);
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Prix d'achat (DA)*" />
      <InputNumber
        label="Entrez le prix d'achat (DA)"
        error={formik.touched.prixAchat && Boolean(formik.errors.prixAchat)}
        helperText={formik.touched.prixAchat && formik.errors.prixAchat}
        value={formik.values.prixAchat}
        setValue={(value: string) => {
          formik.handleChange("prixAchat")(value);
        }}
      />
    </div>
  );
};


export default PrixAchat;
