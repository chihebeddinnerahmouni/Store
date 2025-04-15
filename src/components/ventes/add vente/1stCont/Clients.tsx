import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { FormikProps } from "formik";
import { IAdd_vente_form } from "../../../../types/ventes/add_vente_form";
import IClient from "../../../../types/client";


interface Props {
  clientsArray: IClient[];
  formik: FormikProps<IAdd_vente_form>;
  id: string;
}

const Clients = ({
    clientsArray,
  id,
  formik,
}: Props) => {

    const newOptions = clientsArray.map((client: any) => ({
        id: client.id,
        name: client.name,
    }));
    

  

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Client*"} />

      <SelectInput
        options={newOptions}
        label="Selectionnez le client*"
        error={formik.touched.clientId && Boolean(formik.errors.clientId)}
        helperText={formik.touched.clientId && formik.errors.clientId}
        value={formik.values.clientId}
        setValue={(value: string) => {
          const valueId =
            newOptions.find((option) => option.name === value)?.id || 0;
          formik.setFieldValue("clientId", valueId);
        }}
      />
    </div>
  );
};


export default Clients;
