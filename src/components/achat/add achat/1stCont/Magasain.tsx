import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { IAdd_achat_form } from "../../../../types/achats/add achat/add_achat_form";
import { FormikProps } from "formik";




interface IProps {
  options: any[];
  id: string;
  formik: FormikProps<IAdd_achat_form>;
}

const Magasain = ({
  id,
  options,
  formik
}: IProps) => {
  
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
        error={formik.touched.magasain && Boolean(formik.errors.magasain)}
        helperText={formik.touched.magasain && formik.errors.magasain}
        value={formik.values.magasain}
        setValue={(value: string) => {
          const valueId =
            newOptions.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("magasain", valueId);
        }}
      />
    </div>
  );
};

export default Magasain;
