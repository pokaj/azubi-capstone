import React from "react";

export default function ErrroMessage({ error }) {
  function getMessage(message) {
    return <p className="message">{message}</p>;
  }

  if (error) {
    switch (error.type) {
      case "required":
        return getMessage("This is required");
      case "minLength":
        return getMessage("Your last name needs a minmium of 2 charcaters");
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
