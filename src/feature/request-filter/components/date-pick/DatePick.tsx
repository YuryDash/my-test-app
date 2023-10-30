import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, TextField, TextFieldProps } from "@mui/material";
import { COLORS } from "common/colors/colors";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "app/store";
import { setDataFiltersAC } from "feature/main/module/data-reducer";

export const DatePick = () => {
  const startDate = useSelector<AppRootState, string>((state) => state.dataArchive.filters.dateFrom);
  const endDate = useSelector<AppRootState, string>((state) => state.dataArchive.filters.dateTo);
  const dispatch = useAppDispatch();

  const [startValue, setStartValue] = React.useState<Dayjs | null>(dayjs(startDate));
  const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs(endDate, "DD.MM.YYYY").startOf("day"));

  React.useEffect(() => {
    setStartValue(dayjs(startDate, "DD.MM.YYYY"));
  }, [startDate]);

  React.useEffect(() => {
    setEndValue(dayjs(endDate, "DD.MM.YYYY").startOf("day"));
  }, [endDate]);

  const CustomTextField = (props: TextFieldProps) => {
    return <TextField {...props} size="small" />;
  };

  const onChangeStartDateValue = (newValue: Dayjs | null) => {
    setStartValue(newValue);
    dispatch(setDataFiltersAC({ dateFrom: dayjs(newValue).format("DD.MM.YYYY") }));
  };
  const onChangeEndDateValue = (newValue: Dayjs | null) => {
    setEndValue(newValue);
    dispatch(setDataFiltersAC({ dateTo: dayjs(newValue).format("DD.MM.YYYY") }));
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
          onChange={onChangeStartDateValue}
        />

        <DatePicker
          format="DD.MM.YYYY"
          sx={{ width: "155px" }}
          slots={{ textField: CustomTextField }}
          label="по"
          value={endValue}
          onChange={onChangeEndDateValue}
        />
      </Grid>
    </LocalizationProvider>
  );
};
