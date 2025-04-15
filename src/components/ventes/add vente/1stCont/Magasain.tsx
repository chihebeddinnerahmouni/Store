import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { FormikProps } from "formik";
import { IAdd_vente_form } from "../../../../types/ventes/add_vente_form";




interface DesignationProps {
  options: any[];
  id: string;
  formik: FormikProps<IAdd_vente_form>;
}

const Magasain = ({
  options,
  id,
  formik,
}: DesignationProps) => {
  // console.log(options);
  
const newOptions = options.map((option) => ({
  id: option.id,
  name: option.name,
}));


  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Magasin*"} />

      <SelectInput
        options={newOptions}
        label="Selectionnez le magasin*"
        error={formik.touched.magasainId && Boolean(formik.errors.magasainId)}
        helperText={formik.touched.magasainId && formik.errors.magasainId}
        value={formik.values.magasainId}
        setValue={(value: string) => {
          const valueId =
            newOptions.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("magasainId", valueId);
        }}
      />
    </div>
  );
};

export default Magasain;
