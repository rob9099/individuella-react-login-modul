import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'



function LoginComponent() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponseMessage, setLoginResponseMessage] = useState('');


  let loginHandler = async (e) =>{
    
    e.preventDefault();

    const userLoginDetails = {
      username, password
    }

    await axios.post('http://localhost:4000/app/get', userLoginDetails)
    .then(response => {
      if(typeof(response.data) == 'string'){
        setLoginResponseMessage (response.data);
      }else{
        setLoginResponseMessage ('Success you are now logged in! Please wait to be redirected')
        setTimeout(() => {
          window.location = '/userPage'
        }, 1500);
      }
    })
  };
  
  
  return (
      <div>
        <form onSubmit={loginHandler}>
          <label htmlFor="loginUsernameInputField">Username</label>
          <input type="text" id='loginUsernameInputField' required onChange={(e) => setUsername(e.target.value)}/><br />
          <label htmlFor="loginPasswordInputField">Password</label>
          <input type="password" id='loginPasswordInputField' required onChange={(e) => setPassword(e.target.value)}/><br />
          <h5>{loginResponseMessage}</h5>
          <button>Login</button><br />
          <p><Link to='/registerComponent'>Register</Link></p>
        </form>
      </div>
  )
}

export default LoginComponent
