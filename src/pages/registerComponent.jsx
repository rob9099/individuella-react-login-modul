import React, {useEffect, useState} from 'react';
import axios from 'axios';



let RegisterComponent = () => {
  
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastNameName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordToShortErrorMessage, setPasswordToShortErrorMessage] = useState('');
  const [noSpecialCharactersErrorMessage, setNoSpecialCharactersErrorMessage] = useState('');


  let errorHandler = (e) =>{
    if(e.length < 8){
      setPasswordToShortErrorMessage ('Password to short');
    }else{
      setPasswordToShortErrorMessage('')
    };

    if(e.match(/[|\\/~^:,;?!&%$@*+]/)){
      setNoSpecialCharactersErrorMessage ('No special characters allowed');
    }
    else{
      setNoSpecialCharactersErrorMessage('')
    };
  };

  
  let submitHandler = async (e) =>{
    
    e.preventDefault();

    console.log(passwordToShortErrorMessage)
    console.log(noSpecialCharactersErrorMessage)


    if(passwordToShortErrorMessage && noSpecialCharactersErrorMessage == ''){

      const registered = {
        firstName, lastName, username, password
      }

      axios.post('http://localhost:4000/app/signup', registered)
      .then(response => console.log(response.data))

      window.location = '/'

    }else{
      
      setPasswordToShortErrorMessage('Please fix errors before submitting');
    };
  };

  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="registerFirstnameInputField">First name</label>
        <input type="text" id='registerFirstnameInputField' onChange={(e) => setFirstName(e.target.value)}/><br />
        <label htmlFor="registerLastnameInputField">Last name</label>
        <input type="text" id='registerLastnameInputField' onChange={(e) => setLastNameName(e.target.value)}/><br />
        <label htmlFor="registerUsernameInputField">Username</label>
        <input type="text" id='registerUsernameInputField' onChange={(e) => setUsername(e.target.value)}/><br />
        <label htmlFor="registerPasswordInputField">Password</label>
        <input type="password" id='registerPasswordInputField' onChange={(e) => {setPassword(e.target.value); errorHandler(e.target.value)}}/><br />
        <h5>{passwordToShortErrorMessage}</h5>
        <h5>{noSpecialCharactersErrorMessage}</h5>
        <button>Register</button><br />
      </form>
    </div>
  )
};

export default RegisterComponent










/*import React, { Component } from 'react'

class registerComponent extends Component {
  
  state = {
    users: [
      {username: 'test1', password: 'test2'}
    ]
  }
  
  render() {
     return (
      <div>
      <form>
        <label htmlFor="registerUsernameInputField">Username</label>
        <input type="text" id='registerUsernameInputField' onChange={(e) => this.setState.username(e.target.value)}/><br />
        <label htmlFor="registerPasswordInputField">Password</label>
        <input type="password" id='registerPasswordInputField' onChange={(e) => this.setState.password(e.target.value)}/><br />
        <button>Register</button><br />
      </form>
    </div>
    )
  }
}

export default registerComponent*/