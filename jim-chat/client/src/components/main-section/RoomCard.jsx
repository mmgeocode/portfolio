import React, { useState } from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { API_ROOM_PATCH } from '../../constants/endpoints';

function RoomCard(props) {
    const { name, description, _id } = props.room;
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

    return (
        <>
            <h1>ROOM CARD</h1>
            <Card>
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </>
    )
}

export default RoomCard