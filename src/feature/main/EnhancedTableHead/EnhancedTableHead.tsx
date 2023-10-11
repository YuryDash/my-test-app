import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { Data, Order } from "../UI/Main";

type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  rowCount: number;
};

type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Дата",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Статус",
  },
  {
    id: "num",
    numeric: true,
    disablePadding: false,
    label: "Номер",
  },
  {
    id: "docType",
    numeric: true,
    disablePadding: false,
    label: "Тип документа",
  },
  {
    id: "period",
    numeric: true,
    disablePadding: false,
    label: "Налоговый период",
  },
  {
    id: "organization",
    numeric: true,
    disablePadding: false,
    label: "Название организации",
  },
];

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#DCECF4" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sx={{ padding: "15px 20px" }}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === "date" ? (
              <TableSortLabel onClick={createSortHandler(headCell.id)}>{headCell.label}</TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
