import React from 'react'
import { Link } from 'react-router-dom';

function LoginComponent() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  return (
      <div>
        <form>
          <label htmlFor="loginUsernameInputField">Username</label>
          <input type="text" id='loginUsernameInputField' onChange={(e) => setUsername(e.target.value)}/><br />
          <label htmlFor="loginPasswordInputField">Password</label>
          <input type="password" id='loginPasswordInputField' onChange={(e) => setPassword(e.target.value)}/><br />
          <button>Login</button><br />
          <p><Link to='/registerComponent'>Register</Link></p>
        </form>
      </div>
  )
}

export default LoginComponent
