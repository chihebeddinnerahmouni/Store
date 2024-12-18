import TextField from "@mui/material/TextField";
import { forwardRef } from "react";
import Label from "../Label";

interface DesignationProps {
//   register: any;
//   errors: any;
  id: string;
  setDesignation: (value: string) => void;
  designation: string;
}

const Designation = ({
//   register,
//   errors,
  id,
  designation,
  setDesignation,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      {/* <label htmlFor={id}>Désignation*:</label> */}
      <Label id={id} text="Désignation*" />
      <InputText
        value={designation}
        setValue={setDesignation}
        label="Entrez le nom du produit"
        id={id}
        // {...register(id, { required: "Ce champ est obligatoire" })}
      />
      {/* {errors.productName && (
        <span style={{ color: "red" }}>{errors.productName.message}</span>
      )} */}
    </div>
  );
};

export default Designation;

interface InputTextProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  id: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ value, setValue, label, id }, ref) => {
    const mainColor = "#006233";

    return (
      <TextField
        inputRef={ref}
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        fullWidth
        id={id}
        sx={{
          // Set the color of the text to white
          "& input": {
            color: "black",
          },
          // When the label is focused, change its color to mainColor
          "& label.Mui-focused": {
            color: mainColor,
          },
          // Set the default color of the label to mainColor
          "& label": {
            color: "grey",
          },
          // When the input is focused and underlined, change the bottom border color to mainColor
          "& .MuiInput-underline:after": {
            borderBottomColor: mainColor,
          },
          // Target the outlined variant of the input
          "& .MuiOutlinedInput-root": {
            // Set the default border color of the fieldset to mainColor
            "& fieldset": {
              borderColor: "grey",
            },
            // When the input is hovered, change the border color of the fieldset to mainColor
            "&:hover fieldset": {
              borderColor: mainColor,
            },
            // When the input is focused, change the border color of the fieldset to mainColor
            "&.Mui-focused fieldset": {
              borderColor: mainColor,
              },
          },
        }}
      />
    );
  }
);
