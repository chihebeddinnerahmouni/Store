import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


interface SelectCompProps {
    options: {
        id: number;
        name: string;
    }[];
    label: string;
    value: string;
    setValue: (value: string) => void;
    }

const SelectInput = ({ value, setValue, options, label }: SelectCompProps) => {
  const mainColor = "#EEDC6D";

  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{
          color: "white",
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
            borderColor: "white",
          },
          "&.Mui-focused .MuiInputLabel-root": {
            color: mainColor,
          },
          "& .MuiSelect-select": {
            color: "white",
          },
        }}
        labelId="carrosserie-label"
        value={value}
        label="Carrosserie"
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
    </FormControl>
  );
};

export default SelectInput;
