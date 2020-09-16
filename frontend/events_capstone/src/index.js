//dependency imports
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

//module imports
import { GlobalStateProvider } from "./store/globalContext";
import "./index.css";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    {/* Wrapping Highest level component with with MobX global state provider to pass state down  */}
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
