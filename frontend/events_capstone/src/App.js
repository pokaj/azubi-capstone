import React from "react";
import "./App.css";

import LandingPage from "./components/landingPage/landingPage.js";
import HomePage from "./pages/homePage";
import MyEventsPage from "./pages/myEvents";
import EventsListingsPage from "./pages/eventsListings";
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./pages/pageNotFound";
import SecuredRoute from "./routes/securedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

//import dependencies to handle routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <SecuredRoute path="/home" component={HomePage} />
          <SecuredRoute path="/eventsListings" component={EventsListingsPage} />
          <SecuredRoute path="/myEventsPage" component={MyEventsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export { App };
// export default App;
