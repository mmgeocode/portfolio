import React, { useState, useEffect } from 'react';
import { API_VIEW_ALL_ROOMS } from '../../constants/endpoints';
import { Col, Container, Row } from 'reactstrap';
import RoomFeed from './RoomFeed';

function MainIndex(props) {
    const [roomFeedItem, setRoomFeedItem] = useState([]);
    const [userId, setUserId] = useState("");

    async function fetchRoomFeed() {
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
            setRoomFeedItem(data.rooms.reverse())
            setUserId(data.userId)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchRoomFeed();
    }, [props.token]);

    return (
        <div className="main-index">
            <p>MAIN INDEX</p>
            <Container>
                <Row>
                    <Col>
                        {/* <RoomCreate token={props.token} fetchRooms={fetchRooms}/> */}
                    </Col>
                    <Col>
                        <RoomFeed 
                        roomFeedItem={roomFeedItem}
                        token={props.token}
                        fetchRoomFeed={fetchRoomFeed}
                        userId={userId}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainIndex