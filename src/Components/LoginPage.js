import React,{useState} from'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const[enteredEmail,setEnteredEmail]=useState('')
    const[enteredPassword,setEnteredPassword]=useState('')
    let navigate = useNavigate();
    
    
    
    
    function emailChangeHandler(event){
        setEnteredEmail(event.target.value)
    }
    function passwordChangeHandler(event){
        setEnteredPassword(event.target.value)
    }

    async function submitHandler(){

        const inputData={
            email:enteredEmail,
            password:enteredPassword
        }
        const result = await axios.post('https://api.citrone.co/api/login',inputData)
        console.log(result)
        localStorage.setItem('token',result.data.access_token)
        setEnteredEmail('')
        setEnteredPassword('')
        navigate('/grading')
    }

    return (
    
        <div>
            <div className='cardscreen'>
                
                    <div className='email-address'>
                        <label>Email address</label>
                        <div>
                            <input className='email-input' value={enteredEmail} type='email' onChange={emailChangeHandler}></input>
                        </div>
                    </div>
                    <div className='password'>
                        <label>Password</label>
                        <div>
                            <input className='email-input' value={enteredPassword} type='password' onChange={passwordChangeHandler}></input>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>submitHandler()} className='sign-button'>Sign in with Citrone</button>
                    </div>
            </div>
        </div>
    );
}
export default Login;