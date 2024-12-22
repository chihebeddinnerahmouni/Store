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
//   { id: 1, name: "A1-B2" },
//   { id: 2, name: "C2-D3" },
//   { id: 3, name: "E3-F4" },
//   { id: 4, name: "G4-H5" },
// ];

// const Reyonage = ({
//   register,
//   errors,
//   id,
//   value,
//   setValue,
//   clearErrors,
// }: DesignationProps) => {
//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={id} text={"Reyonage*"} />
//       <SelectInput
//         value={value}
//         setValue={(val: string) => {
//           setValue(val);
//           clearErrors(id);
//         }}
//         options={options_array}
//         label="Reyonage"
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

// export default Reyonage;
import Label from "../../../ui/Label";
import { Controller } from "react-hook-form";
import SelectInput from "../../../ui/inputs/SelectInput";

interface DesignationProps {
  options: { 
    id: number;
    name: string;
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
//   { id: 1, name: "A1-B2" },
//   { id: 2, name: "C2-D3" },
//   { id: 3, name: "E3-F4" },
//   { id: 4, name: "G4-H5" },
// ];

const Reyonage = ({
  control,
  errors,
  id,
  value,
  setValue,
  clearErrors,
  options
}: DesignationProps) => {


  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Reyonnage*"} />
      <Controller
        name="reyonage"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <SelectInput
            options={options}
            label="Reyonnage*"
            {...field}
            error={!!errors.reyonage}
            helperText={errors.reyonage?.message}
            value={
              value === 0
                ? ""
                : options.find((option) => option.id === value)?.name
            }
            // setValue={(value: string) => {
            //    const valueId = options.find(
            //      (option) => option.name === value
            //    )!.id;
            //    setValue(valueId);
            //   field.onChange(value);
            //   if (errors.reyonage) {
            //     clearErrors("reyonage");
            //   }
            // }}
            setValue={(value: string) => {
              const selectedOption = options.find(
                (option) => option.name === value
              );
              const valueId = selectedOption ? selectedOption.id : 0;
              setValue(valueId);
              field.onChange(value);
              if (errors.category) {
                clearErrors("reyonage");
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default Reyonage;
