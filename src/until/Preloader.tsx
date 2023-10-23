import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
export function Preloader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress variant="indeterminate" size={200} thickness={5} value={100} />
    </Box>
  );
}
