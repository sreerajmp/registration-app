import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [phone,setphone]=useState('')
  const [email,setemail]=useState('')
  const [postal,setpostal]=useState('')
  const [invalidMsg,setinvalidMsg]=useState('please input details')
  const formSubmit=(e)=>{
    if(validateInput()){

      axios.post('http://localhost:8080/v1/users', {
      firstName: firstName,
      lastName: lastName,
      postal: postal,
      email: email,
      phone: phone,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });}
  }
  useEffect(()=>{
    // if(invalidMsg!='please input details'){
      validateInput()

    // }

  },[email,firstName,lastName,postal,phone])
  const validateInput=()=>{
    console.log("trigger");
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^((\+44)|(0)) ?\d{4} ?\d{6}$/; 
      const postalRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\\s*[0-9][A-Z]{1,2})?$/;
      if(!emailRegex.test(email) ){setinvalidMsg('Invalid Email');return false}
        if(!firstName.length>3 ){setinvalidMsg('min 3 char required');return false} 
        if(!lastName.length>2){ setinvalidMsg('min 2 char required in last name');return false }
        if(!phoneRegex.test(phone)){ setinvalidMsg('invalid phone');return false }
        if(!postalRegex.test(postal)){ setinvalidMsg('invalid postal');return false }
      else{
        setinvalidMsg('')
        return true

      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
        <div className='form-div '>
        <label for="firstname">first name</label>
        <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}></input>
        <label for="lastName">Last name</label>
        <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>
        <label for="phone">phone</label>
        <input type="text" value={phone} onChange={(e)=>{setphone(e.target.value)}}></input>
        <label for="email">email</label>
        <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
        <label for="postal">postal code</label>
        <input type="text" value={postal} onChange={(e)=>{setpostal(e.target.value)}}></input>
        {invalidMsg.length?<span className='error-span'>{invalidMsg}</span>:null}
        <button    onClick={(e)=>formSubmit(e)}>submit</button>    

        </div>
        </p>
      </header>
     
    </div>
  );
}

export default App;
