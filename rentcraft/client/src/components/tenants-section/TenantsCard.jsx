import { Card, CardBody, CardFooter, CardHeader, CardTitle, Input, Label } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { API_TENANT_PATCH } from "../../constants/endpoints";
import RCButton from "../../ui/RCButton";


function TenantsCard(props) {
    const { _id, user_id, firstName, lastName, phone, email, active } = props.tenant
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState(firstName);
    const [lastNameInput, setLastNameInput] = useState(lastName);
    const [phoneInput, setPhoneInput] = useState(phone);
    const [emailInput, setEmailInput] = useState(email);
    const [activeInput, setActiveInput] = useState(active);

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled)
    }

    async function handleEdit() {
        try {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)
            myHeaders.append("Content-Type", "application/json")

            // Body
            const body = {
                firstName: firstNameInput,
                lastName: lastNameInput,
                phone: phoneInput,
                email: emailInput,
                active: activeInput
            }

            // Request Options
            let requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_TENANT_PATCH + _id, requestOptions)

            // PATCH Response
            const data = await response.json()
            console.log(data)

            // Refresh Tenant Feed
            props.fetchTenants()

            // Change Edit Mode to False
            setEditModeEnabled(false)

        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <Card>
            <CardHeader>
                {editModeEnabled ? (<>
                    <Label for="first name">First Name</Label>
                    <Input 
                    type="text"
                    id="first name"
                    value={firstNameInput}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                    />

                    <Label for="last name">Last Name</Label>
                    <Input 
                    type="text"
                    id="last name"
                    value={lastNameInput}
                    onChange={(e) => setLastNameInput(e.target.value)}
                    />
                </>) : ( <>
                    <CardTitle>{firstName}</CardTitle>
                    <CardTitle>{lastName}</CardTitle>
                </> ) }
            </CardHeader>

            <CardBody>
                {editModeEnabled ? ( <>
                    <Label for="email">Email</Label>
                    <Input 
                    type="text"
                    id="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    />

                    <Label for="phone">Phone Number</Label>
                    <Input 
                    type="text"
                    id="phone"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    />

                    <Label for="active">Tenant Status</Label>
                    <Input 
                    type="select"
                    id="active"
                    name="active"
                    value={activeInput}
                    onChange={(e) => setActiveInput(e.target.value)}
                    >
                        <option>Active</option>
                        <option>False</option>
                    </Input>
                </> ) : ( <>
                    Email: {email}
                    Phone: {phone}
                </> )}
            </CardBody>

            <CardFooter>
                {editModeEnabled ? ( <> <RCButton title='Confirm Edits' onClick={handleEdit} /> <RCButton title='Cancel Edits' onClick={handleToggleEdit} /> </> ) : (<RCButton title='Edit Tenant' onClick={handleToggleEdit} /> )}
            </CardFooter>
        </Card>
    </>
  );
}


export default TenantsCard;