import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Main } from "feature/main/UI/Main";
import { RequestFilter } from "feature/request-filter/UI/RequestFilter";
import "./App.css";
import { AppRootState, useAppDispatch } from "./store";
import { useEffect } from "react";
import { setDataArchive } from "feature/main/module/data-reducer";
import { useSelector } from "react-redux";
import { RequestStatusType } from "./app-reducer";
import { Preloader } from "until/Preloader";

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)

  // get запрос на сервер за данными
  useEffect( () => {
    dispatch(setDataArchive())
  },[] )

  return (
    <div className="App">
      <RequestFilter />
      {isLoading === "loading" ? <Preloader /> : <Main />}
    </div>
  );
}

export default App;
