import React from "react";

//function to handle which error message to display
export default function ErrroMessage({ error }) {
  function getMessage(message) {
    return <p className="message">{message}</p>;
  }

  if (error) {
    switch (error.type) {
      case "required":
        return getMessage("This is required");
      case "minLength":
        return getMessage("You need a minmium of 2 characters");
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
