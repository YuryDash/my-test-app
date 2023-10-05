import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { COLORS } from "common/colors/colors";
import { FC } from "react";

type Props = {
  title: string;
  names: { first: string; second: string; third: string };
  colors: { color: string; backColor: string };
};

export const ButtonsGroup: FC<Props> = ({ names, colors, title }) => {
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
        <Button sx={styles} variant="outlined">
          {names.first}
        </Button>
        <Button sx={styles} variant="outlined">
          {names.second}
        </Button>
        <Button sx={styles} variant="outlined">
          {names.third}
        </Button>
      </Stack>
    </div>
  );
};
