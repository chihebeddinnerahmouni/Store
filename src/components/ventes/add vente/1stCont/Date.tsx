// import { forwardRef } from "react";
// import Label from "../../../ui/Label";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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
//       <Label id={id} text="Date*" />
//       <InputDate
//         value={value}
//         setValue={(val: string) => {
//           setValue(val);
//           clearErrors(id);
//         }}
//         label="Entrez la date"
//         id={id}
//         register={register}
//         error={!!errors[id]}
//         helperText={errors[id]?.message}
//       />
//     </div>
//   );
// };

// interface InputDateProps {
//   value: string;
//   setValue: (value: string) => void;
//   label: string;
//   id: string;
//   register: any;
//   error: boolean;
//   helperText: string;
// }

// const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
//   ({ value, setValue, label, id, register, error, helperText }, ref) => {
//     const mainColor = "#006233";

//     return (
//       <div>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DesktopDatePicker
//             inputRef={ref}
//             label={label}
//             value={value ? dayjs(value) : null}
//             onChange={(date) => setValue(date ? date.toISOString() : "")}
//             slotProps={{
//               textField: {
//                 fullWidth: true,
//                 error: error,
//                 helperText: helperText,
//                 ...register(id, {
//                   required: "Ce champ est obligatoire",
//                   validate: (value: string) =>
//                     value ? true : "Veuillez sélectionner une date valide",
//                 }),
//                 sx: {
//                   "& input": {
//                     color: "black",
//                   },
//                   "& label.Mui-focused": {
//                     color: mainColor,
//                   },
//                   "& label": {
//                     color: "grey",
//                   },
//                   "& .MuiInput-underline:after": {
//                     borderBottomColor: mainColor,
//                   },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "grey",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: mainColor,
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: mainColor,
//                     },
//                   },
//                 },
//               },
//             }}
//           />
//         </LocalizationProvider>
//       </div>
//     );
//   }
// );

// export default Date;
import Label from "../../../ui/Label";
import InputDate from "../../../ui/inputs/InputDate";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
}

const Date = ({
  control,
  clearErrors,
  errors,
  id,
  value,
  setValue,
}: Props) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Date*" />
      <Controller
        name="date"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <InputDate
            value={value}
            label="Entrez la date"
            error={!!errors.date}
            helperText={errors.date?.message}
            setValue={(value: string) => {
              setValue(value);
              field.onChange(value);
              if (errors.date) {
                clearErrors("date");
              }
            }}
          />
        )}
      />

    </div>
  );
};

export default Date;
