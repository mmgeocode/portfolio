import React, { useState } from 'react';
import RCButton from '../../ui/RCButton';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { API_TENANT_CREATE } from '../../constants/endpoints';

function TenantsCreate(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    async function handleCreate() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("Authorization", props.token)

            // Body
            let body = {
                firstName: firstName,
                lastName: lastName,
                phone: phoneInput,
                email: emailInput
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_TENANT_CREATE, requestOptions)

            // POST Response
            const data = await response.json()
            console.log(data)

            // Refresh Tenant Feed
            props.fetchTenants()

            // Clear Create Tenant Input
            setFirstName("")
            setLastName("")
            setPhoneInput("")
            setEmailInput("")

            // Toggle Modal
            toggle()

        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <RCButton title='Create New Tenant' onClick={toggle} />

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Tenant</ModalHeader>

            <ModalBody>
                <Form>
                    {/* First Name */}
                    <FormGroup>
                        <Label for='first name'>First Name</Label>
                        <Input
                        type='text'
                        name='first name'
                        id='first name'
                        placeholder='Enter First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormGroup>

                    {/* Last Name */}
                    <FormGroup>
                        <Label for='last name'>Last Name</Label>
                        <Input
                        type='text'
                        name='last name'
                        id='last name'
                        placeholder='Enter Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormGroup>

                    {/* Phone */}
                    <FormGroup>
                        <Label for='phone'>Phone Number</Label>
                        <Input 
                        type='text'
                        name='phone'
                        id='phone'
                        placeholder='Enter Cell Phone'
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* Email */}
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter Email'
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <RCButton title='Register Tenant' onClick={handleCreate} />
                <RCButton title='Cancel' onClick={toggle} />
            </ModalFooter>
        </Modal>
    </>
  );
}


export default TenantsCreate;