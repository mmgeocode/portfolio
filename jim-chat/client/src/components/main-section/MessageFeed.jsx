import MessageCard from "./MessageCard"

function MessageFeed(props) {
    return (
        <>
            {props.roomItem.map((room_message, index) => (
                <MessageCard 
                key={index}
                room_message={room_message}
                _id={props._id}
                owner_id={props.owner_id}
                room_id={props.room_id}
                msg={props.msg}
                fetchRoomMsg={props.fetchRoomMsg}
                token={props.token}
                />
            ))}
        </>
    )
}

export default MessageFeed