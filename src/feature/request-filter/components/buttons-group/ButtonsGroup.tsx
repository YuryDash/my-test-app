import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { COLORS } from "common/colors/colors";
import { FC } from "react";

type ButtonValues = {
  param1: string
  param2: string
  param3: string
}

type Props = {
  title: string;
  names: { first: string; second: string; third: string };
  colors: { color: string; backColor: string };
  callback: (param: string) => void;
  buttonValue: ButtonValues;
};

export const ButtonsGroup: FC<Props> = ({ names, colors, title, callback, buttonValue }) => {
  const styles = {
    fontFamily: "Arial",
    color: colors.color,
    border: `2px solid ${colors.color}`,
    borderRadius: "6px",
    padding: "0px 10px",
    height: "30px",
    textTransform: "none",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: colors.backColor,
      border: `2px solid ${colors.color}`,
    },
  };

  return (
    <div>
      <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>{title}</div>
      <Stack spacing={1} direction="row">
        <Button onClick={() => callback(buttonValue.param1)} sx={styles} variant="outlined">
          {names.first}
        </Button>
        <Button  onClick={() => callback(buttonValue.param2)} sx={styles} variant="outlined">
          {names.second}
        </Button>
        <Button  onClick={() => callback(buttonValue.param3)} sx={styles} variant="outlined">
          {names.third}
        </Button>
      </Stack>
    </div>
  );
};
