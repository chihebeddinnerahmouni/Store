import Label from "../../ui/Label";
import SelectInput from "../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";

interface DesignationProps {
  control: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
  clearErrors: (name: string) => void;
}

const options_array = [
  { id: 1, name: "magasin 1" },
  { id: 2, name: "magasin 2" },
  { id: 3, name: "magasin 3" },
  { id: 4, name: "magasin 4" },
];

const Magasain = ({
  control,
  errors,
  id,
  value,
  setValue,
  clearErrors,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Magasin*"} />

      <Controller
        name="magasain"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={options_array}
            label="Selectionnez le magasin*"
            {...field}
            error={!!errors.magasain}
            helperText={errors.magasain?.message}
            value={value}
            setValue={(value: string) => {
              setValue(value);
              field.onChange(value);
              if (errors.magasain) {
                clearErrors("magasain");
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default Magasain;
