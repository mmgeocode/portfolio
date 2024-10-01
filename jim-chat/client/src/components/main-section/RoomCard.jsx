import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'reactstrap';
import { API_ROOM_JOIN, API_ROOM_PATCH } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';
import JiMButton from '../../ui/JiMButton';
import RoomJoinButton from '../../ui/RoomJoinButton';

function RoomCard(props) {
    const { name, description, _id } = props.room;
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState(name);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled)
    }

    async function handleEdit() {
        // Headers
        let myHeaders = new Headers()
        myHeaders.append("Authorization", props.token)
        myHeaders.append("Content-Type", "application/json")

        // Body
        const body = {
            name: nameInput,
            description: descriptionInput,
        }

        // Request Options
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(body)
        }

        // Send Request
        const response = await fetch(API_ROOM_PATCH + "/" + _id, requestOptions)

        // Get Response
        const data = await response.json()

        // Refresh Room Feed
        props.fetchRoomFeed()

        // Change Edit Mode to False
        setEditModeEnabled(false)
    }

    async function handleJoinRoom() {
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
            const response = await fetch(API_ROOM_JOIN + "/" + _id, requestOptions)

            // Get Response
            const data = await response.json()

            // Navigate to RoomView
            navigate('/message/room/' + _id)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {/* <h1>ROOM CARD</h1> */}
            <Card className='room'>
                <CardHeader className='room'>
                    <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardBody className='room'>
                    <CardText>{description}</CardText>
                </CardBody>
                {/* <JiMButton className='room' title="JOIN" onClick={handleJoinRoom}>Join Room</JiMButton> */}
                <CardFooter className='room'>
                    <RoomJoinButton title='JOIN' onClick={handleJoinRoom}></RoomJoinButton>
                </CardFooter>
            </Card>
        </>
    )
}

export default RoomCard