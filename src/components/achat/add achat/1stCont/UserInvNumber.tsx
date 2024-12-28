import Label from "../../../ui/Label";
import InputText from "../../../ui/inputs/InputText";
import { Controller } from "react-hook-form";

interface DesignationProps {
  options: any[];
  control: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
  clearErrors: (name: string) => void;
}

const UserInvNumber = ({
  control,
  errors,
  id,
  value,
  setValue,
  clearErrors,
  options,
}: DesignationProps) => {
  // console.log(options);

  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Référence de l'utilisateur*"} />
      <Controller
        name="user_invoice_number"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <InputText
            label="Entrez la référence*"
            {...field}
            error={!!errors.user_invoice_number}
            helperText={errors.user_invoice_number?.message}
            value={value}
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
