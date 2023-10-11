import { dataArchiveReducer } from 'feature/main/module/data-reducer';
import { useDispatch } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { appReducer } from './app-reducer';


let rootReducer = combineReducers({
 dataArchive: dataArchiveReducer,
 app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootState = ReturnType<typeof rootReducer> 

export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// @ts-ignore
window.store = store;