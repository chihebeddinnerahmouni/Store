import TextField from "@mui/material/TextField";
import { forwardRef } from "react";
import { FormHelperText } from "@mui/material";

interface InputTextProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  id: string;
  // register: any;
  error: boolean | undefined;
  helperText: string | undefined | false;
}

const MultiLine = forwardRef<HTMLInputElement, InputTextProps>(
  ({ value, setValue, label, id, error, helperText }, ref) => {
    const mainColor = "#006233";

    return (
      <div>
        <TextField
          inputRef={ref}
          label={label}
          value={value}
          multiline
          rows={6}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          fullWidth
          id={id}
          error={error}
          sx={{
            // Set the color of the text to black
            "& input": {
              color: "black",
            },
            // When the label is focused, change its color to mainColor
            "& label.Mui-focused": {
              color: mainColor,
            },
            // Set the default color of the label to grey
            "& label": {
              color: "grey",
            },
            // When the input is focused and underlined, change the bottom border color to mainColor
            "& .MuiInput-underline:after": {
              borderBottomColor: mainColor,
            },
            // Target the outlined variant of the input
            "& .MuiOutlinedInput-root": {
              // Set the default border color of the fieldset to grey
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
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </div>
    );
  }
);


export default MultiLine;