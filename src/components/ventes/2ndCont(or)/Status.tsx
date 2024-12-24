import Label from "../../ui/Label";
import { forwardRef } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface DesignationProps {
  id: string;
  setValue: (value: string) => void;
  value: string;
}

const options_array = [
  { id: 1, name: "recevé" },
  { id: 2, name: "en cours" },
  { id: 3, name: "ordered" },
];

const Status = ({
  id,
  value,
  setValue,
}: DesignationProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text={"Status"} />
      <SelectInput
        value={value}
        setValue={(val: string) => {
          setValue(val);
        }}
        options={options_array}
        label="Choisir"
        id={id}
      />
    </div>
  );
};

interface SelectCompProps {
  options: {
    id: number;
    name: string;
  }[];
  label: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
}

const SelectInput = forwardRef<HTMLInputElement, SelectCompProps>(
  (
    { value, setValue, label, options, id },
    ref
  ) => {
    const mainColor = "#006233";

    return (
      <FormControl fullWidth>
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
          id={id}
          inputRef={ref}
          variant="outlined"
          fullWidth
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
  }
);


export default Status;
