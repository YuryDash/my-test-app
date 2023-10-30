import TablePagination from "@material-ui/core/TablePagination";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { AppRootState } from "app/store";
import dayjs from "dayjs";
import { AddNewArchiveRequest } from "feature/main/components/AddNewArchiveRequest/UI/AddNewArchiveRequest";
import { TablePaginationActions } from "feature/main/components/PagePagination/PagePagination";
import * as React from "react";
import { useSelector } from "react-redux";
import { EnhancedTableHead } from "../components/EnhancedTableHead/EnhancedTableHead";
import { DataArchive, DataArchiveFilters, Period, Status, TypeDoc } from "../module/data-types";
import { dateFormat } from "../module/data-reducer";

function descendingComparator<T extends { date: string | number }>(a: T, b: T) {
  const dateFormat = "DD.MM.YYYY";
  return dayjs(b.date, dateFormat).diff(dayjs(a.date, dateFormat));
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
  const filterValues = useSelector<AppRootState, DataArchiveFilters>((state) => state.dataArchive.filters);

  const periodValues = {
    0: "forTypeValue",
    1: "Месяц",
    2: "Q1",
    3: "Q2",
    4: "Q3",
    5: "Q4",
    6: "Год",
  };

  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  let filteredRows = rows;

  if (filterValues.documentDirection === Period.PERIOD_MONTH) {
    filteredRows = rows.filter((el) => el.taxPeriodType === Period.PERIOD_MONTH);
  } else if (filterValues.documentDirection === Period.PERIOD_Q1) {
    filteredRows = rows.filter((el) => el.taxPeriodType === Period.PERIOD_Q1);
  } else if (filterValues.documentDirection === Period.PERIOD_Q2) {
    filteredRows = rows.filter((el) => el.taxPeriodType === Period.PERIOD_Q2);
  } else if (filterValues.documentDirection === Period.PERIOD_Q3) {
    filteredRows = rows.filter((el) => el.taxPeriodType === Period.PERIOD_Q3);
  } else if (filterValues.documentDirection === Period.PERIOD_Q4) {
    filteredRows = rows.filter((el) => el.taxPeriodType === Period.PERIOD_Q4);
  } else if (filterValues.documentDirection === Period.PERIOD_YEAR) {
    filteredRows = rows.filter((el) => el.taxPeriodType === Period.PERIOD_YEAR);
  } else {
    filteredRows = rows;
  }

  if (filterValues.documentType === TypeDoc.incoming) {
    debugger;
    filteredRows = rows.filter((el) => el.documentType !== TypeDoc.incoming);
  } else if (filterValues.documentType === TypeDoc.outgoing) {
    debugger;
    filteredRows = rows.filter((el) => el.documentType !== TypeDoc.outgoing);
  } else {
    filteredRows = filteredRows;
  }

  if (filterValues.keyword !== Status.ALL) {
    filteredRows = rows.filter((el) => el.processingStatus === filterValues.keyword);
  }

  if (filterValues.dateFrom && filterValues.dateTo && filterValues.keyword >= 5) {
    const startDate = dayjs(filterValues.dateFrom, dateFormat).startOf("day");
    const endDate = dayjs(filterValues.dateTo, dateFormat).endOf("day");

    if (startDate.isSame(endDate, "day")) {
      filteredRows = rows.filter((el) => {
        const rowDate = dayjs(el.date, dateFormat);
        return rowDate.isSame(startDate, "day");
      });
    } else {
      filteredRows = rows.filter((el) => {
        const rowDate = dayjs(el.date, dateFormat);
        const isSameAsStartDate = rowDate.diff(startDate, "day") === 0;
        const isAfterStartDate = rowDate.isAfter(startDate, "day");
        const isBeforeEndDate = rowDate.isBefore(endDate, "day");
        return isSameAsStartDate || (isAfterStartDate && isBeforeEndDate);
      });
    }
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = 0;
  const visibleRows = stableSort(filteredRows, getComparator(order)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const displayRowsLabel = () => {
    return "";
  };

  return (
    <Box sx={{ width: "98%", padding: "1% 1%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              orderBy="date"
              order={order}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row: DataArchive) => {
                let lol =
                  row.processingStatus === Status.processed ? (
                    <DoneIcon color="success" />
                  ) : row.processingStatus === Status.unprocessed ? (
                    <CloseIcon color="error" />
                  ) : row.processingStatus === Status.in_process ? (
                    <CachedIcon color="info" />
                  ) : null;

                return (
                  <TableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                    <TableCell component="th" scope="row" padding="normal">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{lol}</TableCell>
                    <TableCell align="right">№ {row.originalDocumentNumber}</TableCell>
                    <TableCell align="right">{row.documentType === 8 ? "входящий" : "исходящий"}</TableCell>
                    <TableCell align="right">{periodValues[row.taxPeriodType]}</TableCell>
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
