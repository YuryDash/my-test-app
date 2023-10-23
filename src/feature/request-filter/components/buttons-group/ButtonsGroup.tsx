import { Theme } from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/system";
import { AppRootState } from "app/store";
import { COLORS } from "common/colors/colors";
import { QuickTransition, Status } from "feature/main/module/data-types";
import { FC } from "react";
import { useSelector } from "react-redux";

type ButtonValues = {
  param1: Status | QuickTransition;
  param2: Status | QuickTransition;
  param3: Status | QuickTransition;
};

type Props = {
  title: string;
  names: { first: string; second: string; third: string };
  colors: { color: string; backColor: string };
  callback: (param: Status | QuickTransition) => void;
  buttonValue: ButtonValues;
};

export const ButtonsGroup: FC<Props> = ({ names, colors, title, callback, buttonValue }) => {
  const filter = useSelector<AppRootState, Status | QuickTransition>((state) => state.dataArchive.filters.keyword);

  const StylesButton: SxProps<Theme> = {
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

  const PickedButton = {
    fontFamily: "Arial",
    color: "white",
    border: `2px solid ${COLORS.ORANGE}`,
    borderRadius: "6px",
    padding: "0px 10px",
    height: "30px",
    textTransform: "none",
    fontWeight: "400",
    backgroundColor: COLORS.ORANGE,
    "&:hover": {
      backgroundColor: COLORS.ORANGE,
      border: `2px solid ${COLORS.ORANGE}`,
    },
  };

  return (
    <div>
      <div style={{ marginBottom: "15px", color: COLORS.GRAY }}>{title}</div>
      <Stack spacing={1} direction="row">
        <Button
          onClick={() => callback(buttonValue.param1)}
          sx={filter !== buttonValue.param1 ? StylesButton : PickedButton}
        >
          {names.first}
        </Button>
        <Button
          onClick={() => callback(buttonValue.param2)}
          sx={filter !== buttonValue.param2 ? StylesButton : PickedButton}
        >
          {names.second}
        </Button>
        <Button
          onClick={() => callback(buttonValue.param3)}
          sx={filter !== buttonValue.param3 ? StylesButton : PickedButton}
        >
          {names.third}
        </Button>
      </Stack>
    </div>
  );
};
