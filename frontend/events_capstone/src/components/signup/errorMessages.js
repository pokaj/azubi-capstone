import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>This is required</p>;
      case "minLength":
        return <p>Your last name needs a minmium of 2 charcaters</p>;
      case "pattern":
        return <p>{error.message}</p>;
      case "validate":
        return <p>{error.message}</p>;
      default:
        return null;
    }
  }

  return null;
}
