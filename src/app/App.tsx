import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Main } from "feature/main/UI/Main";
import { RequestFilter } from "feature/request-filter/UI/RequestFilter";
import "./App.css";
import { useAppDispatch } from "./store";

function App() {
  //const dispatch = useAppDispatch();
  // get запрос на сервер за данными
  // useEffect( () => {
  //   dispatch(setDataArchive())
  // },[] )

  return (
    <div className="App">
      <RequestFilter />
      <Main />
    </div>
  );
}

export default App;
