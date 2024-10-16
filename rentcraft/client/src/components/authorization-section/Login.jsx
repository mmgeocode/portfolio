import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import RCButton from '../../ui/RCButton';
import { API_USER_LOGIN } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      // Body
      const body = { email: email, password: password }

      // Request Options
      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }

      // Send Request
      const response = await fetch(API_USER_LOGIN, requestOption);

      // POST Response
      const data = await response.json()

      // Update Token and ID
      props.updateToken(data.token)
      props.updateCurrentId(data.user._id)

      // Navigate to Main
      navigate('/main')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2>Accout Login</h2>

      <Form className='login-form'>
        {/* Email */}
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input 
          id='email'
          name='email'
          placeholder='Enter Email Address'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        {/* Password */}
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input 
          id='password'
          name='password'
          placeholder='Enter Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <RCButton onClick={handleSubmit} title='LOGIN'/>
      </Form>
    </>
  );
}


export default Login;