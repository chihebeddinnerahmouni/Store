// import TextField from "@mui/material/TextField";
// import { forwardRef } from "react";
// import Label from "../../../ui/Label";
// import { FormHelperText } from "@mui/material";

// interface Props {
//   clearErrors: any;
//   register: any;
//   errors: any;
//   id: string;
//   setValue: (value: string) => void;
//   value: string;
// }

// const Date = ({
//   clearErrors,
//   register,
//   errors,
//   id,
//   value,
//   setValue,
// }: Props) => {
//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={id} text="Désignation*" />
//       <InputText
//         value={value}
//         setValue={(val: string) => {
//           setValue(val);
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

// export default Date;

import { forwardRef } from "react";
import Label from "../../../ui/Label";
// import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface Props {
  clearErrors: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
}

const Date = ({
  clearErrors,
  register,
  errors,
  id,
  value,
  setValue,
}: Props) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Date*" />
      <InputDate
        value={value}
        setValue={(val: string) => {
          setValue(val);
          clearErrors(id);
        }}
        label="Entrez la date"
        id={id}
        register={register}
        error={!!errors[id]}
        helperText={errors[id]?.message}
      />
    </div>
  );
};

interface InputDateProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  id: string;
  register: any;
  error: boolean;
  helperText: string;
}

const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  ({ value, setValue, label, id, register, error, helperText }, ref) => {
    const mainColor = "#006233";

    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputRef={ref}
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(date) => setValue(date ? date.toISOString() : "")}
            slotProps={{
              textField: {
                fullWidth: true,
                error: error,
                helperText: helperText,
                ...register(id, {
                  required: "Ce champ est obligatoire",
                  validate: (value: string) =>
                    value ? true : "Veuillez sélectionner une date valide",
                }),
                sx: {
                  "& input": {
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: mainColor,
                  },
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: mainColor,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: mainColor,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: mainColor,
                    },
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        {/* <FormHelperText error={error}>{helperText}</FormHelperText> */}
      </div>
    );
  }
);

export default Date;
