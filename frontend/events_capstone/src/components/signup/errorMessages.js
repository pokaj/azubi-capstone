import React from "react";

//function to handle which error message to display
export default function ErrroMessage({ error }) {
  function getMessage(message) {
    return <p className="message">{message}</p>;
  }

  //selects which error message to display depending on the error provided
  if (error) {
    switch (error.type) {
      case "required":
        return getMessage("This is required");
      case "minLength":
        return getMessage("You entered below the minmium characters required!");
      case "pattern":
        return getMessage(error.message);
      case "validate":
        return getMessage(error.message);
      default:
        return null;
    }
  }
  return null;
}
