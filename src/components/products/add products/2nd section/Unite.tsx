import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";


interface DesignationProps {
  options: {
    id: number;
    name_unit: string;
  }[];
  id: string;
  formik: FormikProps<ProductFormValues>;
}


const Unite = ({
  options,
  id,
  formik
}: DesignationProps) => {

console.log(options);
  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name_unit,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Unité du Produit*"} />
      <SelectInput
        options={newOptions}
        label="Unité*"
        error={formik.touched.unite && Boolean(formik.errors.unite)}
        helperText={formik.touched.unite && formik.errors.unite}
        value={formik.values.unite}
        setValue={(value: string) => {
          const valueId =
            newOptions.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("unite", valueId);
        }}
      />
    </div>
  );
};


export default Unite;
