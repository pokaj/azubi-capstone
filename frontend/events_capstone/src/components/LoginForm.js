import React, {useState} from "react";
import { useForm } from "react-hook-form";
import RegistrationForm from "./signup/registration_form";
import ErrorMessage from "./signup/errorMessages";

const LoginForm = (props)=>{
    const{register, handleSubmit, errors} = useForm();
    const [choice, setChoice] = useState('');
    const regHandler = ()=>setChoice('reg');

    const doLogin = (data)=>{

        /**
         * API for the Login
         */
        try {
            
            alert(JSON.stringify(data)+
            "\n Data to be checked");
            }
        
        catch(e){
            alert(e)
        }
    }


    //Form begins here
    const form = <div className="form">
        <form  onSubmit={handleSubmit(doLogin)}>
        <div className="loginForm">

          <h1>Sign in to your account</h1>
         <br />
         <br />

            <label>Your email</label>
            <input
                type = 'email'
                placeholder='Email'
                name='email'
                ref={register({required:true,
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"}
                        })          
                    }
            />
            <ErrorMessage error={errors.email} />
            <label>Password</label>
            <input 
                type = 'password'
                placeholder='Password'
                name='password'
                ref={register({required:true})}
            />
            <ErrorMessage error={errors.password} />
            <button type = 'submit'>
                Sign in to your accounts
            </button>
            <br />
            <br />
            
            <h3>Don't have an account?</h3><a
            href='#'
            onClick={regHandler}>
                Sign UP
            </a>
           
      </div>
        </form>
     
      
    </div>
const reg = <RegistrationForm />
    return(
        <div>
    {(choice==="" ? form : reg)}
        </div>
        
        
    )
}
export default LoginForm;
