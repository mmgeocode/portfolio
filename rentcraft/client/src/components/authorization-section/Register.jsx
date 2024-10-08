import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import RCButton from '../../ui/RCButton';
import { API_USER_CREATE } from '../../constants/endpoints';


function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      // Body
      const body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }

      // Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      }

      // Send Request
      const response = await fetch(API_USER_CREATE, requestOptions)

      // POST Response
      const data = await response.json()

      // Update Token and ID
      props.updateToken(data.token)
      props.updateCurrentId(data.user._id)

      // Navigate

    } catch (error) {
      
    }
  }
  return (
    <>
      <h2>Create New Account</h2>
      <Form>
        {/* First Name */}
        <FormGroup>
          <Label>First Name</Label>
          <Input
          id='first name'
          name='first name'
          placeholder='Enter First Name'
          type='first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} 
          />
        </FormGroup>

        {/* Last Name */}
        <FormGroup>
          <Label>Last Name</Label>
          <Input 
          id='last name'
          name='last name'
          placeholder='Enter Last Name'
          type='last name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>

        {/* Email */}
        <FormGroup>
          <Label>Email</Label>
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
          <Label>Password</Label>
          <Input 
          id='password'
          name='password'
          placeholder='Enter Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        {/* Submit Button */}
        <RCButton onClick={handleSubmit} title='Create Account' />

      </Form>
    </>
  );
}


export default Register;