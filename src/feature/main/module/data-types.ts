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

export enum Period {
  PERIOD_ALL = 0,
  PERIOD_MONTH = 1,
  PERIOD_Q1 = 2,
  PERIOD_Q2 = 3,
  PERIOD_Q3 = 4,
  PERIOD_Q4 = 5,
  PERIOD_YEAR = 6,
}

export enum TypeDoc {
  outgoing = 7,
  incoming = 8,
  all = 9,
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
  documentType: TypeDoc;
  processingStatus: Status;
  statusComments: string;
  taxPeriodType: Period;
};

export type DataArchiveFilters = {
  dateFrom: string;
  dateTo: string;
  keyword: Status | QuickTransition;
  documentType: TypeDoc;
  documentDirection: Period;
};

export type PreparationArchiveFilters = Partial<DataArchiveFilters>;

export type RecordsState = {
  list: DataArchive[];
  filters: DataArchiveFilters;
};
