// import TextField from "@mui/material/TextField";
// import { forwardRef } from "react";
// import Label from "../../../ui/Label";
// import { FormHelperText } from "@mui/material";

// interface DesignationProps {
//   clearErrors: any;
//   register: any;
//   errors: any;
//   id: string;
//   setValue: (value: string) => void;
//   value: string;
// }

// const Tax = ({
//   clearErrors,
//   register,
//   errors,
//   id,
//   value,
//   setValue,
// }: DesignationProps) => {
//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={id} text="Taxe de commande (%)*" />
//       <InputText
//         value={value}
//         setValue={(val: string) => {
//           setValue(val);
//           clearErrors(id);
//         }}
//         label="Entrez la taxe de commande (%)"
//         id={id}
//         register={register}
//         error={!!errors[id]}
//         helperText={errors[id]?.message}
//       />
//     </div>
//   );
// };

// interface InputTextProps {
//   value: string;
//   setValue: (value: string) => void;
//   label: string;
//   id: string;
//   register: any;
//   error: boolean;
//   helperText: string;
// }

// const InputText = forwardRef<HTMLInputElement, InputTextProps>(
//   ({ value, setValue, label, id, register, error, helperText }, ref) => {
//     const mainColor = "#006233";

//     return (
//       <div>
//         <TextField
//           inputRef={ref}
//           label={label}
//                 value={value}
//                 type="number"
//           onChange={(e) => setValue(e.target.value)}
//           variant="outlined"
//           fullWidth
//           id={id}
//           error={error}
//           // helperText={helperText}
//           {...register(id, {
//             required: "Ce champ est obligatoire",
//             onChange: (e: any) => setValue(e.target.value),
//           })}
//           sx={{
//             // Set the color of the text to black
//             "& input": {
//               color: "black",
//             },
//             // When the label is focused, change its color to mainColor
//             "& label.Mui-focused": {
//               color: mainColor,
//             },
//             // Set the default color of the label to grey
//             "& label": {
//               color: "grey",
//             },
//             // When the input is focused and underlined, change the bottom border color to mainColor
//             "& .MuiInput-underline:after": {
//               borderBottomColor: mainColor,
//             },
//             // Target the outlined variant of the input
//             "& .MuiOutlinedInput-root": {
//               // Set the default border color of the fieldset to grey
//               "& fieldset": {
//                 borderColor: "grey",
//               },
//               // When the input is hovered, change the border color of the fieldset to mainColor
//               "&:hover fieldset": {
//                 borderColor: mainColor,
//               },
//               // When the input is focused, change the border color of the fieldset to mainColor
//               "&.Mui-focused fieldset": {
//                 borderColor: mainColor,
//               },
//             },
//           }}
//         />
//         <FormHelperText error={error}>{helperText}</FormHelperText>
//       </div>
//     );
//   }
// );

// export default Tax;


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

const Tax = ({
  control,
  clearErrors,
  errors,
  id,
  value,
  setValue,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Taxe de commande (%)*" />

      <Controller
        name="tax"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <InputNumber
            label="Entrez la taxe de commande (%)"
            {...field}
            error={!!errors.tax}
            helperText={errors.tax?.message}
            value={value}
            setValue={(value: string) => {
              setValue(value);
              field.onChange(value);
              if (errors.tax) {
                clearErrors("tax");
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default Tax;


