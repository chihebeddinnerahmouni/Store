import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";

interface Props {
    clientsArray: any[];
  control: any;
  errors: any;
  setValue: (value: number) => void;
  value: number;
    clearErrors: (name: string) => void;
    id: string;
}

const Clients = ({
  control,
    errors,
    clientsArray,
  value,
  setValue,
    clearErrors,
    id,

}: Props) => {
    // console.log(value);

    const newOptions = clientsArray.map((client: any) => ({
        id: client.id,
        name: client.name,
    }));
    

  

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Client*"} />

      <Controller
        name="magasain"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={newOptions}
            label="Selectionnez le client*"
            {...field}
            error={!!errors.magasain}
            helperText={errors.magasain?.message}
            value={
              value === 0
                ? ""
                : newOptions.find((option) => option.id === value)?.name
            }
            setValue={(value: string) => {
              const selectedOption = newOptions.find(
                (option) => option.name === value
              );
              const valueId = selectedOption ? selectedOption.id : 0;
              setValue(valueId);
              field.onChange(value);
              if (errors.category) {
                clearErrors("magasain");
              }
            }}
          />
        )}
      />
    </div>
  );
};


export default Clients;
