import { useReducer, useEffect } from "react";
import _ from "lodash";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.currentUser,
      };
    case "LOGOUT":
      localStorage.setItem("currentUserData", JSON.stringify({}));
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {},
      };
    default: {
      return state;
    }
  }
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, {
    isLoggedIn: false,
    currentUser: {},
  });

  //making state persistent event on page refresh  by storing userData on local storage

  //making the app state strongly persistent even on page reloads by
  //creating two functions, the first is to look in the users storage to check if
  // userData already exit and the second is to store localData
  //upon account login

  useEffect(() => {
    let data = localStorage.getItem("currentUserData");
    let currentUserData = JSON.parse(data);
    try {
      let test1 = !!currentUserData;
      let test2 = _.isEmpty(globalState.currentUser);

      if (test1 && !test2) {
        // console.log("current user local data is:", data);

        // console.log("current user local json data is:", currentUserData);

        globalDispatch({
          isLoggedIn: currentUserData.isLoggedIn,
          currentUser: { ...currentUserData.currentUser },
        });
        console.log("current user state data is:", globalState.currentUser);
      }
    } catch (e) {
      console.log("useGlobalStae the error is:", e);
    }
  });

  useEffect(() => {
    let test1 = _.isEmpty(globalState.currentUser);
    if (test1) return;
    localStorage.setItem("currentUserData", JSON.stringify(globalState));
  });

  return { globalState, globalDispatch };
};

export default useGlobalState;
