import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Input, Label } from 'reactstrap';
import { API_ROOM_DELETE_BY_ID, API_ROOM_JOIN, API_ROOM_PATCH } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';
import RoomJoinButton from '../../ui/RoomJoinButton';
import RoomEditButton from '../../ui/RoomEditButton';
import RoomDeleteButton from '../../ui/RoomDeleteButton';

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

        // PATCH Response
        const data = await response.json()
        console.log(data)

        // Refresh Room Feed
        props.fetchRooms()

        // Change Edit Mode to False
        setEditModeEnabled(false)
    }

    async function handleDelete() {
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
            const response = await fetch(API_ROOM_DELETE_BY_ID + "/" + _id, requestOptions)

            // DELETE Response
            const data = await response.json()
            console.log(data)

            // Refresh Room 
            handleToggleEdit()
            props.fetchRooms()

        } catch (error) {
            console.error(error)
        }
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
            console.log(data)

            // Navigate to RoomView
            navigate('/message/room/' + _id)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Card className='room'>
                <CardHeader className='room'>
                    {editModeEnabled ? ( <>
                        <Label for='name'>Room Name:</Label>
                        <Input 
                        type='text'
                        id='name'
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        />
                    </> ) : (
                        <CardTitle>{name}</CardTitle>
                    )}
                </CardHeader>
                <CardBody className='room'>
                    {editModeEnabled ? ( <>
                        <Label for='description'>Room Description:</Label>
                        <Input 
                        type='text'
                        id='description'
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                        />
                    </> ) : (
                        <CardText>{description}</CardText>
                    )}
                </CardBody>
                <CardFooter className='room'>
                    {editModeEnabled ? ( <>
                        <RoomDeleteButton onClick={handleDelete} title='DELETE' />
                    </> ) : (
                        <RoomJoinButton title='JOIN' onClick={handleJoinRoom}></RoomJoinButton>
                    )}
                    {editModeEnabled ? ( <>
                        <RoomEditButton background-color='var(--confirm)' onClick={handleEdit} title='EDIT' />
                    </>) : (
                        props.currentId === props.room.owner_id && <RoomEditButton onClick={handleToggleEdit} title='EDIT' />

                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default RoomCard