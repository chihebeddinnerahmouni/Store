import Label from "../../../ui/Label";
import InputDate from "../../../ui/inputs/InputDate";
import { IAdd_achat_form } from "../../../../types/achats/add achat/add_achat_form";
import { FormikProps } from "formik";


interface Props {
  formik: FormikProps<IAdd_achat_form>;
  id: string;
}

const Date = ({
  id,
  formik,
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
