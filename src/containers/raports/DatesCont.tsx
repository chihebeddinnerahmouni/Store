interface Props {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

export default function DatesCont({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
    return (
      <section className="flex gap-5 mt-7 items-center lg:mt-12">
        <InputDate
          value={startDate}
          setValue={setStartDate}
          label="Date de début"
        /> 
        <span>-</span>
        <InputDate value={endDate} setValue={setEndDate} label="Date de fin" />
      </section>
    );
}


import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface PropsComp {
  value: string;
  setValue: (value: string) => void;
  label: string;
}

const InputDate = ({ value, setValue, label }: PropsComp) => {
  const mainColor = "#006233";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        value={value ? dayjs(value) : null}
        // minDate={dayjs()}
        // maxDate={dayjs()}
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
          },
        }}
      />
    </LocalizationProvider>
  );
};
