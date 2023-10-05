import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { COLORS } from "common/colors/colors";

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

  const [targetValue, setTargetValue] = React.useState("10");
  const handleChange = (event: SelectChangeEvent) => {
    setTargetValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>Налоговый период</div>
        <FormControl>
          <Select
            sx={styles}
            defaultValue={"10"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={targetValue}
            onChange={handleChange}
          >
            <MenuItem value={10}>Месяц</MenuItem>
            <MenuItem value={20}>Неделя</MenuItem>
            <MenuItem value={30}>День</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>Тип документа</div>
        <FormControl>
          <Select
            sx={styles}
            defaultValue={"10"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={targetValue}
            onChange={handleChange}
          >
            <MenuItem value={10}>входящий</MenuItem>
            <MenuItem value={20}>исходящий</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
