import React, { useState, useEffect } from 'react';
import { API_VIEW_ALL_ROOMS } from '../../constants/endpoints';
import { Col, Container, Row } from 'reactstrap';

function MainIndex(props) {
    const [roomItems, setRoomItems] = useState([]);

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
            setRoomItems(data.rooms.reverse())

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchRooms();
    }, [props.token]);

    return (
        <div className="main-index">
            <p>MAIN INDEX</p>
            <Container>
                <Row>
                    <Col>
                        {/* <RoomCreate token={props.token} fetchRooms={fetchRooms}/> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainIndex