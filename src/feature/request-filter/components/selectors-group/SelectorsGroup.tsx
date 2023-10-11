import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { COLORS } from "common/colors/colors";
import { useAppDispatch } from "app/store";
import { DataArchiveFilters } from "feature/main/module/data-types";
import { setDataFiltersAC } from "feature/main/module/data-reducer";

export const SelectorsGroup = () => {
  const styles = {
    fontFamily: "Arial",
    color: COLORS.GRAY,
    height: "30px",
    width: "150px",
    outline: `1px solid ${COLORS.GRAY}`,
    borderColor: COLORS.GRAY,
    "&:hover": {
      outline: `2px solid ${COLORS.GRAY}`,
    },
  };

  const newFilters: DataArchiveFilters = {
    dateFrom: null,
    dateTo: null,
    keyword: "",
    documentType: "",
    documentDirection: "",
  }


  const dispatch = useAppDispatch();
  const [targetValuePeriod, setTargetValuePeriod] = React.useState("0");
  const [targetValueDuplex, setTargetDuplexValue] = React.useState("3");

  let a = {} as DataArchiveFilters

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setTargetValuePeriod(event.target.value);
    dispatch(setDataFiltersAC(newFilters));
    console.log(event.target.value);
  };

  const handleChangeDuplex = (event: SelectChangeEvent) => {
    setTargetDuplexValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>Налоговый период</div>
        <FormControl>
          <Select
            sx={styles}
            defaultValue={"0"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={targetValuePeriod}
            onChange={handleChangePeriod}
          >
            <MenuItem value={0}>Месяц</MenuItem>
            <MenuItem value={1}>Неделя</MenuItem>
            <MenuItem value={2}>День</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>Тип документа</div>
        <FormControl>
          <Select
            sx={styles}
            defaultValue={"3"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={targetValueDuplex}
            onChange={handleChangeDuplex}
          >
            <MenuItem value={3}>Входящий</MenuItem>
            <MenuItem value={4}>Исходящий</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
