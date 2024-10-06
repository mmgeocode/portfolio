import React, { useState, useEffect } from 'react';
import { API_VIEW_ALL_ROOMS } from '../../constants/endpoints';
import RoomFeed from './RoomFeed';
import ReturnToAuth from '../navigation-section/ReturnToAuth';

function MainIndex(props) {
    const [roomItem, setRoomItem] = useState([]);
    const [userId, setUserId] = useState("");

    async function fetchRooms() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = { method: "GET", headers: myHeaders, }

            // Send Request
            const response = await fetch(API_VIEW_ALL_ROOMS, requestOptions)

            // Get Response
            const data = await response.json()

            // Set State
            setRoomItem(data.rooms.reverse())
            setUserId(data.userId)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchRooms();
    }, [props.token]);

    if (!props.token) return <ReturnToAuth />

    return (
        <div className="main-index">
            <h1>MESSAGE ROOMS</h1>
            <div className="main-index-item">
                <RoomFeed 
                roomItem={roomItem}
                token={props.token}
                fetchRooms={fetchRooms}
                userId={userId}
                currentId={props.currentId}
                />
            </div>
        </div>
    )
}

export default MainIndex