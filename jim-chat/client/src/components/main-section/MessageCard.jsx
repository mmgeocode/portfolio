import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Input, Label } from "reactstrap"
import { API_MESSAGE_DELETE, API_MESSAGE_PATCH, API_USER_VIEW_BY_ID } from "../../constants/endpoints"
import JiMButton from '../../ui/JiMButton';


function MessageCard(props) {
    const { room_id, owner_id, _id, msg } = props.room_message
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [userName, setUserName] = useState([]);
    const [msgInput, setMsgInput] = useState(msg);

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled)
    }

    async function fetchUserName() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "GET",
                headers: myHeaders,
            }

            // Send Request
            const response = await fetch(API_USER_VIEW_BY_ID + "/" + owner_id, requestOptions)

            // GET Response
            const data = await response.json()
            // console.log(data)

            // Set State
            setUserName(data.user.userName)

        } catch (error) {
            console.error(error)
        }
    }

    async function handleEdit() {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)
            myHeaders.append("Content-Type", "application/json")

            // Body
            const body = {
                msg: msgInput,
            }

            // Request Options
            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_MESSAGE_PATCH + "/" + _id, requestOptions)

            // PATCH Response
            const data = await response.json()
            console.log(data)

            // Refresh Message Feed
            props.fetchRoomMsg()

            // Change Edit Mode
            setEditModeEnabled(false)

    }

    async function handleDelete() {
        // console.log("Delete clicked")
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "DELETE",
                headers: myHeaders,
            }

            // Send Request
            const response = await fetch(API_MESSAGE_DELETE + "/" + _id, requestOptions)

            // DELETE Response
            const data = await response.json()
            console.log(data)

            // Refresh Message Feed
            props.fetchRoomMsg()

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchUserName()
    }, [props.token]);

    return (
        <>
            <Card>
                <CardHeader>{userName}</CardHeader>
                <CardBody>
                    {editModeEnabled ? ( <>
                        <Label for='msg'>Message:</Label>
                        <Input 
                        type='text'
                        id='msg'
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                        />
                    </> ) : (
                        <CardText>{msg}</CardText>
                    )}
                </CardBody>
                <CardFooter>
                    {editModeEnabled ? (
                        <JiMButton onClick={handleEdit} title='Confirm Edit' />
                    ) : (
                        <JiMButton onClick={handleToggleEdit} title='Edit' />
                    )}
                    {editModeEnabled && (
                        <JiMButton onClick={handleToggleEdit} title='Cancel' />
                    )}
                    {editModeEnabled && (
                        <JiMButton onClick={handleDelete} title='Delete Message' />
                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default MessageCard