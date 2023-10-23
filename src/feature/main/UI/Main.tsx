import TablePagination from "@material-ui/core/TablePagination";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { AppRootState, useAppDispatch } from "app/store";
import { AddNewArchiveRequest } from "feature/main/AddNewArchiveRequest/UI/AddNewArchiveRequest";
import { TablePaginationActions } from "feature/main/PagePagination/PagePagination";
import * as React from "react";
import { useSelector } from "react-redux";
import { EnhancedTableHead } from "../EnhancedTableHead/EnhancedTableHead";
import { DataArchive, DataArchiveFilters, QuickTransition, Status } from "../module/data-types";
import CachedIcon from "@mui/icons-material/Cached";
import dayjs from "dayjs";
import { setDataFiltersAC } from "../module/data-reducer";

function descendingComparator<T extends { date: string | number }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export type Order = "asc" | "desc";

function getComparator<T extends { date: string | number }>(order: Order) {
  return order === "desc" ? descendingComparator<T> : (a: T, b: T) => -descendingComparator<T>(a, b);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const Main = () => {
  const [order, setOrder] = React.useState<Order>("desc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector<AppRootState, DataArchive[]>((state) => state.dataArchive.list);
  const testValue = useSelector<AppRootState, DataArchiveFilters>((state) => state.dataArchive.filters);


  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  let filteredRows = rows;
  if (testValue.keyword !== Status.ALL) {
    filteredRows = rows.filter((el) => el.processingStatus === testValue.keyword);
  }
//=====================================================================================================
const today = dayjs();
const dateFormat = 'DD.MM.YYYY';

if (testValue.keyword !== Status.ALL && testValue.keyword >= 5) {
  switch (testValue.keyword) {
    case QuickTransition.NOW:
      const currentDate = today.startOf('day');
      filteredRows = rows.filter((el) => {
        const rowDate = dayjs(el.date, dateFormat);
        return rowDate.isSame(currentDate, 'day');
      });
      break;

    case QuickTransition.WEEK:
      const weekStart = today.startOf('week');
      const weekEnd = today.endOf('week');
      filteredRows = rows.filter((el) => {
        const rowDate = dayjs(el.date, dateFormat);
        return rowDate.isAfter(weekStart) && rowDate.isBefore(weekEnd);
      });
      break;

    case QuickTransition.MONTH:
      const monthStart = today.startOf('month');
      const monthEnd = today.endOf('month');
      filteredRows = rows.filter((el) => {
        const rowDate = dayjs(el.date, dateFormat);
        return rowDate.isAfter(monthStart) && rowDate.isBefore(monthEnd);
      });
      break;

    default:
      filteredRows = rows;
      break;
  }
}
//=====================================================================================================

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = 0;
  const visibleRows = stableSort(filteredRows, getComparator(order)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const displayRowsLabel = () => {
    return "";
  };

  return (
    <Box sx={{ width: "98%", padding: "1% 1%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead orderBy="date" order={order} onRequestSort={handleRequestSort} rowCount={filteredRows.length} />
            <TableBody>
              {visibleRows.map((row) => {
                let lol =
                  row.processingStatus === Status.processed ? (
                    <DoneIcon color="success" />
                  ) : row.processingStatus === Status.unprocessed ? (
                    <CloseIcon color="error" />
                  ) : row.processingStatus === Status.in_process ? (
                    <CachedIcon color="info" />
                  ) : null;

                return (
                  <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: "pointer" }}>
                    <TableCell component="th" scope="row" padding="normal">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{lol}</TableCell>
                    <TableCell align="right">№ {row.originalDocumentNumber}</TableCell>
                    <TableCell align="right">{row.documentType ? "входящий" : "исходящий"}</TableCell>
                    <TableCell align="right">{row.taxPeriodType}</TableCell>
                    <TableCell align="right">{row.organizationName}</TableCell>
                  </TableRow>
                );
              })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelDisplayedRows={displayRowsLabel}
          labelRowsPerPage={"Показывать:"}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
      <div style={{ marginTop: "50px", display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <AddNewArchiveRequest />
      </div>
    </Box>
  );
};
