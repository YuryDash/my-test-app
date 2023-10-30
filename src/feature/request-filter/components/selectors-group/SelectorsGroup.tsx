import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { COLORS } from "common/colors/colors";
import { useAppDispatch } from "app/store";
import { setDataFiltersAC } from "feature/main/module/data-reducer";
import { Period, TypeDoc } from "feature/main/module/data-types";

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
    const selectValue = parseInt(event.target.value);
    if (selectValue <= 6) {
      dispatch(setDataFiltersAC({ documentDirection: selectValue }));
    }
    if (selectValue >= 7) {
      dispatch(setDataFiltersAC({ documentType: selectValue }));
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
            <MenuItem value={Period.PERIOD_ALL}>Все</MenuItem>
            <MenuItem value={Period.PERIOD_MONTH}>Месяц</MenuItem>
            <MenuItem value={Period.PERIOD_Q1}>Первый квартал</MenuItem>
            <MenuItem value={Period.PERIOD_Q2}>Второй квартал</MenuItem>
            <MenuItem value={Period.PERIOD_Q3}>Третий квартал</MenuItem>
            <MenuItem value={Period.PERIOD_Q4}>Четвертый квартал</MenuItem>
            <MenuItem value={Period.PERIOD_YEAR}>Год</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>Тип документа</div>
        <FormControl>
          <Select
            sx={styles}
            defaultValue={"9"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChangeSelectors}
          >
            <MenuItem value={TypeDoc.all}>Все</MenuItem>
            <MenuItem value={TypeDoc.outgoing}>Входящий</MenuItem>
            <MenuItem value={TypeDoc.incoming}>Исходящий</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
