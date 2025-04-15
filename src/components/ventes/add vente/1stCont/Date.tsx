import Label from "../../../ui/Label";
import InputDate from "../../../ui/inputs/InputDate";
import { FormikProps } from "formik";
import { IAdd_vente_form } from "../../../../types/ventes/add_vente_form";



interface Props {
  id: string;
  formik: FormikProps<IAdd_vente_form>;
}

const Date = ({
  id,
  formik
}: Props) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Date*" />
      <InputDate
        label="Entrez la date"
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
        value={formik.values.date}
        setValue={(value: string) => {
          formik.setFieldValue("date", value);
        }}
      />
    </div>
  );
};

export default Date;
