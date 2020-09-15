import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

import Context from "../store/context";

//component secures private routes from unauthenticated users
function SecuredRoute(props) {
  const { globalState, globalDispatch } = useContext(Context);
  let userInfo = localStorage.getItem("currentUserData");
  let currentUserData = JSON.parse(userInfo);
  let test1 = !!currentUserData;
  let test2 = _.isEmpty(globalState.currentUser);

  useEffect(() => {
    // console.log("current user local data is:", userInfo);

    if (test1 && test2) {
      globalDispatch({
        isLoggedIn: currentUserData.isLoggedIn,
        currentUser: currentUserData.currentUser,
      });

      // console.log("current user state data is:", globalState.currentUser);
    }
  });
  // console.log("the problem", currentUserData);
  return (
    <Route
      path={props.path}
      render={(data) =>
        !_.isEmpty(currentUserData) ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}

export default SecuredRoute;
