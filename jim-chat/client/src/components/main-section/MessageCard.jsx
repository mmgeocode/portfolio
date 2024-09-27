import { Card, CardBody, CardTitle } from "reactstrap"


function MessageCard(props) {
    const { room_id, owner_id, _id, msg } = props.room_message

    return (
        <>
        <h1>MESSAGE CARD</h1>
            <Card>
                <CardTitle>MESSAGE: {msg}</CardTitle>
                <CardBody>Room ID: {room_id}, Owner ID: {owner_id}, Message ID: {_id}</CardBody>
            </Card>
        </>
    )
}

export default MessageCard