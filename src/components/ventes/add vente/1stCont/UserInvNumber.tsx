import Label from "../../../ui/Label";
import InputText from "../../../ui/inputs/InputText";
import { FormikProps } from "formik";
import { IAdd_vente_form } from "../../../../types/ventes/add_vente_form";


interface Props {
  id: string;
  formik: FormikProps<IAdd_vente_form>;
}

const UserInvNumber = ({
  id,
  formik
}: Props) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Référence de l'utilisateur*" />
      <InputText
        label="Entrez la référence de l'utilisateur"
        error={formik.touched.user_invoice_number && Boolean(formik.errors.user_invoice_number)}
        helperText={formik.touched.user_invoice_number && formik.errors.user_invoice_number}
        value={formik.values.user_invoice_number}
        setValue={(value: string) => {
          formik.setFieldValue("user_invoice_number", value);
        }}
      />
    </div>
  );
};


export default UserInvNumber;
