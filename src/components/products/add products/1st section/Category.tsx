import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";



interface DesignationProps {
  register: any;
  control: any;
  errors: any;
  id: string;
  setValue: (value: number) => void;
  value: number;
  clearErrors: (name: string) => void;
  options: {
    id: number;
    name_category: string;
  }[];
}

// const options_array = [
//     { id: 1, name: "option 1" },
//     { id: 2, name: "option 2" },
//     { id: 3, name: "option 3" },
//     { id: 4, name: "option 4" },
// ];




const Category = ({
    errors,
    id,
  value,
  control,
    setValue,
  clearErrors,
    options
}: DesignationProps) => {


  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name_category,
  }));

    return (
      <div className="bg-red200 flex flex-col gap-3">
        <Label id={id} text={"Categorie*"} />
        <Controller
          name="category"
          control={control}
          rules={{ required: "ce champ est obligatoire" }}
          render={({ field }) => (
            <SelectInput
              options={newOptions}
              label="Categorie*"
              {...field}
              error={!!errors.category}
              helperText={errors.category?.message}
              value={
                value === 0
                  ? ""
                  : newOptions.find((option) => option.id === value)?.name
              }
              // setValue={(value: string) => {
              //   const valueId = newOptions.find(
              //     (option) => option.name === value
              //   )!.id;
              //   setValue(valueId);
              //   field.onChange(value);
              //   if (errors.category) {
              //     clearErrors("category");
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
                  clearErrors("category");
                }
              }}
            />
          )}
        />

        {/* <SelectInput
          value={value}
          setValue={(val: string) => {
            setValue(val);
            clearErrors(id);
          }}
          options={options_array}
          label="Categorie"
          id={id}
          register={register}
          error={!!errors[id]}
          helperText={errors[id]?.message}
        /> */}
        {/* {errors[id] && (
                <span style={{ color: "red" }}>{errors[id].message}</span>
            )} */}
      </div>
    );
};

export default Category;
