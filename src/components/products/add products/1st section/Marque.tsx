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
  options: {
    id: number;
    name_brand: string;
  }[];
}

// const options_array = [
//   { id: 1, name: "marque 1" },
//   { id: 2, name: "marque 2" },
//   { id: 3, name: "marque 3" },
//   { id: 4, name: "marque 4" },
// ];

const Marque = ({
  control,
  errors,
  id,
  value,
  setValue,
  clearErrors,
  options,
}: DesignationProps) => {

  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name_brand,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Marque*"} />

      <Controller
        name="marque"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={newOptions}
            label="Marque*"
            {...field}
            error={!!errors.marque}
            helperText={errors.marque?.message}
              value={value === 0 ? "" : newOptions.find((option) => option.id === value)!.name}
            setValue={(value: string) => {
               const valueId = newOptions.find(
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