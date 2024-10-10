import React, { useState } from 'react';
import RCButton from '../../ui/RCButton';
import { API_UNIT_CREATE } from '../../constants/endpoints';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function UnitCreate(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)
    const [addressInput, setAddressInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    const [rentInput, setRentInput] = useState("");
    const [unitStateInput, setUnitStateInput] = useState("");

    async function handleCreateUnit() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("Authorization", props.token)

            // Body
            let body = {
                address: addressInput,
                city: cityInput,
                state: stateInput,
                zip: zipInput,
                monthlyRent: rentInput,
                unitState: unitStateInput,
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_UNIT_CREATE, requestOptions)

            // POST Response
            const data = await response.json()
            console.log(data)

            // Refresh Unit Feed
            props.fetchUnitFeed()

            // Clear Create Unit Input
            setAddressInput("")
            setCityInput("")
            setStateInput("")
            setZipInput("")
            setRentInput("")
            setUnitStateInput("")

            // Toggle Modal
            toggle()
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
        <RCButton title='Create New Unit' onClick={toggle} />

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Register New Unit</ModalHeader>

            <ModalBody>
                <Form>
                    {/* Address */}
                    <FormGroup>
                        <Label for='address'>Address</Label>
                        <Input 
                        type='text'
                        name='address'
                        id='address'
                        placeholder='Enter address'
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* City */}
                    <FormGroup>
                        <Label for='city'>City</Label>
                        <Input 
                        type='text'
                        name='city'
                        id='city'
                        placeholder='Enter City'
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* State */}
                    <FormGroup>
                        <Label for='state'>State</Label>
                        <Input 
                        type='text'
                        name='state'
                        id='state'
                        placeholder='Enter State'
                        value={stateInput}
                        onChange={(e) => setStateInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* Zip */}
                    <FormGroup>
                        <Label for='zip'>Zip Code</Label>
                        <Input 
                        type='number'
                        name='zip'
                        id='zip'
                        placeholder='Enter zip code'
                        value={zipInput}
                        onChange={(e) => setZipInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* Rent */}
                    <FormGroup>
                        <Label for='rent'>Rent</Label>
                        <Input
                        type='number'
                        name='rent'
                        id='rent'
                        placeholder='Enter monthly rent'
                        value={rentInput}
                        onChange={(e) => setRentInput(e.target.value)}
                        /> 
                    </FormGroup>

                    {/* Available */}
                    <FormGroup>
                        <Label for='unit state'>Availability</Label>
                        <Input 
                        type='select'
                        name='unit state'
                        id='unit state'
                        placeholder='Select Unit Availability'
                        value={unitStateInput}
                        onChange={(e => setUnitStateInput(e.target.value))}
                        >
                            <option>Available</option>
                            <option>Rented</option>
                            <option>Unavailable</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <RCButton title='Register Unit' onClick={handleCreateUnit} />
                <RCButton title='Cancel' onClick={toggle} />
            </ModalFooter>
        </Modal>
    </>
  );
}


export default UnitCreate;