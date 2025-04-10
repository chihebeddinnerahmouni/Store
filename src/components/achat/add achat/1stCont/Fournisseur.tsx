import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { IAdd_achat_form } from "../../../../types/achats/add achat/add_achat_form";
import { FormikProps } from "formik";
import { IProvider } from "../../../../types/provider";


interface DesignationProps {
  options: IProvider[];
  id: string;
  formik: FormikProps<IAdd_achat_form>;
}

const Fournisseur = ({
  id,
  options,
  formik
}: DesignationProps) => {

   const newOptions = options.map((option) => ({
     id: option.id,
     name: option.name,
   }));


  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Fournisseur*"} />
      <SelectInput
        options={newOptions}
        label="Selectionnez le fournisseur*"
        error={formik.touched.provider && Boolean(formik.errors.provider)}
        helperText={formik.touched.provider && formik.errors.provider}
        value={formik.values.provider}
        setValue={(value: string) => {
          const valueId =
            newOptions.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("provider", valueId);
        }}
      />
    </div>
  );
};




export default Fournisseur;
