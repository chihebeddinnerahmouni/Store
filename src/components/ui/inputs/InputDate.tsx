import { forwardRef } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
}

const InputDate = forwardRef<HTMLInputElement, Props>(({ value, setValue, label, error, helperText }, ref) => {
  const mainColor = "#006233";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        // error={error}
        // helperText={helperText}
        value={value ? dayjs(value) : null}
        minDate={dayjs()}
        // onChange={(date) => setValue(date ? date.toISOString() : "")}
        onChange={(date) =>
          setValue(date ? dayjs(date).format("YYYY-MM-DD") : "")
        }
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
            error: error, // Use error state here
            helperText: helperText, // Use helper text for the error message
            inputRef: ref,
          },
        }}
      />
    </LocalizationProvider>
  );
});

export default InputDate;