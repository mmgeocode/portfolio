import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { API_MESSAGE_VIEW_BY_ROOM, API_ROOM_GET } from '../../constants/endpoints';
import MessageFeed from './MessageFeed';
import { Label } from 'reactstrap';
import JiMButton from '../../ui/JiMButton';
import MessageCreate from './MessageCreate';
import ReturnToAuth from '../navigation-section/ReturnToAuth';

function RoomView(props) {
    const params = useParams()
    // console.log(params)
    const [roomData, setRoomData] = useState([]);
    const [roomItem, setRoomItem] = useState([]);
    const navigate = useNavigate()

    function returnHome() {
        navigate("/feed/" + props.currentId)
    }

    async function fetchRoomName() {
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
            const response = await fetch(API_ROOM_GET + "/" + params.id, requestOptions)

            // Get Response
            const data = await response.json()
            console.log(data)

            // Set State
            setRoomData(data.room)

        } catch (error) {
            console.error(error)
        }
    }

    async function fetchRoomMsg() {
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
            const response = await fetch(API_MESSAGE_VIEW_BY_ROOM + "/" + params.id, requestOptions)

            // Get Response
            const data = await response.json()
            // console.log(data)

            // Set State
            setRoomItem(data.room_messages)
            // console.log(data.room_messages)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchRoomMsg()
        fetchRoomName()
    }, [props.token]);

    if (!props.token) return <ReturnToAuth />

    return (
        <>
            <h1>ROOM: {roomData.name} </h1>
            <JiMButton onClick={returnHome} title='Return to Rooms' />
            <MessageCreate
            token={props.token}
            currentId={props.currentId}
            fetchRoomMsg={fetchRoomMsg}
            roomData={roomData}
            />
            <MessageFeed 
            roomItem={roomItem} 
            token={props.token} 
            fetchRoomMsg={fetchRoomMsg} 
            currentId={props.currentId}
            />
        </>
    )
}

export default RoomView