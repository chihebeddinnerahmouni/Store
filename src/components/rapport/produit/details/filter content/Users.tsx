// import SelectInput from "../../../../ui/inputs/SelectInput";
import Label from "../../../../ui/Label";

interface Props {
  usersArray: any[];
  userName: string;
  setUserName: (value: string) => void;
}

const Users = ({ userName, setUserName, usersArray}: Props) => {
  // console.log(usersArray);

  const newOptions = usersArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));
    
  // console.log(newOptions);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Utilisateur"} />
      <SelectInput
        options={newOptions}
        label="Par Utilisateur"
        value={userName}
        id = {"filterProductsFourni"}
        setValue={(value: string) => {
            setUserName(value);
        }}
      />
    </div>
  );
};


export default Users;




import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface SelectCompProps {
  options: {
    id: number;
    name: string;
  }[];
  label: string;
  value: string | undefined;
    setValue: (value: string) => void;
    id: string;
}

const SelectInput = 
  (
    { value, setValue, options, label, id }: SelectCompProps
  ) => {
    // console.log(value);
    const mainColor = "#006233";

    return (
      <FormControl variant="outlined" fullWidth>
        <InputLabel
          sx={{
            color: "grey",
            "&.Mui-focused": {
              color: mainColor,
            },
          }}
          id={id}
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
          labelId={id}
          value={value}
          label={label}
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
          {/* {options.map((option, index) => {
            // console.log(option);
            return (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            );
          })} */}
          <MenuItem value="ana">ana</MenuItem>
        </Select>
      </FormControl>
    );
  }
