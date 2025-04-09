import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";



interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
  options: {
    id: number;
    name_brand: string;
  }[];
}



const Marque = ({
  id,
  options,
  formik
}: DesignationProps) => {

  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name_brand,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Marque*"} />

      <SelectInput
        options={newOptions}
        label="Marque*"
        error={formik.touched.marque && Boolean(formik.errors.marque)}
        helperText={formik.touched.marque && formik.errors.marque}
        value={formik.values.marque}
        setValue={(value: string) => {
          const valueId =
            newOptions.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("marque", valueId);
        }}
      />
    </div>
  );
};


export default Marque;