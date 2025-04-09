import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { ProductFormValues } from "../../../../types/achats/add achat/form";
import { FormikProps } from "formik";



interface DesignationProps {
  id: string;
  formik: FormikProps<ProductFormValues>;
  options: {
    id: number;
    name_category: string;
  }[];
}




const Category = ({
    id,
  options,
  formik,
}: DesignationProps) => {


  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name_category,
  }));

    return (
      <div className="bg-red200 flex flex-col gap-3">
        <Label id={id} text={"Categorie*"} />

        <SelectInput
          options={newOptions}
          label="Categorie*"
          error={
            formik.touched.category && Boolean(formik.errors.category)
          }
          helperText={formik.touched.category && formik.errors.category}
          value={formik.values.category.toString()}
          setValue={(value: string) => {
            const selectedOption = newOptions.find(
              (option) => option.name === value
            );
            const valueId = selectedOption ? selectedOption.id : 0;
            formik.setFieldValue("category", valueId);
          }}
        />
      </div>
    );
};

export default Category;
