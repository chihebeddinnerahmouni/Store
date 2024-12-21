import Label from "../../../ui/Label";
import InputNumber from "../../../ui/inputs/InputNumber";
import { Controller } from "react-hook-form";

interface DesignationProps {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
}

const Quantite = ({
  control,
  clearErrors,
  errors,
  id,
  value,
  setValue,
}: DesignationProps) => {
  // console.log(errors);
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Quantité*" />
      <Controller
        name="quantity"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <InputNumber
            label="Entrez la quantité"
            {...field}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            value={value}
            setValue={(value: string) => {
              setValue(value);
              field.onChange(value);
              if (errors.quantity) {
                clearErrors("quantity");
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default Quantite;
