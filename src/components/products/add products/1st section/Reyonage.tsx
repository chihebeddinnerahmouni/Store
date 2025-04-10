import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { ProductFormValues } from "../../../../types/products/form";
import { FormikProps } from "formik";

interface DesignationProps {
  options: { 
    id: number;
    name: string;
  }[];
  id: string;
  formik: FormikProps<ProductFormValues>;
}


const Reyonage = ({
  id,
  options,
  formik,
}: DesignationProps) => {


  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Reyonnage*"} />
      <SelectInput
        options={options}
        label="Reyonnage*"
        error={formik.touched.reyonage && Boolean(formik.errors.reyonage)}
        helperText={formik.touched.reyonage && formik.errors.reyonage}
        value={formik.values.reyonage}
        setValue={(value: string) => {
          const valueId =
            options.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("reyonage", valueId);
        }}
      />
    </div>
  );
};

export default Reyonage;
