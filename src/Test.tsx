import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function ResponsiveDatePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem label="Desktop variant">
          <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
        </DemoItem>
    </LocalizationProvider>
  );
}
