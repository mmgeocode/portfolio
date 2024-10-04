import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import JiMButton from "../../ui/JiMButton";
import RoomCard from "./RoomCard";
import { API_CREATE_ROOM } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';

function RoomFeed(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function handleCreateRoom() {
        try {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("Authorization", props.token)

            // Body
            const body = {
                name: name,
                description: description,
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_CREATE_ROOM, requestOptions)

            // POST Response
            const data = await response.json()

            // Refresh Room Feed
            // navigate("/message/room/" + data.room._id)
            props.fetchRooms()
            toggle()

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="room-create-button">
                <JiMButton onClick={toggle} title="Create Room" />
                {/* <Button onClick={toggle}>Create Room</Button> */}
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>CREATE MESSAGE ROOM</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Room Name</Label>
                                <Input 
                                type='text'
                                name='name'
                                id='name'
                                placeholder='The name of the message room'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Room Description</Label>
                                <Input 
                                type='text'
                                name='description'
                                id='description'
                                placeholder='Description for room topic'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <JiMButton onClick={handleCreateRoom} title='Create Room' />
                        <JiMButton onClick={toggle} title='Cancel' />
                    </ModalFooter>
                </Modal>
            </div>
            {props.roomItem.map((room, index) => (
                <RoomCard 
                key={index}
                room={room}
                token={props.token}
                currentId={props.currentId}
                fetchRooms={props.fetchRooms}
                // userId={props.userId}
                />
            ))}
        </>
    )
}

export default RoomFeed