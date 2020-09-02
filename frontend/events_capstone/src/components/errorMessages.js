import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>This is required</p>;
      case "minLength":
        return <p>Your last name need a minmium of 2 charcaters</p>;
      //   case "pattern":
      //     return <p>Enter a valid email address</p>;
      //   case "min":
      //     return <p>Minmium age is 18</p>;
      //   case "validate":
      //     return <p>Username is already used</p>;
      default:
        return null;
    }
  }

  return null;
}
