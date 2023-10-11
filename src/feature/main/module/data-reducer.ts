import { AppThunkDispatch } from "app/store";
import { DataActions, DataArchive, DataArchiveFilters, PreparationArchiveFilters, RecordsState } from "./data-types";

const initialState: RecordsState = {
  list: [],
  filters: {
    dateFrom: null,
    dateTo: null,
    keyword: "",
    documentType: "",
    documentDirection: "",
  },
};

export const dataArchiveReducer = (state: RecordsState = initialState, action: DataActions): RecordsState => {
  switch (action.type) {
    case "SET_DATA_ARCHIVE":
      return {
        ...state,
        list: [ ...action.payload.list ],
      };
    case "SET_DATA_FILTERS":
      alert(action.payload.filters.keyword + " вышло")
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
  } as const
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
