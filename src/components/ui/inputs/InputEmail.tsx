import TextField from "@mui/material/TextField";

interface InputTextProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
}

const InputEmail = ({ value, setValue, label, error, helperText }: InputTextProps) => {
  const mainColor = "#006233";


  return (
    <TextField
      label={label}
      error={error}
      helperText={helperText}
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      fullWidth
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
};

export default InputEmail;
