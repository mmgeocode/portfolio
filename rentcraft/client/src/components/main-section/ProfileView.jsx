import React, { useState, useEffect } from 'react';
import { API_USER_PATCH, API_USER_VIEW_BY_ID } from "../../constants/endpoints";
import { Card, CardBody, CardFooter, CardHeader, Input, Label } from 'reactstrap';
import RCButton from '../../ui/RCButton';
import ReturnToAuth from '../authorization-section/ReturnToAuth';

function ProfileView(props) {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [userData, setUserData] = useState({});
  const [firstNameInput, setFirstNameInput] = useState(userData.firstName);
  const [lastNameInput, setLastNameInput] = useState(userData.lastName);
  const [emailInput, setEmailInput] = useState(userData.email);
  const [passwordInput, setPasswordInput] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");

  function handleToggleEdit() {
    setEditModeEnabled(!editModeEnabled)
  }

  async function handleEditSubmit() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)
      myHeaders.append("Content-Type", "application/json")

      // Body
      const body = {

      }

      // Request Options
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body)
      }

      // Send Request
      const response = await fetch(API_USER_PATCH + userData._id, requestOptions)

      // PATCH Response
      const data = await response.json()
      console.log(data)

      // Refresh User
      fetchUserData()

      // Change Edit Mode to False
      setEditModeEnabled(false)

    } catch (error) {
      console.error(error)
    }
  }

  async function fetchUserData() {
    try {
      // Headers
      const myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders
      }

      // Send Request
      const response = await fetch(API_USER_VIEW_BY_ID + "/" + props.currentId, requestOptions)

      // GET Response
      const data = await response.json()
      // console.log(data)

      // Set State
      setUserData(data.user)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchUserData()
  }, [props.token]);

  if (!props.token) {
    return <ReturnToAuth />
  }

  return (
    <>
      <Card className='profile'>
        <CardHeader>
          {userData.firstName} 
          {userData.lastName}'s Profile
        </CardHeader>

        <CardBody>
          {editModeEnabled ? ( <>
            <Label for='first name'>First Name</Label>
            <Input 
            type='text'
            id='first name'
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.target.value)}
            />

            <Label for='last name'>Last Name</Label>
            <Input 
            type='text'
            id='last name'
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
            />

            <Label for='email'>Email</Label>
            <Input 
            type='email'
            id='email'
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            />
            
          </> ) : ( <>
            Email: {userData.email}
          </> )}

        </CardBody>

        <CardFooter>
          {editModeEnabled ? ( <>
            <RCButton title='Confirm Edits' onClick={handleEditSubmit} />
            <RCButton title='Cancel Edits' onClick={handleToggleEdit} />
          </> ) : ( 
            <RCButton title='Edit Profile' onClick={handleToggleEdit} />
           )}
        </CardFooter>
      </Card>
    </>
  );
}


export default ProfileView;