import Label from "../../../ui/Label";
import InputText from "../../../ui/inputs/InputText";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
}

const UserInvNumber = ({
  control,
  clearErrors,
  errors,
  id,
  value,
  setValue,
}: Props) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Référence de l'utilisateur*" />
      <Controller
        name="user_invoice_number"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <InputText
            value={value}
            label="Entrez la référence de l'utilisateur"
            error={!!errors.user_invoice_number}
            helperText={errors.user_invoice_number?.message}
            setValue={(value: string) => {
              setValue(value);
              field.onChange(value);
              if (errors.user_invoice_number) {
                clearErrors("user_invoice_number");
              }
            }}
          />
        )}
      />
    </div>
  );
};


export default UserInvNumber;
