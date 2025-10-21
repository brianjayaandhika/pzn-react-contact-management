import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { Dayjs } from "dayjs";

export default function BasicDateTimePicker({
  text,
  setDue,
  value,
  onOpen,
  onClose,
}: {
  text: string;
  setDue: (newValue: PickerValue) => void;
  value: Dayjs;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DemoContainer components={["DateTimePicker"]}>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <label className="text-sm">{text}</label>
          <DateTimePicker
            onOpen={onOpen}
            onClose={onClose}
            format="YYYY/MM/DD hh:mm:ss"
            views={["year", "month", "day", "hours", "minutes", "seconds"]}
            ampm={false}
            disablePast
            value={value}
            onChange={(newValue: PickerValue) => setDue(newValue)}
            sx={{
              ".MuiPickersOutlinedInput-root": {
                color: "white",
                border: "1px solid #4a5565",
                fontSize: "0.875rem",
              },
              ".MuiIconButton-root": {
                color: "white",
              },
            }}
            className="w-full h-full outline-none bg-gray-700/50 focus-within:border-blue-400 border border-gray-600 rounded-xl text-gray text-white"
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
