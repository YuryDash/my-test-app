import React from "react";
import "./App.css";
import { RequestFilter } from "feature/request-filter/UI/RequestFilter";
import { Main } from "feature/main/UI/Main";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <div className="App">
      <RequestFilter />
      <Main />
    </div>
  );
}

export default App;
