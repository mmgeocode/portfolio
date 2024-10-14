import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Input, Label } from 'reactstrap';
import RCButton from '../../ui/RCButton';
import { API_PAYMENTS_PATCH, API_TENANT_BY_ID, API_UNIT_VIEW_BY_ID } from '../../constants/endpoints';

function PaymentsCard(props) {
    const { _id, unit_id, tenant_id, user_id, date, amount, paymentState } = props.payments
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [unitIdInput, setUnitIdInput] = useState(unit_id);
    const [tenantIdInput, setTenantIdInput] = useState(tenant_id);
    const [dateInput, setDateInput] = useState(date);
    const [amountInput, setAmountInput] = useState(amount);
    const [paymentStateInput, setPaymentStateInput] = useState(paymentState);
    const [currentAddress, setCurrentAddress] = useState("");
    const [currentTenantFirstName, setCurrentTenantFirstName] = useState("");
    const [currentTenantLastName, setCurrentTenantLastName] = useState("");

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled)
    }

    async function handleSubmitEdit() {
        try {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)
            myHeaders.append("Content-Type", "application/json")
            
            // Body
            const body = {
                unit_id: unitIdInput,
                tenant_id: tenantIdInput,
                date: dateInput,
                amount: amountInput,
                paymentState: paymentStateInput
            }
            
            // Request Options
            let requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: JSON.stringify(body)
            }
            
            // Send Request
            const response = await fetch(API_PAYMENTS_PATCH + _id, requestOptions)
            
            // PATCH Response
            const data = await response.json()
            // console.log(data)
            
            // Refresh
            props.fetchPaymentsFeed()
            fetchAddress()
            fetchTenantName()
            
            // Change Edit Mode
            setEditModeEnabled(false)
            
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch Address
    async function fetchAddress() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            const requestOptions = {
                method: "GET",
                headers: myHeaders
            }

            // Send Request
            const response = await fetch(API_UNIT_VIEW_BY_ID + unit_id, requestOptions)

            // GET Response
            const data = await response.json()

            // Set State
            setCurrentAddress(data.unit.address)
            
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch Tenant Name
    async function fetchTenantName() {
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
            const response = await fetch(API_TENANT_BY_ID + tenant_id, requestOptions)

            // GET Response
            const data = await response.json()
            console.log(data)

            // Set State
            setCurrentTenantFirstName(data.tenant.firstName)
            setCurrentTenantLastName(data.tenant.lastName)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        // fetchUnits()
        fetchAddress()
        fetchTenantName()
    }, [props.token]);


  return (
    <>
        <Card className='payments'>
            <CardHeader>
                {editModeEnabled ? ( <>
                {/* Edit Address */}
                    <Label for='address'>Address</Label>
                    <Input 
                    type='select'
                    id='address'
                    value={unitIdInput}
                    onChange={(e) => setUnitIdInput(e.target.value)}
                    >
                        {props.unitData.map((unit, index) => (
                            <option key={index} value={unit._id}>{unit.address}</option>
                        ))}
                    </Input>
                {/* Edit Date */}
                    <Label for='date'>Payment Date</Label>
                    <Input 
                    type='date'
                    id='date'
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    />

                {/* Edit Tenant */}
                    <Label for='tenant'>Tenant</Label>
                    <Input
                    type='select'
                    id='tenant'
                    value={tenantIdInput}
                    onChange={(e) => setTenantIdInput(e.target.value)}
                    >
                        {props.tenantData.map((tenant, index) => (
                            <option key={index} value={tenant._id}>
                                {tenant.firstName} {tenant.lastName}
                            </option>
                        ))}
                    </Input>

                </> ) : ( <>
                    Address: {currentAddress}
                    Date: {date}
                    Tenant: {currentTenantFirstName} {currentTenantLastName}
                </> )}
            </CardHeader>

            <CardBody>
                {editModeEnabled ? ( <>
                    <Label for='amount'>Amount</Label>
                    <Input 
                    type='number'
                    id='amount'
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    />

                    <Label for='payment status'>Status</Label>
                    <Input
                    type='select'
                    id='payment status'
                    value={paymentStateInput}
                    onChange={(e) => setPaymentStateInput(e.target.value)}
                    >
                        <option>Full</option>
                        <option>Partial</option>
                        <option>Delinquent</option>
                    </Input>
                </> ) : ( <>
                    Amount: {amount}
                    Status: {paymentState}
                </> )}
            </CardBody>

            <CardFooter>
                {editModeEnabled ? ( <>
                    <RCButton title='Confirm Edits' onClick={handleSubmitEdit} />
                    <RCButton title='Cancel Edits' onClick={handleToggleEdit} />
                </> ) : ( <RCButton title='Edit Payment' onClick={handleToggleEdit} /> )}
            </CardFooter>
        </Card>
    </>
  );
}


export default PaymentsCard;