import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


interface Props {
    value: string;
    setValue: (value: string) => void;
    label: string;
}


const InputDate = ({ value, setValue, label }: Props) => {
    
        const mainColor = "#006233";

    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={(date) => setValue(date ? date.toISOString() : "")}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
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
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
