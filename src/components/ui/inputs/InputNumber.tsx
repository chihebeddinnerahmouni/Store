import TextField from "@mui/material/TextField";

interface InputNumberProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
}

const InputNumber = ({ value, setValue, label }: InputNumberProps) => {
  const mainColor = "#EEDC6D";


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (/^\d*\.?\d*$/.test(newValue)) {
        setValue(newValue);
      }
    };

  return (
    <TextField
      label={label}
      value={value}
      
          type="number"
      onChange={handleChange}
      variant="outlined"
      fullWidth
      sx={{
        // Set the color of the text to white
        "& input": {
          color: "white",
        },
        // When the label is focused, change its color to mainColor
        "& label.Mui-focused": {
          color: mainColor,
        },
        // Set the default color of the label to mainColor
        "& label": {
          color: "white",
        },
        // When the input is focused and underlined, change the bottom border color to mainColor
        "& .MuiInput-underline:after": {
          borderBottomColor: mainColor,
        },
        // Target the outlined variant of the input
        "& .MuiOutlinedInput-root": {
          // Set the default border color of the fieldset to mainColor
          "& fieldset": {
            borderColor: "white",
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

export default InputNumber;
