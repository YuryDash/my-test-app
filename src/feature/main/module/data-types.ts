import { SetAppErrorAT } from 'app/app-reducer';
import { setDataArchiveAC, setDataFiltersAC } from './data-reducer';

type SetDataFiltersAT = ReturnType<typeof setDataFiltersAC>
type SetDataArchiveAT = ReturnType<typeof setDataArchiveAC>
export type DataActions = SetDataFiltersAT | SetDataArchiveAT | SetAppErrorAT

export type DataArchive = {
  id: string;
  date: string;
  originalDocumentDate: string;
  originalDocumentNumber: string;
  organizationName: string;
  documentRepresentation: string;
  documentType: string;
  processingStatus: string;
  statusComments: string;
  taxPeriodType: string;
};

export type DataArchiveFilters = {
  dateFrom: string | null;
  dateTo: string | null;
  keyword: string;
  documentType: string;
  documentDirection: string;
};

export type PreparationArchiveFilters = Partial<DataArchiveFilters>

export type RecordsState = {
  list: DataArchive[];
  filters: DataArchiveFilters;
}
