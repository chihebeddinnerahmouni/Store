// import Label from "../../../ui/Label";
// import { forwardRef } from "react";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   FormHelperText,
// } from "@mui/material";

// interface DesignationProps {
//   register: any;
//   errors: any;
//   id: string;
//   setValue: (value: string) => void;
//   value: string;
//   clearErrors: (name: string) => void;
// }

// const options_array = [
//   { id: 1, name: "Unite 1" },
//   { id: 2, name: "Unite 2" },
//   { id: 3, name: "Unite 3" },
//   { id: 4, name: "Unite 4" },
// ];

// const Unite = ({
//   register,
//   errors,
//   id,
//   value,
//   setValue,
//   clearErrors,
// }: DesignationProps) => {
//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={id} text={"Unité du Produit*"} />
//       <SelectInput
//         value={value}
//         setValue={(val: string) => {
//           setValue(val);
//           clearErrors(id);
//         }}
//         options={options_array}
//         label="Unité"
//         id={id}
//         register={register}
//         error={!!errors[id]}
//         helperText={errors[id]?.message}
//       />
//     </div>
//   );
// };

// interface SelectCompProps {
//   options: {
//     id: number;
//     name: string;
//   }[];
//   label: string;
//   value: string;
//   setValue: (value: string) => void;
//   id: string;
//   register: any;
//   error: boolean;
//   helperText: string;
// }

// const SelectInput = forwardRef<HTMLInputElement, SelectCompProps>(
//   (
//     { value, setValue, label, options, id, register, error, helperText },
//     ref
//   ) => {
//     const mainColor = "#006233";

//     return (
//       <FormControl fullWidth>
//         <InputLabel
//           sx={{
//             color: "grey",
//             "&.Mui-focused": {
//               color: mainColor,
//             },
//           }}
//           id="carrosserie-label"
//         >
//           {label}
//         </InputLabel>
//         <Select
//           id={id}
//           inputRef={ref}
//           variant="outlined"
//           fullWidth
//           error={error}
//           //   helperText={helperText}
//           {...register(id, {
//             required: "Ce champ est obligatoire",
//             onChange: (e: any) => setValue(e.target.value),
//           })}
//           sx={{
//             borderRadius: 2,
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: mainColor,
//             },
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "grey",
//             },
//             "&.Mui-focused .MuiInputLabel-root": {
//               color: mainColor,
//             },
//             "& .MuiSelect-select": {
//               color: "black",
//             },
//           }}
//           labelId="carrosserie-label"
//           value={value}
//           label="Carrosserie"
//           //   onChange={(e) => setValue(e.target.value)}
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 200,
//                 overflow: "auto",
//               },
//             },
//           }}
//         >
//           <MenuItem value="">None</MenuItem>
//           {options.map((option, index) => (
//             <MenuItem key={index} value={option.name}>
//               {option.name}
//             </MenuItem>
//           ))}
//         </Select>
//         {helperText && (
//           <FormHelperText error={error}>{helperText}</FormHelperText>
//         )}
//       </FormControl>
//     );
//   }
// );


// export default Unite;
import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";


interface DesignationProps {
  options: {
    id: number;
    name_unit: string;
  }[];
  control: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: number) => void;
  value: number;
  clearErrors: (name: string) => void;
}

// const options_array = [
//   { id: 1, name: "Unite 1" },
//   { id: 2, name: "Unite 2" },
//   { id: 3, name: "Unite 3" },
//   { id: 4, name: "Unite 4" },
// ];

const Unite = ({
  options,
  control,
  errors,
  id,
  value,
  setValue,
  clearErrors,
}: DesignationProps) => {


  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name_unit,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Unité du Produit*"} />
      <Controller
        name="unite"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={newOptions}
            label="Unité*"
            {...field}
            error={!!errors.unite}
            helperText={errors.unite?.message}
            value={
              value === 0
                ? ""
                : newOptions.find((option) => option.id === value)?.name
            }
            // setValue={(value: string) => {
            //   const valueId = newOptions.find((option) => option.name === value)!.id;
            //   setValue(valueId);
            //   field.onChange(value);
            //   if (errors.unite) {
            //     clearErrors("unite");
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
                clearErrors("unite");
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
        label="Unité"
        id={id}
        register={register}
        error={!!errors[id]}
        helperText={errors[id]?.message}
      /> */}
    </div>
  );
};


export default Unite;
