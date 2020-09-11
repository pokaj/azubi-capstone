import React from "react";
import "./App.css";
import LandingPage from "./components/landingPage/landingPage.js";
import HomePage from "./pages/homePage";

//import dependencies to handle routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/Home" component={HomePage} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
