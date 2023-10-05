import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TablePagination from "@material-ui/core/TablePagination";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { EnhancedTableHead } from "../EnhancedTableHead/EnhancedTableHead";
import { TablePaginationActions } from "feature/main/PagePagination/PagePagination";
import { ArchiveRequest } from "feature/main/ArchiveRequest/ArchiveRequest";

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("status");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  const displayRowsLabel = () => {
    return "";
  };

  return (
    <Box sx={{ width: "98%", padding: "1% 1%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
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
                    height: (dense ? 33 : 53) * emptyRows,
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
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <ArchiveRequest />
      </div>
    </Box>
  );
};
