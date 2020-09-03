import React, {useState} from "react";
import { useForm } from "react-hook-form";
import RegistrationForm from "./signup/registration_form";

const LoginForm = (props)=>{
    const{register, handleSubmit, errors} = useForm();
    const [choice, setChoice] = useState('');
    const regHandler = ()=>setChoice('reg');

    const doLogin = ()=>{

        /**
         * API for the Login
         */
        try {
            

            }
        
        catch(e){
            
        }
    }
    const form = <div className="form">
        <form  onSubmit={handleSubmit({doLogin})}>
        <div className="loginForm">
          <h1>Sign in to your account</h1>
         <br />
         <br />
            <label>Your email</label><br/>
            <input
            type = 'email'
            placeholder='Email'
            name='email'
            ref={register({required:true})}
            />
            {errors.password && <span >email required</span>}
            <label>Password</label>
            <input 
            type = 'password'
            placeholder='Password'
            name='password'
            ref={register({required:true})}
            /><br/>
            {errors.password && <span >password required</span>}
            <button
            type = 'submit'
            >
                Sign in to your accounts
            </button>
            <br />
            <br />
            <hr />
            <a
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
