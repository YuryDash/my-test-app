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

  const dispatch = useAppDispatch();

  const handleChangeSelectors = (event: SelectChangeEvent) => {
    const selectValue = event.target.value
    if(+selectValue < 6){
      dispatch(setDataFiltersAC({documentDirection: selectValue.toString()}));
    } else {
      dispatch(setDataFiltersAC({documentType: selectValue.toString()}));
    }
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
            onChange={handleChangeSelectors}
          >
            <MenuItem value={0}>Месяц</MenuItem>
            <MenuItem value={1}>Первый квартал</MenuItem>
            <MenuItem value={2}>Второй квартал</MenuItem>
            <MenuItem value={3}>Третий квартал</MenuItem>
            <MenuItem value={4}>Четвертый квартал</MenuItem>
            <MenuItem value={5}>Год</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>Тип документа</div>
        <FormControl>
          <Select
            sx={styles}
            defaultValue={"6"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChangeSelectors}
          >
            <MenuItem value={6}>Входящий</MenuItem>
            <MenuItem value={7}>Исходящий</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
