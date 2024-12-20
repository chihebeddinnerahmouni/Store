// import Label from "../../../ui/Label";
// import { forwardRef } from "react";
// import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";

// interface DesignationProps {
//     register: any;
//     errors: any;
//     id: string;
//     setValue: (value: string) => void;
//     value: string;
//     clearErrors: (name: string) => void;
// }

// const options_array = [
//     { id: 1, name: "option 1" },
//     { id: 2, name: "option 2" },
//     { id: 3, name: "option 3" },
//     { id: 4, name: "option 4" },
// ];

// const Category = ({
//     register,
//     errors,
//     id,
//     value,
//     setValue,
//     clearErrors,
// }: DesignationProps) => {
//     return (
//       <div className="bg-red200 flex flex-col gap-3">
//         <Label id={id} text={"Categorie*"} />
//         <SelectInput
//           value={value}
//           setValue={(val: string) => {
//             setValue(val);
//             clearErrors(id);
//           }}
//           options={options_array}
//           label="Categorie"
//           id={id}
//           register={register}
//           error={!!errors[id]}
//           helperText={errors[id]?.message}
//         />
//         {/* {errors[id] && (
//                 <span style={{ color: "red" }}>{errors[id].message}</span>
//             )} */}
//       </div>
//     );
// };

// export default Category;

// interface SelectCompProps {
//     options: {
//         id: number;
//         name: string;
//     }[];
//     label: string;
//     value: string;
//     setValue: (value: string) => void;
//     id: string;
//     register: any;
//     error: boolean;
//     helperText: string;
// }

// const SelectInput = forwardRef<HTMLInputElement, SelectCompProps>(
//     ({ value, setValue, label, options, id, register, error, helperText }, ref) => {
//         const mainColor = "#006233";

//         return (
//           <FormControl fullWidth>
//             <InputLabel
//               sx={{
//                 color: "grey",
//                 "&.Mui-focused": {
//                   color: mainColor,
//                 },
//               }}
//               id="carrosserie-label"
//             >
//               {label}
//             </InputLabel>
//             <Select
//               id={id}
//               inputRef={ref}
//               variant="outlined"
//               fullWidth
//               error={error}
//             //   helperText={helperText}
//               {...register(id, {
//                 required: "Ce champ est obligatoire",
//                 onChange: (e: any) => setValue(e.target.value),
//               })}
//               sx={{
//                 borderRadius: 2,
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: mainColor,
//                 },
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "grey",
//                 },
//                 "&.Mui-focused .MuiInputLabel-root": {
//                   color: mainColor,
//                 },
//                 "& .MuiSelect-select": {
//                   color: "black",
//                 },
//               }}
//               labelId="carrosserie-label"
//               value={value}
//               label="Carrosserie"
//               //   onChange={(e) => setValue(e.target.value)}
//               MenuProps={{
//                 PaperProps: {
//                   style: {
//                     maxHeight: 200,
//                     overflow: "auto",
//                   },
//                 },
//               }}
//             >
//               <MenuItem value="">None</MenuItem>
//               {options.map((option, index) => (
//                 <MenuItem key={index} value={option.name}>
//                   {option.name}
//                 </MenuItem>
//               ))}
//             </Select>
//                 {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
//           </FormControl>
//         );
//     }
// );

import Label from "../../../ui/Label";
import SelectInput from "../../../ui/inputs/SelectInput";
import { Controller } from "react-hook-form";



interface DesignationProps {
  register: any;
  control: any;
    errors: any;
    id: string;
    setValue: (value: string) => void;
    value: string;
    clearErrors: (name: string) => void;
}

const options_array = [
    { id: 1, name: "option 1" },
    { id: 2, name: "option 2" },
    { id: 3, name: "option 3" },
    { id: 4, name: "option 4" },
];

const Category = ({
    errors,
    id,
  value,
  control,
    setValue,
    clearErrors,
}: DesignationProps) => {
    return (
      <div className="bg-red200 flex flex-col gap-3">
        <Label id={id} text={"Categorie*"} />
        <Controller
          name="category"
          control={control}
          rules={{ required: "ce champ est obligatoire" }}
          render={({ field }) => (
            <SelectInput
              options={options_array}
              label="Nom du client*"
              {...field}
              error={!!errors.category}
              helperText={errors.category?.message}
              value={value}
              setValue={(value: string) => {
                setValue(value);
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
