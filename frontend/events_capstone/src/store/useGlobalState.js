import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.currentUser,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
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

  return { globalState, globalDispatch };
};

export default useGlobalState;
