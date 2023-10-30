import { CSSProperties } from "@material-ui/styles";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { COLORS } from "common/colors/colors";

export const RootButton = styled(Button)(({ theme }) => ({
  width: "200px",
  border: `2px solid ${COLORS.ORANGE}`,
  color: COLORS.ORANGE,
  borderRadius: "8px",
}));

export const newIndicatorStyle: CSSProperties = {
  border: "2px solid #00ff48",
  borderRadius: "4px",
  textAlign: "center",
  color: "#00ff48",
  width: "60px",
};
