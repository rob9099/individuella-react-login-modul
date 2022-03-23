import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';






let RegisterComponent = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastNameName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordToShortErrorMessage, setPasswordToShortErrorMessage] = useState('');
  const [noSpecialCharactersErrorMessage, setNoSpecialCharactersErrorMessage] = useState('');
  const [serverErrorResponse, setServerErrorResponse] = useState('');
  const [registerSucessMessage, setRegisterSucessMessage] = useState('');


  /*useEffect(() => {
    userRef.current.focus()
  })*/


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

    if(passwordToShortErrorMessage == '' && noSpecialCharactersErrorMessage == ''){
        
      const registered = {
        firstName, lastName, username, password
      };

      await axios.post('http://localhost:4000/app/signup', registered)
      .then(response => {
        if(typeof(response.data) == 'string'){
          setServerErrorResponse (response.data);
        }else{
          setRegisterSucessMessage ('Success you are now registered! Please wait to be redirected')
        }
      })

      setTimeout(() => {
        window.location = '/'
      }, 1500);
    }else{

      setPasswordToShortErrorMessage('Please fix errors before submitting');
    };
  };

  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="registerFirstnameInputField">First name</label>
        <input type="text" id='registerFirstnameInputField' required /*ref={userRef}*/ onChange={(e) => setFirstName(e.target.value)}/><br />
        <label htmlFor="registerLastnameInputField">Last name</label>
        <input type="text" id='registerLastnameInputField' required onChange={(e) => setLastNameName(e.target.value)}/><br />
        <label htmlFor="registerUsernameInputField">Username</label>
        <input type="text" id='registerUsernameInputField' required onChange={(e) => setUsername(e.target.value)}/><br />
        <label htmlFor="registerPasswordInputField">Password</label>
        <input type="password" id='registerPasswordInputField' required  onChange={(e) => {setPassword(e.target.value); errorHandler(e.target.value)}}/><br />
        <h5>{passwordToShortErrorMessage}</h5>
        <h5>{noSpecialCharactersErrorMessage}</h5>
        <h5>{serverErrorResponse}{registerSucessMessage}</h5>
        <button>Register</button><br />
      </form>
    </div>
  )
};

export default RegisterComponent;