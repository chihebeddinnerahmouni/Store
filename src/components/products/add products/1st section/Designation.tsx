// import TextField from "@mui/material/TextField";
// import { forwardRef } from "react";
// import Label from "../../../ui/Label";
// import { FormHelperText } from "@mui/material";



// interface DesignationProps {
//   clearErrors: any;
//   register: any;
//   errors: any;
//   id: string;
//   setDesignation: (value: string) => void;
//   designation: string;
// }

// const Designation = ({
//   clearErrors,
//   register,
//   errors,
//   id,
//   designation,
//   setDesignation,
// }: DesignationProps) => {
//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={id} text="Désignation*" />
//       <InputText
//         value={designation}
//         setValue={(val: string) => {
//           setDesignation(val);
//           clearErrors(id);
//         }}
//         label="Entrez le nom du produit"
//         id={id}
//         register={register}
//         error={!!errors[id]}
//         helperText={errors[id]?.message}
//       />
//     </div>
//   );
// };

// export default Designation;

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
//           value={value}
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

import Label from "../../../ui/Label";
import { Controller } from "react-hook-form";
import InputText from "../../../ui/inputs/InputText";



interface DesignationProps {
  control: any;
  clearErrors: any;
  errors: any;
  id: string;
  setDesignation: (value: string) => void;
  designation: string;
}

const Designation = ({
  control,
  clearErrors,
  // register,
  errors,
  id,
  designation,
  setDesignation,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Désignation*" />
      <Controller
        name="name"
        control={control}
        rules={{ required: "Le nom est obligatoire" }}
        render={({ field }) => (
          <InputText
            label="Nom du produit*"
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
            value={designation}
            setValue={(value: string) => {
              setDesignation(value);
              field.onChange(value);
              if (errors.name) {
                clearErrors("name");
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default Designation;

