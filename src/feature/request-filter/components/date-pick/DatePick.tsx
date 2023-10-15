import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, TextField, TextFieldProps } from "@mui/material";
import { COLORS } from "common/colors/colors";

export const DatePick = () => {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(dayjs(""));
  const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs(""));

  const CustomTextField = (props: TextFieldProps) => {
    return <TextField {...props} size="small" />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ color: COLORS.GRAY }}>Период</div>
      <Grid container gap={2} mt={2}>
        <DatePicker
          format="DD.MM.YYYY"
          sx={{ width: "155px" }}
          slots={{ textField: CustomTextField }}
          label="c"
          value={startValue}
          onChange={(newValue) => setStartValue(newValue)}
        />

        <DatePicker
          format="DD.MM.YYYY"
          sx={{ width: "155px" }}
          slots={{ textField: CustomTextField }}
          label="по"
          value={endValue}
          onChange={(newValue) => setEndValue(newValue)}
        />
      </Grid>
    </LocalizationProvider>
  );
};
