import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { values } from 'mobx';
import RegistrationForm from './registration_form';


const LoginForm = ()=>{
    
    const {register, handleSubmit, errors} = useForm();
    const [choice, setChoice] = useState('');

    // compare login data with data from api
    const displayData = data => console.log(data);

    const registaHandler = ()=> setChoice('regista');

    const form = <div>
                    <h1>LOGIN</h1>
                    <form onSubmit={handleSubmit(displayData)}>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" ref={register({required:true})}/> 
                    {errors.email && <span>Email Required</span>} <br/>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" ref={register({required:true, minLength:3})}/> 
                    {errors.password && <span>Password Required</span>} <br/>
                    <button type="submit">Login</button>
                    </form>
                    <button onClick={registaHandler}>Register</button>
                 </div>;

    const regista = <RegistrationForm/>;

    return(
        <div>
           {choice==='' ? form : regista}
        </div>
    );
}


export default LoginForm;

//LoginForm