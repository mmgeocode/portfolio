import React, { useState } from 'react';
import RCButton from '../../ui/RCButton';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { API_PAYMENTS_CREATE } from '../../constants/endpoints';

function PaymentsCreate(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)
    const [unitIdInput, setUnitIdInput] = useState("");
    const [tenantIdInput, setTenantIdInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [amountInput, setAmountInput] = useState("");
    const [paymentStateInput, setPaymentStateInput] = useState("");

    // console.log(props.tenantData)
    // console.log(props.unitData)

    async function handleCreate() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("Authorization", props.token)

            // Body
            let body = {
                unit_id: unitIdInput,
                tenant_id: tenantIdInput,
                date: dateInput,
                amount: amountInput,
                paymentState: paymentStateInput
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_PAYMENTS_CREATE, requestOptions)

            // POST Response
            const data = await response.json()
            console.log(data)

            // Refresh Payments Feed
            props.fetchPaymentsFeed()

            // Clear Form Input
            setUnitIdInput("")
            setTenantIdInput("")
            setDateInput("")
            setAmountInput("")
            setPaymentStateInput("")

            // Toggle Modal
            toggle()

        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <RCButton title='Create New Payment' onClick={toggle} />

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Payment</ModalHeader>

            <ModalBody>
                <Form>
                    {/* Select Unit */}
                    <FormGroup>
                        <Label for='select unit'>Select Unit</Label>
                        <Input 
                        type='select'
                        id='select unit'
                        placeholder='Select Unit'
                        value={unitIdInput}
                        onChange={(e) => setUnitIdInput(e.target.value)}
                        >
                            <option default>Select</option>
                            {props.unitData.map((unit, index) =>(
                                <option key={index} value={unit._id}>{unit.address}</option>
                            ))}
                        </Input>
                    </FormGroup>

                    {/* Select Tennant */}
                    <FormGroup>
                        <Label for='select tenant'>Select Tenant</Label>
                        <Input 
                        type='select'
                        id='select tenant'
                        value={tenantIdInput}
                        onChange={(e) => setTenantIdInput(e.target.value)}
                        >
                            <option default>Select Tenant</option>
                            {props.tenantData.map((tenant, index) =>(
                                <option key={index} value={tenant._id}>{tenant.firstName}{tenant.lastName}</option>
                            ))}
                        </Input>
                    </FormGroup>

                    {/* Date */}
                    <FormGroup>
                        <Label for='date'>Payment Date</Label>
                        <Input 
                        type='date'
                        id='date'
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* Amount */}
                    <FormGroup>
                        <Label for='amount'>Payment Amount</Label>
                        <Input 
                        type='number'
                        id='amount'
                        placeholder='Enter payment amount'
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        />
                    </FormGroup>

                    {/* Payment Status */}
                    <FormGroup>
                        <Label for='payment status'>Payment Status</Label>
                        <Input 
                        type='select'
                        id='payment status'
                        value={paymentStateInput}
                        onChange={(e) => setPaymentStateInput(e.target.value)}
                        >
                            <option default>Select Status</option>
                            <option>Full</option>
                            <option>Partial</option>
                            <option>Delinquent</option>
                        </Input>
                    </FormGroup>

                </Form>
            </ModalBody>

            <ModalFooter>
                <RCButton title='Register Payment' onClick={handleCreate} />
                <RCButton title='Cancel Create Payment' onClick={toggle} />
            </ModalFooter>
        </Modal>
    </>
  );
}


export default PaymentsCreate;