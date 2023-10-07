import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import { COLORS } from "common/colors/colors"
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

export const AddFile = () => {
  return (
    <Grid container alignItems="center" p={5}>
    <Grid item xs={1} fontWeight={600} color={COLORS.GRAY}>
      10 файлов
    </Grid>
    <Grid item xs={1}>
      <IconButton>
        <VerticalAlignBottomIcon />
      </IconButton>
    </Grid>
    <Grid xs={9} width={100} sx={{ height: "2px", backgroundColor: COLORS.LIGHT_GRAY }}></Grid>
  </Grid>
  )
}  