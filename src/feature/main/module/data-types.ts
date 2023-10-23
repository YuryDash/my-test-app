import { SetAppErrorAT } from "app/app-reducer";
import { setDataArchiveAC, setDataFiltersAC } from "./data-reducer";

type SetDataFiltersAT = ReturnType<typeof setDataFiltersAC>;
type SetDataArchiveAT = ReturnType<typeof setDataArchiveAC>;
export type DataActions = SetDataFiltersAT | SetDataArchiveAT | SetAppErrorAT;

export enum Status {
  unprocessed = 0,
  processed = 1,
  new = 2,
  in_process = 3,
  ALL = 4,
}

export enum TypeDoc {
  outgoing,
  incoming,
}
export enum Period {
  PERIOD_MONTH = "Месяц",
  PERIOD_Q1 = "Q1",
  PERIOD_Q2 = "Q2",
  PERIOD_Q3 = "Q3",
  PERIOD_Q4 = "Q4",
  PERIOD_YEAR = "Год",
}
export enum QuickTransition {
  NOW = 5,
  WEEK = 6,
  MONTH = 7,
  ALL = 4,
}
export type Data = {
  date: string;
  status: Status;
  docType: TypeDoc;
  num: number;
  period: Period;
  organization: string;
};

export type DataArchive = {
  id: string;
  date: string;
  originalDocumentDate: string;
  originalDocumentNumber: number;
  organizationName: string;
  documentRepresentation: string;
  documentType: number;
  processingStatus: Status;
  statusComments: string;
  taxPeriodType: Period;
};

export type DataArchiveFilters = {
  dateFrom: string;
  dateTo: string;
  keyword: Status | QuickTransition;
  documentType: string;
  documentDirection: string;
};

export type PreparationArchiveFilters = Partial<DataArchiveFilters>;

export type RecordsState = {
  list: DataArchive[];
  filters: DataArchiveFilters;
};
