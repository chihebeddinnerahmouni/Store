import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";


interface DesignationProps {
  control: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: number) => void;
  value: number;
  clearErrors: (name: string) => void;
}

const options_array = [
  { id: 1, name: "marque 1" },
  { id: 2, name: "marque 2" },
  { id: 3, name: "marque 3" },
  { id: 4, name: "marque 4" },
];

const Marque = ({
  control,
  errors,
  id,
  value,
  setValue,
  clearErrors,
}: DesignationProps) => {


  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Marque*"} />

      <Controller
        name="marque"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={options_array}
            label="Marque*"
            {...field}
            error={!!errors.marque}
            helperText={errors.marque?.message}
              value={value === 0 ? "" : options_array.find((option) => option.id === value)!.name}
            setValue={(value: string) => {
               const valueId = options_array.find(
                 (option) => option.name === value
               )!.id;
               setValue(valueId);
              field.onChange(value);
              if (errors.marque) {
                clearErrors("marque");
              }
            }}
          />
        )}
      />

    </div>
  );
};


export default Marque;