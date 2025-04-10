import Label from "../../../ui/Label";
import InputText from "../../../ui/inputs/InputText";
import { IAdd_achat_form } from "../../../../types/achats/add achat/add_achat_form";
import { FormikProps } from "formik";

interface DesignationProps {
  formik: FormikProps<IAdd_achat_form>;
  id: string;
}

const UserInvNumber = ({ id, formik }: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Référence de l'utilisateur*"} />

      <InputText
        label="Entrez la référence*"
        error={
          formik.touched.user_invoice_number &&
          Boolean(formik.errors.user_invoice_number)
        }
        helperText={
          formik.touched.user_invoice_number &&
          formik.errors.user_invoice_number
        }
        value={formik.values.user_invoice_number}
        setValue={(value: string) => {
          formik.setFieldValue("user_invoice_number", value);
        }}
      />
    </div>
  );
};

export default UserInvNumber;
