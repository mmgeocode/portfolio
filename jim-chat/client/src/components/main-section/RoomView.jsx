import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { API_MESSAGE_VIEW_BY_ROOM } from '../../constants/endpoints';
import MessageFeed from './MessageFeed';

function RoomView(props) {
    const params = useParams()
    const [roomItem, setRoomItem] = useState([]);

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
            console.log(data)

            // Set State
            setRoomItem(data.room_messages)
            console.log(data.room_messages)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchRoomMsg()
    }, [props.token]);

    return (
        <>
        <h1>ROOM VIEW</h1>
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