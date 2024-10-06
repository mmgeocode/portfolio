import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Form, Input } from "reactstrap";
import { API_MESSAGE_CREATE } from '../../constants/endpoints';
import JiMButton from '../../ui/JiMButton';

function MessageCreate(props) {
    const [msgInput, setMsgInput] = useState("");
    const { _id } = props.roomData

    async function handleMsgCreate() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("Authorization", props.token)

            // Body
            let body = {
                msg: msgInput,
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_MESSAGE_CREATE + "/" + _id, requestOptions )

            // POST Response
            const data = await response.json()
            console.log(data)

            // Refresh Message Feed
            props.fetchRoomMsg()

            // Clear Message Input
            setMsgInput("")

        } catch (error) {
            console.error(error)
        }
    }

  return (
    <Card className='message-create'>
        <CardHeader>Create Message</CardHeader>
        <CardBody>
            <Form className='message-create'>
                <Input 
                type='text'
                name='message'
                id='message'
                placeholder='Enter message here...'
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                />
            </Form>
        </CardBody>
        <CardFooter>
            <JiMButton onClick={handleMsgCreate} title='Post Message' />
        </CardFooter>
    </Card>
  );
}


export default MessageCreate;