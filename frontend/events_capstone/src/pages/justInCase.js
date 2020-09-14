//Event registration app registration component

//import dependencies
import React, { Component } from "react";
import { useForm } from "react-hook-form";

//module imports
import "../components/signup/styles.css";
import ErrorMessage from "../components/signup/errorMessages";
import swal from "sweetalert";

//regular expression for time
let timeRegEx = RegExp(/^[0-9]{2}[:]{1}[0-9]{2}$/g);

//event registration function component...
const Form = () => {
  //destructuring feature methods from useForm() - "react-use-form"...
  const { register, handleSubmit, errors } = useForm();

  //function to handle form submission...
  const onSubmit = async (data, e) => {
    // console.log("The data is:", data);

    //url to bacnkend for registration...to be stored in a seperate file as a secrete later...
    let url = "http://localhost:8000/api/events/";

    //method to submit form data and receive reponse data asynchronously
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        //interactive display(alerts) on successful/unsuccessful user login attempt
        if (data.status === true) {
          e.target.reset();
          swal(
            "Success",
            "You've successfully registered for an event",
            "success"
          );
        } else {
          swal(
            "Error",
            `Event registration unsucceful: ${data["error-message"]}`,
            "warning",
            {
              buttons: {
                cancel: "Close",
              },
            }
          );
        }

        console.log("success", data);
      })
      .catch((error) => {
        swal("Error", "Event registration failed, please retry", "warning");
        console.error("Error:", error);
      });
  };

  //variable to hold event registration form
  return (
    <>
      {/* registration form */}
      <div className="login-page">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Register Event</h1>

          {/* lables along with form fields */}

          <ErrorMessage error={errors.name} />
          <input
            name="name"
            placeholder="Event Name"
            ref={register({ required: true, minLength: 2 })}
          />

          <ErrorMessage error={errors.tagline} />
          <input
            name="tagline"
            placeholder="Tag Line"
            ref={register({ required: true, minLength: 2 })}
          />

          <ErrorMessage error={errors.speaker} />
          <input
            name="speaker"
            placeholder="Speaker"
            ref={register({ required: true, minLength: 2 })}
          />

          <ErrorMessage error={errors.topic} />
          <input
            name="topic"
            placeholder="Topic"
            ref={register({ required: true, minLength: 2 })}
          />

          <ErrorMessage error={errors.location} />
          <input
            name="location"
            placeholder="Event Location"
            ref={register({ required: true, minLength: 2 })}
          />

          <ErrorMessage error={errors.room_capacity} />
          <input
            name="room_capacity"
            placeholder="Room Capacity"
            ref={register({
              required: true,
              validate: (value) =>
                typeof value === "number" || "Passwords do not match.",
            })}
          />

          <ErrorMessage error={errors.date} />
          <input
            name="date"
            placeholder="YYYY-MM-YY"
            ref={register({
              required: true,
              minLength: 2,
              pattern: {
                value: /^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/g,
                message: "Invalid date format, please use year-month-day",
              },
            })}
          />

          <ErrorMessage error={errors.period} />
          <input
            name="period"
            placeholder="m, mm, a"
            ref={register({ required: true, maxLength: 1 })}
          />

          <ErrorMessage error={errors.start_time} />
          <input
            name="start_time"
            placeholder="Start Time hh:mm [:ss]"
            ref={register({
              required: true,
              minLength: 2,
              pattern: {
                value: timeRegEx,
                message: "Invalid start time, please use hour:minues",
              },
            })}
          />

          <ErrorMessage error={errors.end_time} />
          <input
            name="end_time"
            placeholder="Ends Time hh:mm [:ss]"
            ref={register({
              required: true,
              minLength: 2,
              pattern: {
                value: timeRegEx,
                message: "Invalid start time, please use hour:minues",
              },
            })}
          />

          <button type="submit" placeholder="Confirm Registration">
            Rigister Event
          </button>
        </form>
      </div>
    </>
  );
};

//class to render returned form function form
class EventRegistrationForm extends Component {
  render() {
    return (
      <>
        <Form />
      </>
    );
  }
}

//exporting registrationform logic
export default EventRegistrationForm;
