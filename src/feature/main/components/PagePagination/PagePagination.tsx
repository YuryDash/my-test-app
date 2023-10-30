import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { COLORS } from "common/colors/colors";

export function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? (
          <LastPageIcon sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        ) : (
          <FirstPageIcon sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        )}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        ) : (
          <KeyboardArrowLeft sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        )}
      </IconButton>

      <div
        style={{
          display: "flex",
          width: "36px",
          height: "36px",
          backgroundColor: COLORS.ORANGE,
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {page + 1}
      </div>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        ) : (
          <KeyboardArrowRight sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <FirstPageIcon sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        ) : (
          <LastPageIcon sx={{ border: "1px solid", borderRadius: "50%", padding: "5px" }} />
        )}
      </IconButton>
    </Box>
  );
}
