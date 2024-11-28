import React, { useState } from 'react'
import './LogInPopUp.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const LogInPopUp = ({setshowLogin}) => {

    const {url, setToken} = useContext(StoreContext)
    const [currState, setcurrState] = useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler =(event)=>{
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState == "Login"){
          newUrl += "/api/user/login"
        }
        else{
          newUrl += "/api/user/register"
        }


        // sending data to backend and receiving response from backend
        const response = await axios.post(newUrl,data)

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setshowLogin(false)
        }
        else{
          alert(response.data.message)
        }
    }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {
                    currState==="Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>
                }
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email'/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required/>
            </div>
            <button type='submit'>{currState ==="Sign Up"?"Create New account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {
                currState==="Login"
                ?<p>Create a new account? <span onClick={()=>setcurrState("Sign Up")}>click here</span> </p>
                :<p>already have an account? <span onClick={()=>setcurrState("Login")}>Login here</span></p>
            }
            
            
      </form>
    </div>
  )
}

export default LogInPopUp
