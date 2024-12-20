import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

interface SelectCompProps {
  options: {
    id: number;
    name: string;
  }[];
  label: string;
  value: string;
  setValue: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

const SelectInput = ({
  value,
  setValue,
  options,
  label,
  error,
  helperText,
}: SelectCompProps) => {
  const mainColor = "#006233";

  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <InputLabel
        sx={{
          color: "grey",
          "&.Mui-focused": {
            color: mainColor,
          },
        }}
        id="carrosserie-label"
      >
        {label}
      </InputLabel>
      <Select
        sx={{
          borderRadius: 2,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: mainColor,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey",
          },
          "&.Mui-focused .MuiInputLabel-root": {
            color: mainColor,
          },
          "& .MuiSelect-select": {
            color: "black",
          },
        }}
        labelId={label}
        value={value}
        label={label}
        error={error}
        // helperText={helperText}
        onChange={(e) => setValue(e.target.value)}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflow: "auto",
            },
          },
        }}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
