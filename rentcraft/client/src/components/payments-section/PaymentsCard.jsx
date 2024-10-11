import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Input, Label } from 'reactstrap';
import RCButton from '../../ui/RCButton';
import { API_PAYMENTS_PATCH } from '../../constants/endpoints';

function PaymentsCard(props) {
    const { _id, unit_id, tenant_id, user_id, date, amount, paymentState } = props.payments
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [dateInput, setDateInput] = useState(date);
    const [amountInput, setAmountInput] = useState(amount);
    const [paymentStateInput, setPaymentStateInput] = useState(paymentState);

    function handleToggleEdit(params) {
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
            console.log(data)
            
            // Refresh
            props.fetchPaymentsFeed()
            
            // Change Edit Mode
            setEditModeEnabled(false)
            
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch Units

  return (
    <>
        <Card>
            <CardHeader>
                {editModeEnabled ? ( <>
                    <Label for='date'>Payment Date</Label>
                    <Input 
                    type='date'
                    id='date'
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    />
                </> ) : ( <>
                    Date: {date}
                    Tenant:
                    Unit:
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