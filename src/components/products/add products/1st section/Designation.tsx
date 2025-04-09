import Label from "../../../ui/Label";
import InputText from "../../../ui/inputs/InputText";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";


interface DesignationProps {
  formik: FormikProps<ProductFormValues>;
  id: string;
}

const Designation = ({
  formik,
  id,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Désignation*" />

      <InputText
        label="Nom du produit*"
        error={formik.touched.designation && Boolean(formik.errors.designation)}
        helperText={formik.touched.designation && formik.errors.designation}
        value={formik.values.designation}
        setValue={(value: string) => {
          formik.handleChange("designation")(value);
        }}
      />
    </div>
  );
};

export default Designation;

