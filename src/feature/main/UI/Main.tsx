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
import { AddNewArchiveRequest } from "feature/main/AddNewArchiveRequest/UI/AddNewArchiveRequest";
import { TablePaginationActions } from "feature/main/PagePagination/PagePagination";
import * as React from "react";
import { EnhancedTableHead } from "../EnhancedTableHead/EnhancedTableHead";

enum Status {
  unprocessed,
  processed,
  new,
  in_process,
}

enum TypeDoc {
  outgoing,
  incoming,
}

enum Period {
  PERIOD_MONTH = "Месяц",
  PERIOD_Q1 = "Q1",
  PERIOD_Q2 = "Q2",
  PERIOD_Q3 = "Q3",
  PERIOD_Q4 = "Q4",
  PERIOD_YEAR = "Год",
}

export type Data = {
  date: string;
  status: Status;
  docType: TypeDoc;
  num: number;
  period: Period;
  organization: string;
};

function createData(
  date: string,
  status: Status,
  num: number,
  docType: number,
  period: Period,
  organization: string,
): Data {
  return {
    date,
    status,
    num,
    docType,
    period,
    organization,
  };
}

const rows = [
  createData("1/01/2020", 1, 123123123, 1, Period.PERIOD_MONTH, "ИП Иванов И.И."),
  createData("2/02/2020", 2, 123134123, 0, Period.PERIOD_MONTH, "ИП Иванов И.И."),
  createData("3/03/2020", 3, 123123213, 1, Period.PERIOD_Q1, "ИП Иванов И.И."),
  createData("3/04/2020", 0, 876868678, 0, Period.PERIOD_Q3, "ИП Иванов И.И."),
  createData("4/05/2020", 0, 125345788, 1, Period.PERIOD_YEAR, "ИП Иванов И.И."),
  createData("5/06/2020", 1, 405909054, 0, Period.PERIOD_Q4, "ИП Иванов И.И."),
  createData("6/07/2020", 0, 123123123, 1, Period.PERIOD_Q1, "ИП Иванов И.И."),
  createData("7/08/2020", 1, 123453454, 0, Period.PERIOD_Q2, "ИП Иванов И.И."),
  createData("8/09/2020", 1, 565986798, 1, Period.PERIOD_Q4, "ИП Иванов И.И."),
  createData("9/10/2020", 1, 657567565, 1, Period.PERIOD_YEAR, "ИП Иванов И.И."),
  createData("10/11/2020", 0, 6546899833, 1, Period.PERIOD_Q3, "ИП Иванов И.И."),
  createData("11/12/2020", 0, 3554324332, 1, Period.PERIOD_Q1, "ИП Иванов И.И."),
  createData("01/01/2021", 0, 123567098, 0, Period.PERIOD_MONTH, "ИП Иванов И.И.!"),
];

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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = 0;
  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, page, rowsPerPage],
  );

  const displayRowsLabel = () => {
    return "";
  };

  return (
    <Box sx={{ width: "98%", padding: "1% 1%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            {/*<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>*/}
            <EnhancedTableHead order={order} onRequestSort={handleRequestSort} rowCount={rows.length} />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.date} sx={{ cursor: "pointer" }}>
                    <TableCell component="th" scope="row" padding="normal">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">
                      {row.status ? <DoneIcon color={"success"} /> : <CloseIcon color={"error"} />}
                    </TableCell>
                    <TableCell align="right">№ {row.num}</TableCell>
                    <TableCell align="right">{row.docType ? "входящий" : "исходящий"}</TableCell>
                    <TableCell align="right">{row.period}</TableCell>
                    <TableCell align="right">{row.organization}</TableCell>
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
          count={rows.length}
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
