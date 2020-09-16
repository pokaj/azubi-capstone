//dependencies imports
import React from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

//modules imports
import { useGlobalStateStore } from "../store/globalContext";

//component secures private routes from unauthenticated user access
function SecuredRoute(props) {
  const globalStateStore = useGlobalStateStore();

  //checks and logic preventing state loss of softState
  //data on page reload/refresh
  if (_.isEmpty(globalStateStore.currentUserData)) {
    let tempUserInfo = localStorage.getItem("currentUserData");
    let tempUserData = JSON.parse(tempUserInfo);
    if (!_.isEmpty(tempUserData)) {
      globalStateStore.addCurrentUserData(tempUserData);
      globalStateStore.onLogIn();
    }
  }

  //returns specified route is user is authoried else sends user back to login screen
  return (
    <Route
      path={props.path}
      render={(data) =>
        globalStateStore.isLoggedIn ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}

export default SecuredRoute;
