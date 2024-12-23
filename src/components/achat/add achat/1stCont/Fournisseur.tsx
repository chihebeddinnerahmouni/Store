import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";
import { useEffect } from "react";


interface DesignationProps {
  options: any[];
  control: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: number) => void;
  value: number;
  clearErrors: (name: string) => void;
}

// const options_array = [
//   { id: 1, name: "client 1" },
//   { id: 2, name: "client 2" },
//   { id: 3, name: "client 3" },
//   { id: 4, name: "client 4" },
// ];

const Fournisseur = ({
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
      <Label id={id} text={"Fournisseur*"} />
      <Controller
        name="fournisseur"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={newOptions}
            label="Selectionnez le fournisseur*"
            {...field}
            error={!!errors.fournisseur}
            helperText={errors.fournisseur?.message}
            value={
              value === 0
                ? ""
                : newOptions.find((option) => option.id === value)?.name
            }
            // setValue={(value: string) => {
            //   setValue(value);
            //   field.onChange(value);
            //   if (errors.fournisseur) {
            //     clearErrors("fournisseur");
            //   }
            // }}
            setValue={(value: string) => {
              const selectedOption = newOptions.find(
                (option) => option.name === value
              );
              const valueId = selectedOption ? selectedOption.id : 0;
              setValue(valueId);
              field.onChange(value);
              if (errors.category) {
                clearErrors("fournisseur");
              }
            }}
          />
        )}
      />
    </div>
  );
};




export default Fournisseur;
