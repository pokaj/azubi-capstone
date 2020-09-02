//Event registration app registration component

//import dependencies
import react from "react";
import useForm from "react-hook-form";

//registration function component
export default function registrationForm() {
  //destructuring feature methods from useForm - "react-use-form"
  const { register, handleSubmit, error } = useForm();

  //function to handle form submission
  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <>
      {/* registration form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration</h1>
        <label>First Name:</label>
        <input name="firstName" ref={register({require=true, min=2})}/>
        {error.firstName && error.firstName.type === "required" && <p>This is required</p>}
        {error.firstName && error.firstName.type === "min" && <p>You need a minimum of 2 characters</p>}


        <label>Last Name:</label>
        <input name="lastName" ref={register({require=true, min=2})}/>
        {error.lastName && error.lastName.type === "required" && <p>This is required</p>}
        {error.lastName && error.lastName.type === "min" && <p>You need a minimum of 2 characters</p>}


        <label>Email</label>
        <input name="email" ref={register({require=true,pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }})}/>

        <label>Password</label>
        <input name="password" ref={register({require=true, pattern:{
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/i,message:"invalid password"
        }})}/>

        <label>Confirm Password</label>
        <input name="confirmPassword" ref={register({require=true, validate: (value) => value === watch('password') || "Passwords don't match." })}/>

        <label>Address</label>
        <input name="address" ref={register({require=true, min=4})}/>
        {error.address && error.address.type === "required" && <p>This is required</p>}
        {error.address && error.address.type === "min" && <p>You need a minimum of 4 characters for an address</p>}



        <label>Phone Number</label>
        <input name="phoneNumber" ref={register({require=true, pattern:{value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i,
        message: "invalid phone number"}})}/>

        <label>City</label>
        <select name="city" ref={register({ required: true })}>
          <option value="">City...</option>
          <option value="tamale">Tamale</option>
          <option value="accra">Accra</option>
          <option value="kumasi">kumasi</option>
        </select>
        {error.city && error.city.type === "required" && <p>This is required</p>}


        <span>
          <input type="checkbox" name="terms" ref={register({require=true,validator:accepted=> event.target.checked})}/>
          <label>I agree with the terms and conditions.</label>
        {error.city && error.city.type === "required" && <p>You need to accept the terms and conditions to proceed</p>}

        </span>

        <input type="submit" placeholder="Create Account" />
      </form>
    </>
  );
}
