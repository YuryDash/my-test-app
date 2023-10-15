import { AppThunkDispatch } from "app/store";
import {
  DataActions,
  DataArchive,
  Period,
  PreparationArchiveFilters,
  RecordsState,
  Status,
} from "./data-types";
import { v1 } from "uuid";

const rows = [
  createData(v1(), "2/02/2020", '', 889743242, 'ИП Иванов И.И.', 'отчет', 0, 0, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "01/01/2021", '', 965756731, 'ИП Иванов И.И.', 'отчет', 3, 1, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/03/2020", '', 355432433, 'ИП Иванов И.И.', 'отчет', 0, 1, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/05/2022", '', 654689983, 'ИП Иванов И.И.', 'отчет', 1, 1, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/05/2023", '', 657567565, 'ИП Иванов И.И.', 'отчет', 1, 0, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/07/2021", '', 565986798, 'ИП Иванов И.И.', 'отчет', 0, 1, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "11/12/2021", '', 405909054, 'ИП Иванов И.И.', 'отчет', 0, 0, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/12/2023", '', 125345788, 'ИП Иванов И.И.', 'отчет', 0, 0, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/11/2021", '', 876868678, 'ИП Иванов И.И.', 'отчет', 1, 1, 'lol', Period.PERIOD_MONTH),
  createData(v1(), "2/09/2022", '', 123123213, 'ИП Иванов И.И.', 'отчет', 0, 0, 'lol', Period.PERIOD_Q1),
  createData(v1(), "2/09/2022", '', 123134123, 'ИП Иванов И.И.', 'отчет', 0, 1, 'lol', Period.PERIOD_MONTH),

];

const initialState: RecordsState = {
  list: [...rows],
  filters: {
    dateFrom: null,
    dateTo: null,
    keyword: Status.ALL,
    documentType: "",
    documentDirection: "",
  },
};

export const dataArchiveReducer = (state: RecordsState = initialState, action: DataActions): RecordsState => {
  switch (action.type) {
    case "SET_DATA_ARCHIVE":
      return {
        ...state,
        list: [...action.payload.list],
      };
    case "SET_DATA_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };
    default:
      return state;
  }
};

export const setDataFiltersAC = (filters: PreparationArchiveFilters) => {
  return {
    type: "SET_DATA_FILTERS",
    payload: { filters: filters },
  } as const;
};

export const setDataArchiveAC = (list: DataArchive[]) => {
  return {
    type: "SET_DATA_ARCHIVE",
    payload: { list },
  } as const;
};

export const setDataArchive = () => (dispatch: AppThunkDispatch) => {
  //dispatch(setAppStatusAC('loading'))
  // запрос на сервер dataArchiveAPI.getList()
  //.then( (response) => {
  //dispatch(setDataArchiveAC(response.data.items))
  //dispatch(setAppStatusAC('succeeded'))
  // } )
  //.catch( (e)=> {
  //dispatch(setAppStatusAC('failed'))
  // dispatch(setAppErrorAC(e.message))
  //} )
};

function createData(
  id: string,
  date: string,
  originalDocumentDate: string,
  originalDocumentNumber: number,
  organizationName: string,
  documentRepresentation: string,
  documentType: number,
  processingStatus: Status,
  statusComments: string,
  taxPeriodType: Period,
): DataArchive {
  return {
    id,
    date,
    originalDocumentDate,
    originalDocumentNumber,
    organizationName,
    documentRepresentation,
    documentType,
    processingStatus,
    statusComments,
    taxPeriodType,
  };
}
