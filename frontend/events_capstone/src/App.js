//dependency imports
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//module imports
import "./App.css";
import LandingPage from "./components/landingPage/landingPage.js";
import HomePage from "./pages/homePage";
import MyEventsPage from "./pages/myEvents";
import EventsListingsPage from "./pages/eventsListings";
import PageNotFound from "./pages/pageNotFound";
import SecuredRoute from "./routes/securedRoutes";
import ProfilePage from "./pages/userDashBoard";

//dependencies handling routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <SecuredRoute path="/home" component={HomePage} />
          <SecuredRoute path="/eventsListings" component={EventsListingsPage} />
          <SecuredRoute path="/myEventsPage" component={MyEventsPage} />
          <SecuredRoute path="/profilePage" component={ProfilePage} />
          <Route path="/" exact component={LandingPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export { App };
// export default App;
