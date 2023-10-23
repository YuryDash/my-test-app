import { AppThunkDispatch } from "app/store";
import { DataActions, DataArchive, Period, PreparationArchiveFilters, RecordsState, Status } from "./data-types";
import { v1 } from "uuid";
import { setAppStatusAC } from "app/app-reducer";
import dayjs from "dayjs";

const rows = [
  createData(v1(), "01.01.2020", "", 100000000, "ИП Иванов И.И.", "отчет", 0, 0, "lol", Period.PERIOD_YEAR),
  createData(v1(), "19.10.2023", "", 200000000, "ИП Иванов И.И.", "отчет", 0, 0, "lol", Period.PERIOD_YEAR),
  createData(v1(), "20.10.2023", "", 300000000, "ИП Иванов И.И.", "отчет", 0, 3, "lol", Period.PERIOD_YEAR),
  createData(v1(), "01.01.2023", "", 400000000, "ИП Иванов И.И.", "отчет", 1, 1, "lol", Period.PERIOD_YEAR),
  createData(v1(), "02.03.2020", "", 500000000, "ИП Иванов И.И.", "отчет", 0, 1, "lol", Period.PERIOD_MONTH),
  createData(v1(), "02.05.2022", "", 600000000, "ИП Иванов И.И.", "отчет", 1, 1, "lol", Period.PERIOD_Q1),
  createData(v1(), "02.05.2023", "", 700000000, "ИП Иванов И.И.", "отчет", 1, 0, "lol", Period.PERIOD_MONTH),
  createData(v1(), "12.10.2023", "", 800000000, "ИП Иванов И.И.", "отчет", 0, 1, "lol", Period.PERIOD_Q3),
  createData(v1(), "11.10.2021", "", 900000000, "ИП Иванов И.И.", "отчет", 0, 3, "lol", Period.PERIOD_Q3),
  createData(v1(), "16.10.2023", "", 101000000, "ИП Иванов И.И.", "отчет", 0, 3, "lol", Period.PERIOD_Q3),
  createData(v1(), "17.10.2023", "", 111000000, "ИП Иванов И.И.", "отчет", 1, 3, "lol", Period.PERIOD_MONTH),
  createData(v1(), "02.11.2023", "", 120000000, "ИП Иванов И.И.", "отчет", 1, 1, "lol", Period.PERIOD_Q2),
  createData(v1(), "02.09.2023", "", 130000000, "ИП Иванов И.И.", "отчет", 0, 0, "lol", Period.PERIOD_Q1),
  createData(v1(), "22.10.2022", "", 140000000, "ИП Иванов И.И.", "отчет", 0, 1, "lol", Period.PERIOD_Q4),
  createData(v1(), "23.10.2023", "", 150000000, "ИП Иванов И.И.", "отчет", 0, 1, "lol", Period.PERIOD_Q4),
];
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

const initialState: RecordsState = {
  list: [] as DataArchive[],
  filters: {
    dateFrom: dayjs().startOf('year').year(2020).format('DD.MM.YYYY'),
    dateTo: dayjs().startOf('day').format('DD.MM.YYYY'),
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
  dispatch(setAppStatusAC('loading'))
  // запрос на сервер dataArchiveAPI.getList()
  // .then( (response) => {
    setTimeout( () => {
      dispatch(setDataArchiveAC(rows))
      dispatch(setAppStatusAC('succeeded'))
    }, 2000 )

  // } )
  // .catch( (e)=> {
  // dispatch(setAppStatusAC('failed'))
  // dispatch(setAppErrorAC(e.message))
  // } )
};


