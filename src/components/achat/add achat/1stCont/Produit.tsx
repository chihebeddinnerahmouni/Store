import TextField from "@mui/material/TextField";
import Label from "../../../ui/Label";
import { Autocomplete, Paper } from "@mui/material";
import { useState } from "react";

interface DesignationProps {
    clearErrors: any;
    register: any;
    errors: any;
    id: string;
    setValue: (value: string) => void;
    value: string;
}

const Produit = ({
    clearErrors,
    register,
    errors,
    id,
    value,
    setValue,
}: DesignationProps) => {
    const suggestions = [
        "Laptop",
        "Desktop",
        "Mouse",
        "Keyboard",
        "Monitor",
    ];

    return (
        <div className="bg-red200 flex flex-col gap-3">
            <Label id={id} text="Produit" />
            <InputAutocomplete
                value={value}
                setValue={(val: string) => {
                    setValue(val);
                    clearErrors(id);
                }}
                label="Entrez le nom/code du produit"
                id={id}
                register={register}
                error={!!errors[id]}
                helperText={errors[id]?.message}
                suggestions={suggestions}
            />
        </div>
    );
};

interface InputAutocompleteProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
    id: string;
    register: any;
    error: boolean;
    helperText: string;
    suggestions: string[];
}

const InputAutocomplete = ({
    value,
    setValue,
    label,
    id,
    register,
    error,
    helperText,
    suggestions,
}: InputAutocompleteProps) => {
    const mainColor = "#006233";
    const [inputValue, setInputValue] = useState(value);

    return (
      <div>
        <Autocomplete
          freeSolo
          options={suggestions}
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue || "");
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
            setValue(newInputValue);
          }}
          slots={{
            paper: (props) => (
              <Paper {...props} sx={{ height: "200px", overflowY: "scroll" }} />
            ),
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              id={id}
              error={error}
              helperText={helperText}
              {...register(id, {
                required: "Ce champ est obligatoire",
                onChange: (e: any) => setValue(e.target.value),
              })}
              sx={{
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
              }}
            />
          )}
        />
        {/* <FormHelperText error={error}>{helperText}</FormHelperText> */}
      </div>
    );
};

export default Produit;