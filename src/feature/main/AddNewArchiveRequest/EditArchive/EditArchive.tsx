import Grid from "@mui/material/Grid";
import { RootButton, newIndicatorStyle } from "./style";
import { COLORS } from "common/colors/colors";



export const EditArchive = () => {
  return (
    <Grid p={3} gap={3} container height={50} alignItems="center">
      <Grid item xs={1}>
        <div style={{ ...newIndicatorStyle }}>NEW</div>
      </Grid>
      <Grid fontWeight={600} item xs={1} color={COLORS.GRAY}>
        12.12.2023
      </Grid>

      <Grid item xs={9} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <RootButton>Редактировать</RootButton>
      </Grid>
    </Grid>
  );
};