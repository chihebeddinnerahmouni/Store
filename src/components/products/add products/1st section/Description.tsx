import Label from "../../../ui/Label";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";
import MultiLine from "../../../ui/inputs/MultiLine";

interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
}

const Description = ({
formik,
  id,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3 lg:col-span-2">
      <Label id={id} text="Description*" />

      <MultiLine
        id={id}
        label="Entrez la description*"
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        value={formik.values.description}
        setValue={(value: string) => {
          formik.handleChange("description")(value);
        }}
      />
    </div>
  );
};

export default Description;
